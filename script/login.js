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

    if (isValidEmail && isValidPassword) {

        let api = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "email": email,
                "password": password,
                "user_type_id": 1
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        let resposta = await api.json();

        if (api.ok) {
            alert("Login feito com sucesso, você será redirecionado para página inicial.")
            localStorage.setItem("user", JSON.stringify(resposta))
            window.location.href = "../view/home.html"
        } else if (resposta.data.errors === "Usuário não esta ativo") {
            alert(resposta.data.errors);
            errorValidation('email', 'Email não ativado.');
            errorValidation('password', '');
        } else if (resposta.data.errors === "Usuário não foi encontrado") {
            alert(resposta.data.errors);
            errorValidation('email', 'Usuário inválido.');
            errorValidation('password', '');
        }
        else {
            alert(resposta.data.errors);
            errorValidation('email', '');
            errorValidation('password', 'Email ou senha incorreto. Tente novamente');
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