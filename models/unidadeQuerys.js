const Unidade = require('./Unidade')

const searchByLocal = async (req, res) => {

  const urlParameter = req.params.local
  try {

    const search = await Unidade.find({ 'local': urlParameter })

    return res.json(search)

  } catch (error) {

    return error
  }
}

const searchByName = async (req, res) => {

  const urlParameter = req.params.name
  try {

    const search = await Unidade.findOne({ 'name': urlParameter })

    return res.json(search)

  } catch (error) {

    return error
  }
}



module.exports = { searchByName, searchByLocal }