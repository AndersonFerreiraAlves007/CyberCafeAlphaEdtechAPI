const express = require('express')
const { createClientPG, destroyClientPG } = require('../utils/clientePG')

const router = express.Router()

router.get('/', async (req, res) => {
  const client = await createClientPG();
  const text = 'SELECT * FROM public.clients';
  const result = await client.query(text);
  await destroyClientPG(client);
  res.json(result.rows);
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const client = await createClientPG();
  const text = 'SELECT * FROM public.clients Where id=$1';
  const result = await client.query(text, [id]);
  await destroyClientPG(client);
  res.json(result.rows[0]);
});

router.post('/', async (req, res) => {
  const { name, email, cpf, username, create_by } = req.query;
  const client = await createClientPG();
  try {
    const text = "INSERT INTO public.clients (name, username, email, cpf, create_by, create_in) VALUES ($1, $2, $3, $4, $5);";
    const values = [name, username, email, cpf, create_by, formatTimestamps(new Date(join))];
    const result = await client.query(text, values);
    await destroyClientPG(client);
    res.json(result.rows[0]);
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
  const id = req.params.id;
  const deleteBy = req.body.delete_by;
  const client = await createClientPG();
  try {
    // querys
    const text = 'UPDATE public.rents SET delete_in=$1, delete_by=$2 WHERE id=$3';
    const values = [formatTimestamps(new Date()), deleteBy, id];
    const result = await client.query(text, values);
    await destroyClientPG(client)
    res.json(result);
  } catch (e) {
    await destroyClientPG(client)
    res.status(400).json({
      message: 'Mensagem de erro aqui!'
    })
  }
})

module.exports = router
