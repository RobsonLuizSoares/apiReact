const express = require('express')
const Unidade = require('../models/Unidade')
const unidadeQuery = require('../models/unidadeQuerys')
const Pendencia = require('../models/Pendencia')

const router = express.Router()

// buscar as  Unidades - OK
router.get('/', async (req, res) => {
  try {
    const unidades = await Unidade.find({})
    return res.json(unidades)
  }
  catch (error) {
    return res.json({ error: 'Erro na consulta de usuários' })
  }
})
//Criar Unidade - OK
router.post('/create', async (req, res) => {
  const { name, local } = req.body

  if (!name || !local) return res.send({ error: 'Dados insuficientes para criar novo usuário' })

  try {

    const unityExist = await Unidade.findOne({ name })

    if (unityExist) res.send({ error: 'Unidade já registrada' })

    const newUnity = await Unidade.create(req.body)

    return res.json(newUnity)

  } catch (error) {

    return res.send({ error: 'Erro ao criar Unidade' })

  }
})
// Rota de busca por ID - OK
router.get('/local/:local', unidadeQuery.searchByLocal)
// Rota de busca por name - OK
router.get('/nome/:name', unidadeQuery.searchByName)


// PUT - Editar Unidade - Ok
router.put('/edit/:id', async (req, res, next) => {
  try {
    const editUnity = await Unidade.findOneAndUpdate({ _id: req.params.id }, req.body)

      .then(() => {
        Unidade.findOne({ _id: req.params.id })

        return res.json({ message: 'Usuário editado com sucesso' })

      })

  } catch (error) {
    if (error) return console.log(error)

  }
})


router.delete('/excluir/:id', async (req, res) => {
  try {
    const removeUnity = await Unidade.findByIdAndRemove({
      _id: req.params.id
    })

    return res.send({ message: 'Unidade excluída' })
  } catch (error) {
    if (error) return res.send({ message: 'Erro ao excluir unidade' })
  }
})

router.get('/buscar/:name', async (req, res) => {
  Unidade
    .findOne({ name: req.params.name })
    .then((unidade) => {
      if (unidade) {
        Pendencia.find({ unidade: unidade._id })
          .then((pendencias) => {
            res.json({ unidade, pendencias })
          })
      }
    })
})


module.exports = router