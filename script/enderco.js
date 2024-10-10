document.getElementById('email').addEventListener('input', function () {
    ValidateEmail(this.value);
});

document.getElementById('password').addEventListener('input', function () {
    ValidatePassword(this.value);
});

async function Login() {
    const url = "https://go-wash-api.onrender.com/api/login";

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    const isValidEmail = ValidateEmail(email);
    const isValidPassword = ValidatePassword(password);

    //let token = JSON.parse(localStorage.getItem('user').aceaccess_token);

    if (isValidEmail && isValidPassword) {

        let api = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "email": email,
                "password": password,
                "user_type_id": 1
            }),
            headers: {
                'Content-Type': 'application/json',
             //   'Authorization': 'Bearer' +token
            }
        });

        let resposta = await api.json();

        if (api.ok) {
            alert("Login feito com sucesso, você será redirecionado para página inicial.")
            localStorage.setItem("user", JSON.stringify(resposta))
            window.location.href = "../view/home.html"
        } else {
            errorValidation('email', '');
            errorValidation('password', resposta.data.errors);
        }
    }
}

function ValidateEmail(email) {
    if (email === '') {
        errorValidation('email', 'Preencha este campo');
        return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        errorValidation('email', 'Email inválido');
        return false;
    }
    clearError('email');
    return true;
}

function ValidatePassword(password) {
    if (password === '') {
        errorValidation('password', 'Preencha este campo');
        return false;
    }
    if (password.length < 6) {
        errorValidation('password', 'A senha deve ter pelo menos 6 caracteres');
        return false;
    }
    clearError('password');
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