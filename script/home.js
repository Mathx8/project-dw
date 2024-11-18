let perfil = document.getElementById('perfil');
let sobre = document.getElementById('sobre');
let carros = document.getElementById('carros');
const url = "https://go-wash-api.onrender.com/api/auth/address";
let token = JSON.parse(localStorage.getItem('user'));

function NaoLogado() {
    let user = token || {};

    if (!user.access_token) {
        window.location.href="../index.html"
    }
}

function AbrirPerfil() {
    perfil.style.display = "flex";
    sobre.style.display = "none";
    carros.style.display = "none";
}

function AbrirSobre() {
    sobre.style.display = "flex";
    perfil.style.display = "none";
    carros.style.display = "none";
}

function AbrirCarros() {
    carros.style.display = "flex";
    perfil.style.display = "none";
    sobre.style.display = "none";
}

async function ListarEndereco() {
    try {
        let api = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.access_token
            }
        });

        let resposta = await api.json();
        console.log(resposta); 

        let enderecos = resposta.data;

        let conteudo = '';

        enderecos.forEach(dado => {
            conteudo += `
                <tr>
                    <td>${dado.title}</td>
                    <td>${dado.address}</td>
                    <td>${dado.number}</td>
                    <td>${dado.cep}</td>
                    <td><input class="botao" type='button' value="UPDATE" onClick="EnviarDados('${dado.id}')"></td>
                    <td><input class="botao" type='button' value="DELETE" onClick="DeletarEndereco('${dado.id}')"></td>
                </tr>`;
        });

        document.querySelector("tbody").innerHTML = conteudo;
        
    } catch (error) {
        console.error("Erro ao carregar endereços:", error);
    }
}

function EnviarDados(id) {
    const urlDados = `./updateEndereco.html?id=${id}`;
    window.location.href = urlDados;
}

async function DeletarEndereco(id) {
    try {
        let api = await fetch(url+"/"+id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.access_token
            }
        });

        let resposta = await api.json();
        console.log(resposta);
        
        ListarEndereco()
        alert("Endereço deletado com sucesso!")
    } catch (error) {
        console.error("Erro ao deletar endereço:", error);
    }
}

async function Logout() {
    try {
        const urlSair = "https://go-wash-api.onrender.com/api/auth/logout"
        let api = await fetch(urlSair, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.access_token
            }
        });

        let resposta = await api.json();
        console.log(resposta); 

        localStorage.clear();
        alert("Volte Sempre!");
        window.location.href="../index.html"
        
    } catch (error) {
        console.error("Erro ao sair:", error);
    }
}

window.onload = function () {
    NaoLogado();
    ListarEndereco();
}