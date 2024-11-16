const dados = new URL(window.location.href);
const searchParams = dados.searchParams;
const id = searchParams.get("id");

const url = `https://go-wash-api.onrender.com/api/auth/address/${id}`;
let token = JSON.parse(localStorage.getItem('user'));

async function ObterEndereco() {
    try {
        let api = await fetch(url, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token.access_token
            }
        });

        if (api.ok) {
            const endereco = await api.json();

            document.getElementById('title').value = endereco.data.title || "";
            document.getElementById('cep').value = endereco.data.cep || "";
            document.getElementById('address').value = endereco.data.address || "";
            document.getElementById('number').value = endereco.data.number || "";
            document.getElementById('complement').value = endereco.data.complement || "";
        } else {
            alert("Erro ao obter os dados do endereço. Verifique o ID.");
        }
    } catch (error) {
        console.error("Erro ao obter os dados do endereço:", error);
    }
}

async function AtualizarEndereco() {
    const NovoTitle = document.getElementById('title').value.trim();
    const NovoCep = document.getElementById('cep').value.trim();
    const NovoAddress = document.getElementById('address').value.trim();
    const NovoNumber = document.getElementById('number').value.trim();
    const NovoComplement = document.getElementById('complement').value.trim();

    const cepValido = /^\d{5}-\d{3}$/.test(NovoCep);
    if (!cepValido) {
        alert("Por favor, insira um CEP válido no formato XXXXX-XXX.");
        return;
    }

    try {
        let api = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "title": NovoTitle || document.getElementById('title').value,
                "cep": NovoCep || document.getElementById('cep').value,
                "address": NovoAddress || document.getElementById('address').value,
                "number": NovoNumber || document.getElementById('number').value,
                "complement": NovoComplement || document.getElementById('complement').value
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.access_token
            }
        });

        let resposta = await api.json();
        console.log(resposta)

        if (api.ok && !resposta.status) {
            alert("Endereço atualizado com sucesso, você será redirecionado para a página inicial.");
            window.location.href = "../view/home.html";
        } else {
            alert("Erro ao atualizar o endereço: " + (resposta.status || "Erro desconhecido"));
        }
    } catch (error) {
        console.error("Erro ao fazer requisição para a API:", error);
    }
}

window.onload = function () {
    ObterEndereco();
}