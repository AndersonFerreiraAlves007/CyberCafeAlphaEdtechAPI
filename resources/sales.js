const express = require('express')
const { createClientPG, destroyClientPG } = require('../utils/clientePG')

const router = express.Router()

router.get('/', async (req, res) => {

})

router.get('/:id', async (req, res) => {

})

router.post('/', async (req, res) => {
  const client = await createClientPG()
  await client.query('BEGIN')
  try {
    // querys
    await client.query('COMMIT')
    await destroyClientPG(client)
    res.json({
      // resultado das querys aqui!
    })
  } catch (e) {
    await client.query('ROLLBACK')
    await destroyClientPG(client)
    res.status(400).json({
      message: 'Mensagem de erro aqui!'
    })
  }
})

router.put('/:id', async (req, res) => {
  const client = await createClientPG()
  await client.query('BEGIN')
  try {
    // querys
    await client.query('COMMIT')
    await destroyClientPG(client)
    res.json({
      // resultado das querys aqui!
    })
  } catch (e) {
    await client.query('ROLLBACK')
    await destroyClientPG(client)
    res.status(400).json({
      message: 'Mensagem de erro aqui!'
    })
  }
})

router.delete('/:id', async (req, res) => {
  const client = await createClientPG()
  await client.query('BEGIN')
  try {
    // querys
    await client.query('COMMIT')
    await destroyClientPG(client)
    res.json({
      // resultado das querys aqui!
    })
  } catch (e) {
    await client.query('ROLLBACK')
    await destroyClientPG(client)
    res.status(400).json({
      message: 'Mensagem de erro aqui!'
    })
  }
})

module.exports = router
