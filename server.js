const express = require('express')
const cors = require('cors')
const ClientsRouter = require('./resources/clients')
const RentsRouter = require('./resources/rents')

const PORT = parseInt(process.env.SERVER_PORT, 10)

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req, res) => {
  res.send(`API CyberCafé AlphaEdtech versão ${process.env.API_VERSION}!`)
})

app.use('clients', ClientsRouter)
app.use('rents', RentsRouter)

app.listen(PORT, () => {
  console.log(`Server linten in port ${PORT}`)
})
