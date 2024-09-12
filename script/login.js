function Login(){
    let name = document.getElementById('name').value;
    if (name) {
        alert(name)
    } else {
        alert("O nome é obrigatório")
    }
    let password = document.getElementById('password').value;
    if (password) {
        alert(password)
    } else {
        alert("A senha é obrigatório")
    }
    let terms = document.getElementById('terms').checked;
    if (terms) {
            alert("Vlw é nois")
    } else {
        alert("Aceitar os termos é obrigatório")
    }
}