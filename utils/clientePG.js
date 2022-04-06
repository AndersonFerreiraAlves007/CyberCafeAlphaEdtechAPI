const { Client } = require('pg')

async function createClientPG () {
  const client = new Client({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: parseInt(process.env.DATABASE_PORT, 10)
  })
  await client.connect()
  return client
}

async function destroyClientPG (client) {
  await client.end()
}

module.exports = {
  createClientPG,
  destroyClientPG
}
