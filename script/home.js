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

        let conteudo = `
        <h3>Seus Endereços</h3>
        <table>
            <tr>
                <th>Título</th>
                <th>Endereço</th>
            </tr>`;

        for (let dado of enderecos) {
            conteudo += `
                <tr>
                    <td>${dado.title}</td>
                    <td>${dado.formatted_address}</td>
                </tr>`;
        }

        conteudo += `</table>`;


        document.getElementById("lista-endereco").innerHTML = conteudo;
        
    } catch (error) {
        console.error("Erro ao carregar endereços:", error);
    }
}

window.onload = function () {
    ListarEndereco();
}