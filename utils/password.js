const bcrypt = require('bcrypt')

const saltRounds = 10

async function generateHashPassword (password) {
  return await bcrypt.hash(password, saltRounds)
}

async function compareHashPassword (hash, password) {
  return await bcrypt.compare(password, hash)
}

module.exports = {
  generateHashPassword,
  compareHashPassword
}
