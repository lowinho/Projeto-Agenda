import validator from 'validator';

export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() { // Frontend(2) - criamos o método init()
        this.events(); // chamando o método events()
    }

    events() { // Frontend(3) - criamos o método events
        if (!this.form) return; // se for não existe
        this.form.addEventListener('submit', e => { // evento de submit
            e.preventDefault(); // previnir atualizar
            this.validate(e); // usamos o método criado validate()
        });
    }

    validate(e) { // Frontend(4) - criamos um método validate
        const el = e.target; // definimos o elemento
        const emailInput = el.querySelector('input[name="email"]'); // chamamos o input email
        const passwordInput = el.querySelector('input[name="password"]'); // chamamos o input password
        let error = false; // criamos um erro

        if (!validator.isEmail(emailInput.value)) { // se não for um email válido...
            alert('E-mail inválido'); // ... mostra o erro com alert
            error = true; // erro = true porque tem erro
        }

        if (passwordInput.value.length < 6 || passwordInput.value.length > 50) { // se não tiver as especificações do password
            alert('Senha precisa ter entre 6 e 50 caracteres'); // mostra erro com alert
            error = true; // erro = true porque tem erro
        }

        if (!error) el.submit(); // se não tiver erro da um submit no elemento
    }
}