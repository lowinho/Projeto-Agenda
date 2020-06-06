const Login = require('../models/LoginModel'); // chamo o Login nos models

exports.index = (req, res) => {
    if (req.session.user) return res.render('login-logado'); // se o usuário estiver logado
    return res.render('login');
};

exports.register = async function(req, res) {
    try {
        const login = new Login(req.body); // crio uma instância chamando a classe criada no Model
        await login.register(); // esse método valida os registros no model

        if (login.errors.length > 0) {
            req.flash('errors', login.errors); // chamamos o req.flash com o login.errors
            req.session.save(function() { // salvamos a session redirecionando de onde veio      
                return res.redirect('back'); // retornou de onde veio o redirecionamento
            });
            return;
        }

        req.flash('success', 'Seu usuário foi criado com sucesso.'); // chamamos o req.flash com o login.errors
        req.session.save(function() {
            return res.redirect('back'); // salvamos a session redirecionando de onde veio
        });
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};

exports.login = async function(req, res) {
    try {
        const login = new Login(req.body); // usando o login
        await login.login();

        if (login.errors.length > 0) { // se ocorrer erro ele mostra as mensagens abaixo
            req.flash('errors', login.errors);
            req.session.save(function() { // salva a session e...
                return res.redirect('back'); // ...retorna
            });
            return;
        }

        req.flash('success', 'Você entrou no sistema.'); // se não der erro ele entra no sistema
        req.session.user = login.user; // cria uma sesssion
        req.session.save(function() { // salva a sesseion e...
            return res.redirect('back'); // ... retorna
        });
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};

exports.logout = function(req, res) { // criando o logout do cadastro
    req.session.destroy(); // usuário saiu
    res.redirect('/');
};