// Link da API fornecida
const url = "https://go-wash-api.onrender.com/api/user";

// Captura os valores dos campos do formulário
async function cadastroUsuario() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const cpf_cnpj = document.getElementById('cpf_cnpj').value.trim();
    const birthday = document.getElementById('birthday').value.trim();
    const terms = document.getElementById('terms').checked;

    // Validação dos campos
    const isValidName = ValidateName(name);
    const isValidEmail = ValidateEmail(email);
    const isValidPassword = ValidatePassword(password);
    const isValidCpfCnpj = ValidateCpf_cnpj(cpf_cnpj);
    const isValidBirthday = ValidateBirthday(birthday);
    const isValidTerms = ValidateTerms(terms); 

    // Verifica se todos os campos são válidos
    if (isValidName && isValidEmail && isValidPassword && isValidCpfCnpj && isValidBirthday && isValidTerms) {
       
        // Requisição à API
        try {
            let api = await fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    "name": name,
                    "email": email,
                    "user_type_id": 1,
                    "password": password,
                    "cpf_cnpj": cpf_cnpj,
                    "terms": 1,
                    "birthday": birthday
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (api.ok) {
                let resposta = await api.json();
                console.log(resposta);
                alert('Cadastro realizado com sucesso!'); 
                return;
            }

            let respostaErro = await api.json();

            // Verifica se o CPF/CNPJ já está sendo usado
            if (respostaErro.data.errors.cpf_cnpj && respostaErro.data.errors.cpf_cnpj[0] === "The cpf cnpj has already been taken.") {
                errorValidation('cpf_cnpj', 'CPF/CNPJ já está sendo usado');
                alert('CPF/CNPJ já está cadastrado.'); 
                return false;
            }

            // Verifica se o email já está sendo usado
            if (respostaErro.data.errors.email && respostaErro.data.errors.email[0] === "The email has already been taken.") {
                errorValidation('email', 'Email já está sendo usado');
                alert('Email já está cadastrado.'); 
                return false;
            }

            console.log(respostaErro.data.errors);
        } catch (error) {
            console.error("Erro ao enviar dados:", error);
        }
    }
}

// Funções de validação existentes
function ValidateName(name) {
    if (name === '') {
        errorValidation('name', 'Preencha este campo');
        return false;
    }
    if (name.length < 3) {
        errorValidation('name', 'O nome deve ter mais que 3 caracteres');
        return false;
    }
    successValidation('name');
    return true;
}
/////////////////////////////////////////////////////////////////
function ValidateEmail(email) {
    if (email === '') {
        errorValidation('email', 'Preencha este campo');
        return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        errorValidation('email', 'Email inválido');
        return false;
    }
    successValidation('email');
    return true;
}
/////////////////////////////////////////////////////////////////
function ValidatePassword(password) {
    if (password === '') {
        errorValidation('password', 'Preencha este campo');
        return false;
    }
    if (password.length < 6) {
        errorValidation('password', 'A senha deve ter pelo menos 6 caracteres');
        return false;
    }
    successValidation('password');
    return true;
}
/////////////////////////////////////////////////////////////////
function ValidateCpf_cnpj(cpf_cnpj) {
    if (cpf_cnpj === '') {
        errorValidation('cpf_cnpj', 'Preencha este campo');
        return false;
    }
    if (!/^\d{11}$|^\d{14}$/.test(cpf_cnpj)) {
        errorValidation('cpf_cnpj', 'CPF/CNPJ inválido. Deve ter 11 ou 14 dígitos');
        return false;
    }
    successValidation('cpf_cnpj');
    return true;
}
/////////////////////////////////////////////////////////////////
function ValidateBirthday(birthday) {
    if (birthday === '') {
        errorValidation('birthday', 'Preencha este campo');
        return false;
    }
    successValidation('birthday');
    return true;
}
/////////////////////////////////////////////////////////////////
function ValidateTerms(terms) {
    if (!terms) {
        alert('Você deve aceitar os termos antes de continuar.');
        return false;
    }
    return true;
}

// Funções de manipulação de erros e sucesso
function errorValidation(inputId, mensagem) {
    const formControl = document.getElementById(inputId).parentElement;
    const small = formControl.querySelector('small');
    small.innerText = mensagem;
    formControl.className = 'form-control error';
}

function successValidation(inputId) {
    const formControl = document.getElementById(inputId).parentElement;
    formControl.className = 'form-control success';
}
