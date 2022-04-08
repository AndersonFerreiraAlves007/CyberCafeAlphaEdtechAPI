const CookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const ClientsRouter = require('./resources/clients')
const RentsRouter = require('./resources/rents')
const RoomsRouter = require('./resources/rooms')
const UsersRouter = require('./resources/users')
const { compareHashPassword } = require('./utils/password')
const { generateTokenJwt } = require('./utils/token')
const { createClientPG, destroyClientPG } = require('./utils/clientePG')

const PORT = parseInt(process.env.SERVER_PORT, 10)

const app = express()

app.use(cors())
app.use(CookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send(`API CyberCafé AlphaEdtech versão ${process.env.API_VERSION}!`)
})

app.use('/clients', ClientsRouter)
app.use('/rents', RentsRouter)
app.use('/rooms', RoomsRouter)
app.use('/users', UsersRouter)

app.post('/login', async (req, res) => {
  const { username, password } = req.body

  const client = await createClientPG()
  const text = 'SELECT * FROM public.users Where username=$1'
  const result = await client.query(text, [username])
  await destroyClientPG(client)

  if (result.rows.length === 0) {
    res.json({
      status: false,
      message: 'Usuário não cadastrado!',
      data: {
        user_id: -1
      }
    })
  } else {
    const user = result.rows[0]
    if (compareHashPassword(password, user.password)) {
      const token = generateTokenJwt({ user_id: user.id })
      res
        .cookie('access_token', token, {
          httpOnly: true,
          secure: true
        })
        .status(200)
        .json({
          user_id: user.id,
          token
        })
    } else {
      res.status(400).json({
        message: 'Senha incorreta!'
      })
    }
  }
})

app.listen(PORT, () => {
  console.log(`Server linten in port ${PORT}`)
})
