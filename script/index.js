function AlertaLogin() {
    let alerta = document.getElementById('fundo');
    if (alerta.style.display == "none" || alerta.style.display == "") {
        alerta.style.display = "flex";
    }
}

function RolagemPromocoesProximo() {
    let promocao1 = document.getElementById('promoção1');
    let promocao2 = document.getElementById('promoção2');
    let promocao3 = document.getElementById('promoção3');

    if (promocao1.style.display === "grid" || promocao1.style.display === "") {
        promocao1.style.display = "none";
        promocao2.style.display = "grid";
    } else if (promocao2.style.display === "grid" ) {
        promocao2.style.display = "none";
        promocao3.style.display = "grid";
    } else if (promocao3.style.display === "grid") {
        promocao3.style.display = "none";
        promocao1.style.display = "grid";
    }
}

function RolagemPromocoesAnterior() {
    let promocao1 = document.getElementById('promoção1');
    let promocao2 = document.getElementById('promoção2');
    let promocao3 = document.getElementById('promoção3');

    if (promocao3.style.display === "grid") {
        promocao3.style.display = "none";
        promocao2.style.display = "grid";
    } else if (promocao2.style.display === "grid" ) {
        promocao2.style.display = "none";
        promocao1.style.display = "grid";
    } else if (promocao1.style.display === "grid" || promocao1.style.display === "") {
        promocao1.style.display = "none";
        promocao3.style.display = "grid";
    }
}

function RolagemAutomatica() {
    setInterval(RolagemPromocoesProximo, 7000);
}

function LoginAutomatico() {
    let user = JSON.parse(localStorage.getItem('user')) || {};

    if (user.access_token) {
        window.location.href="../view/home.html"
    }
}

window.onload = function () {
    LoginAutomatico();
    RolagemAutomatica();
}