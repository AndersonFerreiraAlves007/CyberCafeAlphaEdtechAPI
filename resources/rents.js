const express = require('express')
const { createClientPG, destroyClientPG } = require('../utils/clientePG')
const { formatTimestamps } = require('../utils/date')

const router = express.Router()

router.get('/', async (req, res) => {
  const client = await createClientPG()
  const text = 'SELECT * FROM public.rents'
  const values = []
  const result = await client.query(text, values)
  await destroyClientPG(client)
  res.json(result.rows)
})

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10)
  const client = await createClientPG()
  const text = 'SELECT * FROM public.rents Where id=$1'
  const values = [id]
  const result = await client.query(text, values)
  await destroyClientPG(client)
  res.json(result.rows[0])
})

router.post('/', async (req, res) => {
  const { clientFgk, roomsFgk, value, join, leave } = req.body
  const client = await createClientPG()
  try {
    const text = 'INSERT INTO public.rents (client_fgk, rooms_fgk, value, join, leave) VALUES ($1, $2, $3, $4, $5) RETURNING *'
    const values = [clientFgk, roomsFgk, value, formatTimestamps(new Date(join)), formatTimestamps(new Date(leave))]
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

router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10)
  const { clientFgk, roomsFgk, value, join, leave } = req.body
  const client = await createClientPG()
  try {
    const text = 'UPDATE public.rents SET update_in=$1, update_by=$2, client_fgk=$3, rooms_fgk=$4, value=$5, join=$6, leave=$7 WHERE id=$8 RETURNING *'
    const values = [formatTimestamps(new Date()), 1, clientFgk, roomsFgk, value, formatTimestamps(new Date(join)), formatTimestamps(new Date(leave)), id]
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

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10)
  const client = await createClientPG()
  try {
    const text = 'UPDATE public.rents SET delete_in=$1, delete_by=$2 WHERE id=$3 RETURNING *'
    const values = [formatTimestamps(new Date()), 1, id]
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
