async function Login(){
    const url = "https://go-wash-api.onrender.com/api/login";

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    let api = await fetch(url,{
        method:"POST",
        body:JSON.stringify({
            "email":email,
            "password": password,
            "user_type_id":1
        }),
        headers:{
            'Content-Type':'application/json'
        }
    });

    let resposta = await api.json();

    if (api.ok) {
        alert("Login feito com sucesso, você será redirecionado para página inicial.")
        localStorage.setItem("user", JSON.stringify(resposta))
        window.location.href="../view/home.html"
    } else {
        alert(resposta.data.errors);
    }
}

function getToken() {
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user.access_token);
}