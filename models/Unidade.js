const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UnidadeSchema = new Schema({
  name: {
    type: String
  },
  local: {
    type: String,
    required: true,
    lowercase: true
  },
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Unidade', UnidadeSchema)