const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PendenciaSchema = new Schema({
  unidade: {
    type: Schema.Types.ObjectId,
    ref: 'Unidade',
    required: true
  },
  termo: {
    type: Boolean,
    required: true
  },
  bem: {
    type: Boolean,
    required: true
  },
  isOk: {
    type: Boolean,
    required: true,
  },
  tombamento: {
    type: Number
  },
  comentario: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Pendencia', PendenciaSchema)