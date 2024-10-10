document.getElementById('title').addEventListener('input', function () {
    ValidateTitle(this.value);
});

document.getElementById('cep').addEventListener('input', function () {
    ValidateCep(this.value);
});

document.getElementById('address').addEventListener('input', function () {
    ValidateAddress(this.value);
});

document.getElementById('number').addEventListener('input', function () {
    ValidateNumber(this.value);
});

async function Endereco() {
    const url = "https://go-wash-api.onrender.com/api/auth/address";

    const title = document.getElementById('title').value.trim();
    const cep = document.getElementById('cep').value.trim();
    const address = document.getElementById('address').value.trim();
    const number = document.getElementById('number').value.trim();
    const complement = document.getElementById('complement').value.trim();

    const isValidTitle = ValidateTitle(title);
    const isValidCep = ValidateCep(cep);
    const isValidAddress = ValidateAddress(address);
    const isValidNumber = ValidateNumber(number);

    let token = JSON.parse(localStorage.getItem('user.access_token'));

    if (isValidTitle && isValidCep && isValidAddress && isValidNumber) {

        let api = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "title": title,
                "cep": cep,
                "address": address,
                "number": number,
                "complement": complement
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' +token
            }
        });

        let resposta = await api.json();

        if (api.ok) {
            alert("Endereço cadastrado com sucesso, você será redirecionado para página inicial.") 
            //window.location.href = "../view/home.html"
        } else {
            errorValidation('title', '');
            errorValidation('cep', '');
            errorValidation('address', '');
            errorValidation('number', '');
            errorValidation('complement', resposta.data.errors);
        }
    }
}

function ValidateTitle(title) {
    if (title === '') {
        errorValidation('title', 'Preencha este campo');
        return false;
    }
    clearError('title');
    return true;
}

function ValidateCep(cep) {
    if (cep === '') {
        errorValidation('cep', 'Preencha este campo');
        return false;
    }
    if (cep.length < 8) {
        errorValidation('cep', 'A senha deve ter 8 caracteres');
        return false;
    }
    clearError('cep');
    return true;
}

function ValidateAddress(address) {
    if (address === '') {
        errorValidation('address', 'Preencha este campo');
        return false;
    }
    clearError('address');
    return true;
}

function ValidateNumber(number) {
    if (number === '') {
        errorValidation('number', 'Preencha este campo');
        return false;
    }
    clearError('number');
    return true;
}

function errorValidation(inputId, mensagem) {
    const formControl = document.getElementById(inputId).parentElement;
    const small = formControl.querySelector('small');
    small.innerText = mensagem;
    formControl.className = 'form-control error';
}

function clearError(inputId) {
    const formControl = document.getElementById(inputId).parentElement;
    const small = formControl.querySelector('small');
    small.innerText = '';
    formControl.className = 'form-control';
}