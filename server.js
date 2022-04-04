const express = require('express')
const cors = require('cors')

const PORT = parseInt(process.env.SERVER_PORT, 10)

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.listen(PORT, () => {
  console.log(`Server linten in port ${PORT}`)
})
