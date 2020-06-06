exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors'); // captura as mensagens do flash na tela
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user; // salva a session do usuário
    next();
};

exports.outroMiddleware = (req, res, next) => {
    next();
};

exports.checkCsrfError = (err, req, res, next) => {
    if (err) {
        return res.render('404');
    }

    next();
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};

exports.loginRequired = (req, res, next) => { // Passos(5) - criar um loginRequired nos middlewares
    if (!req.session.user) { // se não for o user não acessa
        req.flash('errors', 'Você precisa fazer login.');
        req.session.save(() => res.redirect('/')); // sempre salvar a session antes do redirect
        return;
    }

    next();
};