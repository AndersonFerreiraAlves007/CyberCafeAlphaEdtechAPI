const yup = require('yup')

const schema = yup.object().shape({
  client_fgk: yup.number().required().positive().integer(),
  rooms_fgk: yup.number().required().positive().integer(),
  value: yup.number().required().positive(),
  join: yup.date().required(),
  leave: yup.date().required()
})

module.exports = async (req, res, next) => {
  const isValid = await schema.isValid(req.body)
  if (isValid) {
    next()
  } else {
    res.status(400).json({
      message: 'Corpo da requisição em formato inválido!!'
    })
  }
}
