const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PendenciaSchema = new Schema({
  unidade: {
    type: Schema.Types.ObjectId,
    ref: 'name',
    required: true
  },
  tipo: {
    type: String,
    required: true,
    lowercase: true
  },
  sanada: {
    type: Boolean,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Pendencia', PendenciaSchema)