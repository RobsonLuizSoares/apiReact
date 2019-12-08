const Pendencia = require('./Pendencia')

const searchByTipo = async (req, res) => {

  const urlParameter = req.params.tipo
  try {

    const search = await Pendencia.find({ 'tipo': urlParameter })
    console.log(req.params)
    return res.json(search)

  } catch (error) {

    return error
  }
}

const searchByOk = async (req, res) => {
  const urlParameter = req.params.sanada
  try {
    const search = await Pendencia.find({ 'sanada': urlParameter })
    return res.json(search)
  } catch (error) {
    return error
  }
}

const searchByUnidade = async (req, res) => {
  const urlParameter = req.params.unidade
  try {
    const search = await Pendencia.find({ 'unidade': urlParameter })
    return res.json(search)
  } catch (error) {
    return error
  }
}



module.exports = { searchByTipo, searchByOk, searchByUnidade }