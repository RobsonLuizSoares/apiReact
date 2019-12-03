const User = require('./user')

const searchByName = async (req, res, next) => {
  const urlParameter = req.params.name
  try {

    const search = await User.find({ 'name': urlParameter })

    return res.json(search)

  } catch (error) {

    return error
  }
}

module.exports = { searchByName }