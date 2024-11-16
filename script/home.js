let perfil = document.getElementById('perfil');
let sobre = document.getElementById('sobre');
let carros = document.getElementById('carros');
const url = "https://go-wash-api.onrender.com/api/auth/address";
let token = JSON.parse(localStorage.getItem('user'));

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

        if (!api.ok) {
            throw new Error("Erro ao buscar endereços: " + api.statusText);
        }

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
                    <td><input type='button' value="Atualizar" onClick="EnviarDados('${dado.id}')"></td>
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

function NaoLogado() {
    let user = token || {};

    if (!user.access_token) {
        window.location.href="../index.html"
    }
}

window.onload = function () {
    NaoLogado();
    ListarEndereco();
}