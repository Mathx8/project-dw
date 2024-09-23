async function cadastroUsuario() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let cpf_cnpj = document.getElementById('cpf_cnpj').value;
    let birthday = document.getElementById('birthday').value;

    // Validação
    if (!name) {
        alert("Nome é obrigatório.");
        return;
    }
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        alert("Email inválido.");
        return;
    }
    
    if (password.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres.");
        return;
    }

    if (!/^\d{11}|\d{14}$/.test(cpf_cnpj)) {
        alert("CPF/CNPJ inválido. Deve ter 11 ou 14 dígitos.");
        return;
    }

    if (!birthday) {
        alert("Data de nascimento é obrigatória.");
        return;
    }

    // Se todas as validações passarem, continua com a requisição
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
        return;
    }

    let respostaErro = await api.json();
    console.log(respostaErro.data.errors.cpf_cnpj);
}








