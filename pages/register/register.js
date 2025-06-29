import { createHeader } from '../../components/header/header.js';
import { createNav } from '../../components/nav/nav.js';

const header = document.getElementById('header');
const nav = document.getElementById('nav');
if (nav) {
  nav.innerHTML = createNav();
}

header.innerHTML = createHeader();

let btn = document.getElementById("btn-register");
if (btn) {
    btn.addEventListener('click', registrarUsuario);
  }

async function registrarUsuario(){
    let nombre = document.getElementById('register-name').value;
    let apellido = document.getElementById('register-surname').value;
    let direccion = document.getElementById('register-address').value;
    let telefono = document.getElementById('register-phone').value;
    let email = document.getElementById('register-email').value;
    let password = document.getElementById('register-password').value;
    let rol = 'cliente';
    
    if (!nombre || !apellido || !direccion || !telefono || !email || !password) {
        alert('Por favor, completá todos los campos.');
    return;
    }

    let body = {nombre, apellido, direccion, telefono, email, rol, password};
    console.log(body);

    try{
        let a = await fetch('http://localhost:4000/api/registrarUsuario',{
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
    });
    
    let data = await a.json();

    if(a.ok){
        alert('Usuario registrado correctamente');
        window.location.href = '../login/login.html';
    } else{
        alert('Error al regisrar: ' + data.error || 'verficia los datos');
    } 
    } catch (error){
        console.error(error);
        alert('Error al conectar con el servidor')
    }
}