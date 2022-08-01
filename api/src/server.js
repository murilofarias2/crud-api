const express = require('express')
const database = require('./config/database')
const routes = require('./routes')
const protected = require('./controllers/authController')
const cors = require('cors')


const server = express()

server.use(cors())
server.use(express.json());
server.use(routes)




server.listen(3333, () => {console.log('Servidor iniciado')})


