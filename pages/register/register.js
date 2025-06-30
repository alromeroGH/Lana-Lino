import { createHeader } from '../../components/header/header.js';

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

    if (!nombre.trim()) {
  alert('El nombre no puede estar vacío.');
  return;
}

if (!apellido.trim()) {
  alert('El apellido no puede estar vacío.');
  return;
}

if (!direccion.trim()) {
  alert('La dirección no puede estar vacía.');
  return;
}

if (!telefono.trim()) {
  alert('El teléfono no puede estar vacío.');
  return;
} else if (!/^\d{7,15}$/.test(telefono)) {
  alert('El teléfono debe contener solo números (7 a 15 dígitos).');
  return;
}

if (!email.trim()) {
  alert('El email no puede estar vacío.');
  return;
} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  alert('Ingresá un email válido.');
  return;
}

if (!password.trim()) {
  alert('La contraseña no puede estar vacía.');
  return;
} else if (password.length < 4) {
  alert('La contraseña debe tener al menos 4 caracteres.');
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