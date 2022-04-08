function validateId (req, res, next) {
  const id = parseInt(req.params.id, 10)
  if (Number.isInteger(id)) {
    if (id > 0) {
      next()
    } else {
      res.status(400).json({
        message: 'O id deve ser ser maior que zero!'
      })
    }
  } else {
    res.status(400).json({
      message: 'O id deve ser um número maior que zero!'
    })
  }
}

module.exports = validateId
