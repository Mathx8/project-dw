const url = 'https://go-wash-api.onrender.com/api/user';


async function Cadastro() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let cpf_cnpj = document.getElementById('cpf_cnpj').value;
    let api = await fetch (url,{
        method: "POST",
        body:JSON.stringify(
            {
                "name":name,
                "email":email,
                "user_type_id":1,
                "password": "123456",
                "cpf_cnpj": cpf_cnpj,
                "terms": 1,
                "birthday":"2000-10-12"    
            }
        ),
        headers:{
            'Content-Type': 'application/json'
        }
                    
    });

    if(api.ok){

        let reposta =  await api.json()
        console.log(reposta);
        return;
    }
    let repostaErros = await api.json();
    alert(repostaErros.data.erros.cpf_cnpj[0])    
}

