const yup = require('yup')

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  cpf: yup.string().required(),
  fone: yup.string().required(),
  password: yup.string().required()
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
