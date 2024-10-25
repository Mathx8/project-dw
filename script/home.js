let perfil = document.getElementById('perfil');
let sobre = document.getElementById('sobre');
let carros = document.getElementById('carros');

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

function ListUser() {
    carros.style.display = "flex";
    perfil.style.display = "none";
    sobre.style.display = "none";
}