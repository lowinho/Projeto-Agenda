const Contato = require('../models/ContatoModel'); // Passos(2) cria contatoController importanto do Model

exports.index = (req, res) => { // Passos(3) cria index e exporta
    res.render('contato', {
        contato: {} // Passos(14) - criamos um contato fake para criar um novo contato
    });
};

exports.register = async(req, res) => { // Passos(8) - cria um exports.register
    try { // fazemos um tryCatch
        const contato = new Contato(req.body); // Passos(9) - instanciando
        await contato.register();

        if (contato.errors.length > 0) { // se existir erros 
            req.flash('errors', contato.errors); // mostra mensagem flash
            req.session.save(() => res.redirect('back')); // save session e depois redirect
            return;
        }

        req.flash('success', 'Contato registrado com sucesso.');
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`)); // redirect para a página de edição do contato
        return;
    } catch (e) {
        console.log(e);
        return res.render('404'); // catch redirect página 404
    }
};

exports.editIndex = async function(req, res) { // Passos(12) - exporta um editIndex
    if (!req.params.id) return res.render('404'); // se não for enviado o params id, retorna um erro
    const contato = await Contato.buscaPorId(req.params.id);
    if (!contato) return res.render('404');

    res.render('contato', { contato }); // renderiza o contato
};

exports.edit = async function(req, res) { // Passos(17) - criamos um exports.edit
    try {
        if (!req.params.id) return res.render('404'); // se não for enviado o parametro retorna erro
        const contato = new Contato(req.body); //se for usamos o model de Contato que já foi configurado
        await contato.edit(req.params.id); // precisamos chamar o edit para usar o id

        if (contato.errors.length > 0) { // checamos os erros e sucess igual ao register novo usuário
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('back'));
            return;
        }

        req.flash('success', 'Contato editado com sucesso.');
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
        return;
    } catch (e) {
        console.log(e);
        res.render('404');
    }
};

exports.delete = async function(req, res) { // Passos(21) - criando um exports.delete
    if (!req.params.id) return res.render('404'); // se não for enviado o parâmetro envia para a página 404

    const contato = await Contato.delete(req.params.id); // deleta o params id
    if (!contato) return res.render('404');

    req.flash('success', 'Contato apagado com sucesso.');
    req.session.save(() => res.redirect('back'));
    return;
};