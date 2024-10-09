let perfil = document.getElementById('perfil');
let sobre = document.getElementById('sobre');
let carros = document.getElementById('carros');

function AbrirPerfil() {
    perfil.style.display = "grid";
    sobre.style.display = "none";
    carros.style.display = "none";
}

function AbrirSobre() {
    sobre.style.display = "grid";
    perfil.style.display = "none";
    carros.style.display = "none";
}

function AbrirCarros() {
    carros.style.display = "grid";
    perfil.style.display = "none";
    sobre.style.display = "none";
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

window.onload = function () {
    RolagemAutomatica();
}