const express = require('express')
const { createClientPG, destroyClientPG } = require('../utils/clientePG')
const { formatTimestamps, formatTime } = require('../utils/date')
const rentsCreate = require('../middleware/validatorsBody/rentsCreate')
const rentsUpdate = require('../middleware/validatorsBody/rentsUpdate')
const authorization = require('../middleware/authorization')
const verifyId = require('../middleware/verifyId')

const router = express.Router()

router.get('/', authorization, async (req, res) => {
  const client = await createClientPG()
  const text = 'SELECT * FROM public.rents'
  const values = []
  const result = await client.query(text, values)
  await destroyClientPG(client)
  res.json(result.rows)
})

router.get('/enable', authorization, async (req, res) => {
  const client = await createClientPG()
  const text = 'SELECT * FROM vw_rents_enable'
  const result = await client.query(text)
  await destroyClientPG(client)
  res.json(result.rows)
})

router.get('/desable', authorization, async (req, res) => {
  const client = await createClientPG()
  const text = 'SELECT * FROM vw_rents_disable'
  const result = await client.query(text)
  await destroyClientPG(client)
  res.json(result.rows)
})

router.get('/:id', authorization, verifyId, async (req, res) => {
  const id = parseInt(req.params.id, 10)
  const client = await createClientPG()
  const text = 'SELECT * FROM public.rents Where id=$1'
  const values = [id]
  const result = await client.query(text, values)
  await destroyClientPG(client)
  res.json(result.rows[0])
})

router.post('/', authorization, rentsCreate, async (req, res) => {
  const { clientFgk, roomsFgk, value, join, leave } = req.body
  const client = await createClientPG()
  try {
    const text = 'INSERT INTO public.rents (client_fgk, rooms_fgk, value, join, leave, create_by, create_in, update_by, update_in) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *'
    const values = [clientFgk, roomsFgk, value, formatTime(new Date(join)), formatTime(new Date(leave)), req.user_id, formatTimestamps(new Date()), req.user_id, formatTimestamps(new Date())]
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

router.put('/:id', authorization, rentsUpdate, verifyId, async (req, res) => {
  const id = parseInt(req.params.id, 10)
  const { clientFgk, roomsFgk, value, join, leave } = req.body
  const client = await createClientPG()
  try {
    const text = 'UPDATE public.rents SET client_fgk=$1, rooms_fgk=$2, value=$3, join=$4, leave=$5, update_by=$6, update_in=$7 WHERE id=$8 RETURNING *'
    const values = [clientFgk, roomsFgk, value, formatTime(new Date(join)), formatTime(new Date(leave)), req.user_id, formatTimestamps(new Date()), id]
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
  const id = parseInt(req.params.id, 10)
  const client = await createClientPG()
  try {
    const text = 'UPDATE public.rents SET delete_in=$1, delete_by=$2 WHERE id=$3 RETURNING *'
    const values = [formatTimestamps(new Date()), req.user_id, id]
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

module.exports = router
