import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './modules/Login'; // Frontend(1) - importamos o Login

const login = new Login('.form-login'); // criamos um login chamando a classe
const cadastro = new Login('.form-cadastro'); // criamos um cadastro chamando a classe

login.init(); // iniciamos o login com método criado
cadastro.init(); // iniciamos o cadastro com método criado

// import './assets/css/style.css';