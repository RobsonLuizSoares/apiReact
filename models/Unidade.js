const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UnidadeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  local: {
    type: String,
    required: true
  },
  responsavel: {
    type: String,
    required: true
  },
  pendencia: {
    type: Schema.Types.ObjectId,
    ref: 'Pendencia'
  },
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Unidade', UnidadeSchema)