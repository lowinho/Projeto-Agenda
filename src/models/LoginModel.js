const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async login() { // promises async
        this.valida();
        if (this.errors.length > 0) return; // se meu array não estiver vazio
        this.user = await LoginModel.findOne({ email: this.body.email }); // promises await

        if (!this.user) { // se o usuário existe ele sai desse if
            this.errors.push('Usuário não existe.');
            return;
        }

        if (!bcryptjs.compareSync(this.body.password, this.user.password)) { // compara os bcrypts
            this.errors.push('Senha inválida'); // compara as duas senhas (digitada e cadastrada)
            this.user = null; // garante que seja null se ocorrer um erro
            return;
        }
    }

    async register() { // usar async
        this.valida();
        if (this.errors.length > 0) return; // se existir erro ele para aqui com mensagem de erro

        await this.userExists(); // se não tiver erro checa se o usuário existe (e await)

        if (this.errors.length > 0) return; // se usuário não existir checa os erros

        const salt = bcryptjs.genSaltSync(); // se não tiver erro cria um salt para criptografia
        this.body.password = bcryptjs.hashSync(this.body.password, salt); // pega o password e encripta ele

        this.user = await LoginModel.create(this.body);
    }

    async userExists() { // método de validação de usuário (não repetir usuários)
        this.user = await LoginModel.findOne({ email: this.body.email }); // no user ele verifica se o usuário ja existe
        if (this.user) this.errors.push('Usuário já existe.'); // mensagem de erro
    }

    valida() {
        this.cleanUp(); // criamos um método

        // Validação
        // O e-mail precisa ser válido
        if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');

        // A senha precisa ter entre 6 e 50
        if (this.body.password.length < 6 || this.body.password.length > 50) {
            this.errors.push('A senha precisa ter entre 3 e 50 caracteres.');
        }
    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = ''; // se o que for enviado no body não for string ele retorna uma string vazia
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        };
    }
}

module.exports = Login;