const express = require('express')
const { createClientPG, destroyClientPG } = require('../utils/clientePG')
const { formatTimestamps } = require('../utils/date')
const { generateHashPassword } = require('../utils/password')
const usersCreate = require('../middleware/validatorsBody/usersCreate')
const usersUpdate = require('../middleware/validatorsBody/usersUpdate')
const authorization = require('../middleware/authorization')
const verifyId = require('../middleware/verifyId')

const router = express.Router()

router.get('/', authorization, async (req, res) => {
  const client = await createClientPG()
  const text = 'SELECT * FROM public.users'
  const result = await client.query(text)
  await destroyClientPG(client)
  res.json(result.rows)
})

router.get('/enable', authorization, async (req, res) => {
  const client = await createClientPG()
  const text = 'SELECT * FROM vw_users_enable'
  const result = await client.query(text)
  await destroyClientPG(client)
  res.json(result.rows)
})

router.get('/desable', authorization, async (req, res) => {
  const client = await createClientPG()
  const text = 'SELECT * FROM vw_users_disable'
  const result = await client.query(text)
  await destroyClientPG(client)
  res.json(result.rows)
})

router.get('/:id', authorization, verifyId, async (req, res) => {
  const id = parseInt(req.params.id, 10)
  const client = await createClientPG()
  const text = 'SELECT * FROM public.users Where id=$1'
  const result = await client.query(text, [id])
  await destroyClientPG(client)
  res.json(result.rows[0])
})

router.post('/', authorization, usersCreate, async (req, res) => {
  const { name, email, cpf, fone, password } = req.query
  const client = await createClientPG()
  try {
    const text = 'INSERT INTO public.users (name, email, cpf, fone, password, create_by, create_in, update_by, update_in) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);'
    const values = [name, email, cpf, fone, generateHashPassword(password), req.user_id, formatTimestamps(new Date()), req.user_id, formatTimestamps(new Date())]
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

router.put('/:id', authorization, usersUpdate, verifyId, async (req, res) => {
  const id = parseInt(req.params.id, 10)
  const { name, email, cpf, fone, password } = req.body
  const client = await createClientPG()
  try {
    const text = 'UPDATE public.users SET name=$1, email=$2, cpf=$3, fone=$4, password=$5, update_by=$6, update_in=$7 WHERE id=$8 RETURNING *'
    const values = [name, email, cpf, fone, generateHashPassword(password), req.user_id, formatTimestamps(new Date()), id]
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
    const text = 'UPDATE public.users SET delete_in=$1, delete_by=$2 WHERE id=$3'
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
