const express = require('express');


const routes = express.Router();
const authMiddleware = require('./middlewares/auth');


const PersonController = require('./controllers/PersonController');
const authController = require('./controllers/authController');

routes.post('/registeruser', authController.register);
routes.post('/authuser', authController.authenticate);

routes.use(authMiddleware)

routes.post('/register', PersonController.storePerson);

routes.get('/', PersonController.indexPerson);
routes.get('/person/:id', PersonController.getPerson);

routes.put('/person/:id', PersonController.changePerson);

routes.delete('/person/:id', PersonController.deletePerson);




module.exports = routes;