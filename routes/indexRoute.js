const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  return res.send({ message: 'Tudo ok com método GET!' })
})

router.post('/', (req, res) => {
  return res.send({ message: 'Tudo ok com método POST!' })
})

module.exports = router