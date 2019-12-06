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
// Rota de busca
router.get('/user/:id', userQuery.searchByName)

// PUT
router.put('/editar/:id', async (req, res, next) => {
  try {
    const editUser = await Users.findOneAndUpdate({ _id: req.params.id }, req.body)

      .then(() => {
        Users.findOne({ _id: req.params.id })

        return res.send({ message: 'Usuário editado com sucesso' })

      })

  } catch (error) {
    if (error) return console.log(error)

  }
})


router.delete('/excluir/:id', async (req, res) => {
  try {
    const removeUser = await Users.findByIdAndRemove({
      _id: req.params.id
    })

    return res.send({ message: 'Usuário excluído' })
  } catch (error) {
    if (error) return res.send({ message: 'Erro ao excluir usuário' })
  }

})

module.exports = router