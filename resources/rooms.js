const express = require('express')
const { createClientPG, destroyClientPG } = require('../utils/clientePG')
const { formatTimestamps } = require('../utils/date')
const roomsCreate = require('../middleware/validatorsBody/roomsCreate')
const roomsUpdate = require('../middleware/validatorsBody/roomsUpdate')
const authorization = require('../middleware/authorization')
const verifyId = require('../middleware/verifyId')

const router = express.Router()

router.get('/', authorization, async (req, res) => {
  const client = await createClientPG()
  const text = 'SELECT * FROM public.rooms'
  const result = await client.query(text)
  await destroyClientPG(client)
  res.json(result.rows)
})

router.get('/enable', authorization, async (req, res) => {
  const client = await createClientPG()
  const text = 'SELECT * FROM vw_rooms_enable'
  const result = await client.query(text)
  await destroyClientPG(client)
  res.json(result.rows)
})

router.get('/desable', authorization, async (req, res) => {
  const client = await createClientPG()
  const text = 'SELECT * FROM vw_rooms_disable'
  const result = await client.query(text)
  await destroyClientPG(client)
  res.json(result.rows)
})

router.get('/:id', authorization, verifyId, async (req, res) => {
  const id = parseInt(req.params.id, 10)
  const client = await createClientPG()
  const text = 'SELECT * FROM public.rooms Where id=$1'
  const result = await client.query(text, [id])
  await destroyClientPG(client)
  res.json(result.rows[0])
})

router.post('/', authorization, roomsCreate, async (req, res) => {
  const { size, description } = req.query
  const client = await createClientPG()
  try {
    const text = 'INSERT INTO public.rooms (size, description, create_by, create_in, update_by, update_in) VALUES ($1, $2, $3, $4, $5, $6);'
    const values = [size, description, req.user_id, formatTimestamps(new Date()), req.user_id, formatTimestamps(new Date())]
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

router.put('/:id', authorization, verifyId, roomsUpdate, async (req, res) => {
  const id = parseInt(req.params.id, 10)
  const { size, description } = req.body
  const client = await createClientPG()
  try {
    const text = 'UPDATE public.rooms SET size=$1, description=$2, update_by=$3, update_in=$4 WHERE id=$5 RETURNING *'
    const values = [size, description, req.user_id, formatTimestamps(new Date()), id]
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
    const text = 'UPDATE public.rooms SET delete_in=$1, delete_by=$2 WHERE id=$3'
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
