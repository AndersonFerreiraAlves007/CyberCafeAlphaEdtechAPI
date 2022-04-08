const jwt = require('jsonwebtoken')
const { EXPIRE_IN_JWT_ACCESS_TOKEN } = require('../utils/constants')

async function generateTokenJwt (payload) {
  return jwt.sign(payload, process.env.SECRET_JWT_ACCESS_TOKEN, { expiresIn: EXPIRE_IN_JWT_ACCESS_TOKEN })
}

async function decodeTokenJwt (token) {
  return jwt.verify(token, process.env.SECRET_JWT_ACCESS_TOKEN)
}

module.exports = {
  generateTokenJwt,
  decodeTokenJwt
}
