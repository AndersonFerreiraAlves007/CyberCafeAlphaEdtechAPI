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
  const id = parseInt(req.params.id, 10);
  const { name, email, cpf, username, user_fgk} = req.body
  const client = await createClientPG()
  try {
    const text = 'UPDATE public.clients SET update_in=$1, update_by=$2, name=$3, email=$4, cpf=$5, username=$6 WHERE id=$8 RETURNING *';
    const values = [formatTimestamps(new Date()), user_fgk, name, email, cpf, username, id];
    const result = await client.query(text, values);
    await destroyClientPG(client);
    res.json(result.rows[0])
  } catch (e) {
    await destroyClientPG(client)
    res.status(400).json({
      message: e
    });
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
