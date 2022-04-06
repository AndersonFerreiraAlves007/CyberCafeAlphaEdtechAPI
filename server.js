const express = require('express')
const cors = require('cors')
const SalesRouter = require('./resources/sales')

const PORT = parseInt(process.env.SERVER_PORT, 10)

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req, res) => {
  res.send(`API CyberCafé AlphaEdtech versão ${process.env.API_VERSION}!`)
})

app.use('sales', SalesRouter)

app.listen(PORT, () => {
  console.log(`Server linten in port ${PORT}`)
})
