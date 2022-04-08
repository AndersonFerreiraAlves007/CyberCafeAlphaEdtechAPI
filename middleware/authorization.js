const { decodeTokenJwt } = require('../utils/token')

const authorization = (req, res, next) => {
  const token = req.cookies.access_token
  if (!token) {
    return res.status(403).json({
      message: 'Não autorizado!'
    })
  }
  try {
    const data = decodeTokenJwt(token)
    req.user_id = data.user_id
    return next()
  } catch {
    return res.status(403).json({
      message: 'Não autorizado!'
    })
  }
}

module.exports = authorization
