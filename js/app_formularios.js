const formularioLogin = document.querySelector("#form-login")

console.log(formularioLogin);



formularioLogin.addEventListener("submit", function (evento) {
    
    evento.preventDefault(); //deshabilita el comportamiento por defecto de la pagina a la hora de iniciar sesion o ingresar

const username = document.querySelector("#username").value;
const password = document.querySelector("#password").value;
let encontrado = false;

for (let usuario of usuarios){
    if (usuario.username === username && usuario.password === password) {
alert("Bienvenido " + usuario.nombre);
encontrado = true;
break;
    } else {
        encontrado = false;
    }
    
    if(!encontrado) {
        alert("Usuario o contraseña incorrectos");
    }
}
});