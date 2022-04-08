const { decodeTokenJwt } = require('../utils/token')

const authorization = (req, res, next) => {
  // const token = req.cookies.access_token
  const token = 1
  if (!token) {
    return res.status(403).json({
      message: 'Não autorizado!'
    })
  }
  try {
    // const data = decodeTokenJwt(token)
    // req.user_id = data.user_id
    req.user_id = token
    return next()
  } catch {
    return res.status(403).json({
      message: 'Não autorizado!'
    })
  }
}

module.exports = authorization
