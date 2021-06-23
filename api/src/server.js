const express = require('express')
const database = require('./config/database')
const routes = require('./routes')
const protected = require('./controllers/authController')
const cors = require('cors')


const server = express()

server.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", '*');
    res.header("Access-Control-Allow-Headers", '*');
    server.use(cors)
    next()
})
server.use(express.json());
server.use(protected)
server.use(routes)




server.listen(3333, () => {console.log('Servidor iniciado')})


