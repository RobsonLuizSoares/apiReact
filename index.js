const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const cors = require('cors')
const uri = 'mongodb+srv://lya:25092016@apireact-ltema.mongodb.net/test?retryWrites=true&w=majority'
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const options = {

  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  poolSize: 10
}

mongoose
  .connect(uri, options)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  })
  .catch(e => { console.log(e) })



mongoose.connection.on('connected', () => {
  console.log('Aplicação conectada com sucesso ao Banco de dados')
})

mongoose.connection.on('error', (err) => {
  console.log('Erro na conexão com o Banco de Dados', err)
})

mongoose.connection.on('disconnected', () => {
  console.log('Aplicação desconectada do Banco de dados')
})

//Body Parser
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const indexRoute = require('./routes/indexRoute')
const unidadesRoute = require('./routes/unidadesRoute')
const pendenciasRoute = require('./routes/pendenciasRoute')


app.use(express.static('public'))

app.use('/', indexRoute)
app.use('/unidades', unidadesRoute)
app.use('/pendencias', pendenciasRoute)





