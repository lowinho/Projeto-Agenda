const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');

const { loginRequired } = require('./src/middlewares/middleware'); // Passos(6) - importar middlewares e ...

// Rotas da home
route.get('/', homeController.index);

// Rotas de login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

// Rotas de contato
route.get('/contato/index', loginRequired, contatoController.index); // Passos(1) Cria rota aqui no routes // Passos(6)... colocar nas rotas
route.post('/contato/register', loginRequired, contatoController.register); // Passos(7) cria rota de post
route.get('/contato/index/:id', loginRequired, contatoController.editIndex); // Passos(10) cria rota do contato id
route.post('/contato/edit/:id', loginRequired, contatoController.edit); // Passos(16) - criamos uma rota post de edit/:id
route.get('/contato/delete/:id', loginRequired, contatoController.delete);

module.exports = route;