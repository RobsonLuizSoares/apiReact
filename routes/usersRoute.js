const express = require('express')
const Users = require('../models/user')
const userQuery = require('../models/userQuerys')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const users = await Users.find({})
    return res.send(users)
  }
  catch (error) {
    return res.send({ error: 'Erro na consulta de usuários' })
  }
})

router.post('/create', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) return res.send({ error: 'Dados insuficientes para criar novo usuário' })

  try {

    const userExist = await Users.findOne({ email })

    if (userExist) res.send({ error: 'Usuário já registrado' })

    const newUser = await Users.create(req.body)

    newUser.password = undefined

    return res.send(newUser)

  } catch (error) {

    return res.send({ error: 'Erro ao criar usuário' })

  }
})

router.get('/busca/:name', userQuery.searchByName)

module.exports = router