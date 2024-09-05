function Cadastro() {
    let name = document.getElementById('name').value;
    if (name) {
        alert(name)
    } else {
        alert("O nome é obrigatório")
    }
    let email = document.getElementById('email').value;
    if (email) {
        alert(email)
    } else {
        alert("O email é obrigatório")
    }
    let password = document.getElementById('password').value;
    if (password) {
        alert(password)
    } else {
        alert("A senha é obrigatório")
    }
    let cpf_cnpj = document.getElementById('cpf_cnpj').value;
        if (cpf_cnpj) {
            alert(cpf_cnpj)
        } else {
            alert("O CPF/CNPJ é obrigatório")
        }
    let birthday = document.getElementById('birthday').value;
        if (birthday) {
            alert(birthday)
        } else {
            alert("A Data de Nascimento é obrigatório")
        }
    let terms = document.getElementById('terms').checked;
    if (terms) {

    } else {
        alert("Aceitar os termos é obrigatório")
    }
}