const Contato = require('../models/ContatoModel'); // Passos(19) - importar contatos e...

exports.index = async(req, res) => {
    const contatos = await Contato.buscaContatos(); // usamos o buscaContatos() aqui
    res.render('index', { contatos }); // renderizou em contatos
};