const express = require('express')
const { createClientPG, destroyClientPG } = require('../utils/clientePG')

const router = express.Router()

router.get('/', async (req, res) => {
  const client = await createClientPG()
  // querys
  await destroyClientPG(client)
  res.json({
    // resultado das querys aqui!
  })
})

router.get('/:id', async (req, res) => {
  const client = await createClientPG()
  // querys
  await destroyClientPG(client)
  res.json({
    // resultado das querys aqui!
  })
})

router.post('/', async (req, res) => {
  const client = await createClientPG()
  try {
    // querys
    await destroyClientPG(client)
    res.json({
      // resultado das querys aqui!
    })
  } catch (e) {
    await destroyClientPG(client)
    res.status(400).json({
      message: 'Mensagem de erro aqui!'
    })
  }
})

router.put('/:id', async (req, res) => {
  const client = await createClientPG()
  try {
    // querys
    await destroyClientPG(client)
    res.json({
      // resultado das querys aqui!
    })
  } catch (e) {
    await destroyClientPG(client)
    res.status(400).json({
      message: 'Mensagem de erro aqui!'
    })
  }
})

router.delete('/:id', async (req, res) => {
  const client = await createClientPG()
  try {
    // querys
    await destroyClientPG(client)
    res.json({
      // resultado das querys aqui!
    })
  } catch (e) {
    await destroyClientPG(client)
    res.status(400).json({
      message: 'Mensagem de erro aqui!'
    })
  }
})

module.exports = router
