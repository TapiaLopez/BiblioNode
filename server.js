const express = require('express')

const { connect } = require('./app/config/db')

connect()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(4000, () => {
  console.log('Node server listening on port 4000')
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

const cors = require('cors')

app.use(
  cors({
    origin: ['http://localhost:4000', 'http://localhost:4200'],
    credentials: true,
  }),
)

const logger = require('morgan')

app.use(logger('dev'))

const user = require('./app/api/routes/user.routes')
const autores = require('./app/api/routes/autores.routes')
const libros = require('./app/api/routes/libros.routes')

app.use('/libro', libros)
app.use('/user', user)
app.use('/autor', autores)

const HTTPSTATUSCODE = require('./app/utils/httpStatusCode')

app.use((req, res, next) => {
  let err = new Error()
  err.status = 404
  err.message = HTTPSTATUSCODE[404]
  next(err)
})

app.use((err, req, res, next) => {
  return res.status(err.status || 500).json(err.message || 'Unexpected error')
})

app.disable('x-powered-by')

app.set("secretKey", "nodeRestApi");