const dados = new URL(window.location.href);
const searchParams = dados.searchParams;

const id = searchParams.get("id");
const title = searchParams.get("title");
const cep = searchParams.get("cep");
const address = searchParams.get("address");
const number = searchParams.get("number");
let complement = searchParams.get("complement");

if (complement === "null") {
    complement = "";
} else {
    complement = complement || "";
}

document.getElementById('title').value = title || "";
document.getElementById('cep').value = cep || "";
document.getElementById('address').value = address || "";
document.getElementById('number').value = number || "";
document.getElementById('complement').value = complement;

console.log(id, title, cep, address, number, complement);

async function AtualizarEndereco() {
    const url = `https://go-wash-api.onrender.com/api/auth/address/${id}`;

    let token = JSON.parse(localStorage.getItem('user'));

    const NovoTitle = document.getElementById('title').value.trim();
    const NovoCep = document.getElementById('cep').value.trim();
    const NovoAddress = document.getElementById('address').value.trim();
    const NovoNumber = document.getElementById('number').value.trim();
    const NovoComplement = document.getElementById('complement').value.trim();

    const title = NovoTitle || searchParams.get("title");
    const cep = NovoCep || searchParams.get("cep");
    const address = NovoAddress || searchParams.get("address");
    const number = NovoNumber || searchParams.get("number");
    const complement = NovoComplement || (searchParams.get("complement") === "null" ? "" : searchParams.get("complement"));

    const cepValido = /^\d{5}-\d{3}$/.test(cep);
    if (!cepValido) {
        alert("Por favor, insira um CEP válido com 8 dígitos numéricos.");
        return;
    }

    try {
        let api = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "title": title,
                "cep": cep,
                "address": address,
                "number": number,
                "complement": complement
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.access_token
            }
        });

        let resposta = await api.json();

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