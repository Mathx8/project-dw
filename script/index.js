const url = "http://api.weatherapi.com/v1/current.json?key=6079c61dd6ee45cbac9124340242811&q=Sao Paulo&days=6&aqi=no&alerts=no"

function LoginAutomatico() {
    let user = JSON.parse(localStorage.getItem('user')) || {};

    if (user.access_token) {
        window.location.href="../view/home.html"
    }
}

async function Clima() {
    try {
        let api = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        let resposta = await api.json();
        console.log(resposta); 

        let clima = resposta.current.temp_c+"°"
        let local = resposta.location.name

        document.getElementById('temperatura').innerHTML = clima;
        document.getElementById('cidade').innerHTML = local;
        
    } catch (error) {
        console.error("Erro ao carregar endereços:", error);
    }
}

window.onload = function () {
    Clima();
    LoginAutomatico();
}