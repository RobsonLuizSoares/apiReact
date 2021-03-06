const express = require('express')
const Pendencia = require('../models/Pendencia')
const pendenciaQuerys = require('../models/pendenciaQuerys')
//const User = require('../models/user')

const router = express.Router()

router.get('/', (req, res) => {
  res.json({ message: 'Página de Pendências' })
})

router.get('/search', async (req, res) => {
  try {
    const pendencias = await Pendencia
      .find()
      .populate('unidade')
      .sort({ created: 1 })
      .then((pendencias) => {
        return res.json(pendencias)
      })
  }
  catch (error) {
    return res.json({ error: 'Erro na consulta de usuários' })
  }
})

router.post('/create', async (req, res) => {
  const pendencia = await Pendencia.create(req.body)
  new Pendencia(pendencia)
    .save()
    .then(() => {
      return res.json({ pendencia })
    })
})

// Rota de busca por Tipo de Pendencia 
router.get('/tipo/:tipo', pendenciaQuerys.searchByTipo)

// Rota de busca por OK
router.get('/ok/:sanada', pendenciaQuerys.searchByOk)

router.get('/unidade/:unidade', pendenciaQuerys.searchByUnidade)

/* router.get('/:tipo', async (req, res) => {
  const tipo = await Pendencia
    .findOne({ tipo: req.params.tipo })
    .then((pendencia) => {
      console.log(pendencia)
      res.json(pendencia)
    })
    .catch((err) => {
      console.log(err)
    })
}) */




module.exports = router