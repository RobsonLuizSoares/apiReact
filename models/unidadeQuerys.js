const Unidade = require('./Unidade')
const Pendencia = require('./Pendencia')

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

const searchByPendencias = async (req, res) => {
  const parameter = req.params.name
  try {
    const pendente = await Unidade
      .findOne({ name: parameter })
      .then((unidade) => {
        /*  if (unidade) { */
        Pendencia
          .find({ unidade: unidade._id })
          .then((pendencias) => {
            res.json({ pendencias })
          })
          .catch((err) => {
            return res.json({ message: 'Não há pendências para essa Unidade ' })
          })

        /*  } else {
           return res.json({ message: 'Não foi possivel encontrar a Unidade' })
         }*/

      })
  } catch (error) {
    if (error) {
      res.json({ message: 'Não foi possível encontrar a unidade' })
    }
  }
}



module.exports = { searchByName, searchByLocal, searchByPendencias }