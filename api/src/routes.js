const express = require('express')

const routes = express.Router()

const PersonController = require('./controllers/PersonController')

routes.post('/register', PersonController.storePerson)

routes.get('/', PersonController.indexPerson)
routes.get('/person/:id', PersonController.getPerson)

routes.put('/person/:id', PersonController.changePerson)

routes.delete('/person/:id', PersonController.deletePerson)




module.exports = routes;