function LoginAutomatico() {
    let user = JSON.parse(localStorage.getItem('user')) || {};

    if (user.access_token) {
        window.location.href="../view/home.html"
    }
}

window.onload = function () {
    LoginAutomatico();
}