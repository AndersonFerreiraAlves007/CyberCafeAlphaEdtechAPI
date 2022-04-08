const express = require('express')
const { createClientPG, destroyClientPG } = require('../utils/clientePG')
const { formatTimestamps } = require('../utils/date')
const clientsCreate = require('../middleware/validatorsBody/clientsCreate')
const clientsUpdate = require('../middleware/validatorsBody/clientsUpdate')
const authorization = require('../middleware/authorization')
const verifyId = require('../middleware/verifyId')

const router = express.Router()

router.get('/', authorization, async (req, res) => {
  const client = await createClientPG()
  const text = 'SELECT * FROM public.clients'
  const result = await client.query(text)
  await destroyClientPG(client)
  res.json(result.rows)
})

router.get('/enable', authorization, async (req, res) => {
  const client = await createClientPG()
  const text = 'SELECT * FROM vw_clients_enable'
  const result = await client.query(text)
  await destroyClientPG(client)
  res.json(result.rows)
})

router.get('/desable', authorization, async (req, res) => {
  const client = await createClientPG()
  const text = 'SELECT * FROM vw_clients_disable'
  const result = await client.query(text)
  await destroyClientPG(client)
  res.json(result.rows)
})

router.get('/:id', authorization, verifyId, async (req, res) => {
  const id = parseInt(req.params.id, 10)
  const client = await createClientPG()
  const text = 'SELECT * FROM public.clients Where id=$1'
  const result = await client.query(text, [id])
  await destroyClientPG(client)
  res.json(result.rows[0])
})

router.post('/', authorization, clientsCreate, async (req, res) => {
  const { name, email, cpf, username } = req.body
  const client = await createClientPG()
  try {
    const text = 'INSERT INTO public.clients (name, username, email, cpf, create_by, create_in, update_by, update_in) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);'
    const values = [name, username, email, cpf, req.user_id, formatTimestamps(new Date()), req.user_id, formatTimestamps(new Date())]
    const result = await client.query(text, values)
    await destroyClientPG(client)
    res.json(result.rows[0])
  } catch (e) {
    await destroyClientPG(client)
    res.status(400).json({
      message: e
    })
  }
})

router.put('/:id', authorization, verifyId, clientsUpdate, async (req, res) => {
  const id = parseInt(req.params.id, 10)
  const { name, email, cpf, username } = req.body
  const client = await createClientPG()
  try {
    const text = 'UPDATE public.clients SET name=$1, username=$2, email=$3, cpf=$4, update_by=$5, update_in=$6 WHERE id=$7 RETURNING *'
    const values = [name, username, email, cpf, req.user_id, formatTimestamps(new Date()), id]
    const result = await client.query(text, values)
    await destroyClientPG(client)
    res.json(result.rows[0])
  } catch (e) {
    await destroyClientPG(client)
    res.status(400).json({
      message: e
    })
  }
})

router.delete('/:id', authorization, verifyId, async (req, res) => {
  const id = req.params.id
  const client = await createClientPG()
  try {
    const text = 'UPDATE public.rents SET delete_in=$1, delete_by=$2 WHERE id=$3'
    const values = [formatTimestamps(new Date()), req.user_id, id]
    const result = await client.query(text, values)
    await destroyClientPG(client)
    res.json(result)
  } catch (e) {
    await destroyClientPG(client)
    res.status(400).json({
      message: e
    })
  }
})

module.exports = router
