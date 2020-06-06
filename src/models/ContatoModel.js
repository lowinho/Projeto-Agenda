const mongoose = require('mongoose'); // Passos(9) - cria um ContatoModel
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({ // mudar todos os dados com o nome do model
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    criadoEm: { type: Date, default: Date.now }, // modo de salvar data automática
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

// Dentro do MODEL (9) - passos
function Contato(body) { // model(1) - usando Construction Function
    this.body = body; // 2 - chama as variáveis globais
    this.errors = [];
    this.contato = null;
}

Contato.prototype.register = async function() { // model(2) - cria um register --sempre usar async function e...
    this.valida(); // com valida(3) criado abaixo
    if (this.errors.length > 0) return; // se tiver algum erro ele para aqui e mostra a mensagem cadastrada
    this.contato = await ContatoModel.create(this.body); // variável global chamando um ...await com a ação que precisamos
};

Contato.prototype.valida = function() { // model(3) criado um método
    this.cleanUp(); // chama o método cleanUp(5)

    // Validação
    // O e-mail precisa ser válido
    if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido'); // se o email for diferente do email validator cria um erro no array errors
    if (!this.body.nome) this.errors.push('Nome é um campo obrigatório.'); // se for diferente de nome cria array errors
    if (!this.body.email && !this.body.telefone) { // se não for enviado email e telefone...
        this.errors.push('Pelo menos um contato precisa ser enviado: e-mail ou telefone.'); // ...ele envia essa mensagem para array errors
    }
};

Contato.prototype.cleanUp = function() { // model(5) - método criado para ser colocado apenas string
    for (const key in this.body) { // criamos um for com key in contéudo digitado
        if (typeof this.body[key] !== 'string') { // se o contéudo digitado for diferente de string
            this.body[key] = ''; // retorna contéudo vazio
        }
    }

    this.body = { // model(4) criamos um this.body com as informações do mongo
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        telefone: this.body.telefone,
    };
};

Contato.prototype.edit = async function(id) { // Passos(18) - criamos um método
    if (typeof id !== 'string') return; // se id for diferente de string para aqui
    this.valida(); // usamos o valida para validação todos os campos que foram enviados novamente
    if (this.errors.length > 0) return; // se não tiver erros continua
    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true }); // encontre o contato por id e atualiza // new: true - retorna os dados atualizados e não os antigos
};

// Métodos estáticos não usam os prototypes
Contato.buscaPorId = async function(id) { // Passos(11) - criado um método buscaPorId
    if (typeof id !== 'string') return; // se esse id não for uma string para aqui.
    const contato = await ContatoModel.findById(id); // aqui procura o id
    return contato; // e retorna o contato
};

Contato.buscaContatos = async function() { // Passos(20) - cria um método
    const contatos = await ContatoModel.find() // busca contatos con um find (podemos filtrar dentro do find())
        .sort({ criadoEm: -1 }); // foi colocado um .sort para ordenar o criadoEm em -1 para ordem decrescente
    return contatos;
};

Contato.delete = async function(id) { // Passos(22) - criamos um método
    if (typeof id !== 'string') return;
    const contato = await ContatoModel.findOneAndDelete({ _id: id }); // findOneAndDelete, acha o id e deleta
    return contato;
};


module.exports = Contato;