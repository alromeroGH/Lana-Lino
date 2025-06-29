import { createHeader } from '../../components/header/header.js';
import { createNav } from '../../components/nav/nav.js';
import { createFooter } from '../../components/footer/footer.js';
import { parseJwt } from '../../components/user-id/user-id.js';

const header = document.getElementById('header');
const nav = document.getElementById('nav');
const footer = document.getElementById('footer');

header.innerHTML = createHeader();
nav.innerHTML = createNav();
footer.innerHTML = createFooter();

const elements = {
    nombre: document.getElementById('nombre'),
    apellido: document.getElementById('apellido'),
    direccion: document.getElementById('direccion'),
    telefono: document.getElementById('telefono'),
    email: document.getElementById('email'),
    password: document.getElementById('contraseña') 
};

const btnModificar = document.getElementById('btn-modificar');
const btnGuardar = document.getElementById('btn-guardar');
const btnCancelar = document.getElementById('btn-cancelar');

let originalUserData = {};

btnModificar.addEventListener('click', habilitarEdicion);
btnGuardar.addEventListener('click', guardarCambios);
btnCancelar.addEventListener('click', cancelarEdicion);

function habilitarEdicion() {
    // Guardar los datos actuales antes de modificarlos 
    for (const key in elements) {
        originalUserData[key] = elements[key].textContent;
        const input = document.createElement('input');
        input.type = (key === 'password' ? 'password' : (key === 'email' ? 'email' : 'text')); 
        input.value = elements[key].textContent;
        input.id = `input-${key}`;
        input.classList.add('editable-input');
        elements[key].parentNode.replaceChild(input, elements[key]); 
        elements[key] = input;
    }

    btnModificar.style.display = 'none';
    btnGuardar.style.display = 'inline-block';
    btnCancelar.style.display = 'inline-block';
};

function deshabilitarEdicion() {
    for (const key in elements) {
        const span = document.createElement('span');
        span.id = key; 
        span.setAttribute('data-field', key);
        span.textContent = elements[key].value || originalUserData[key];
        elements[key].parentNode.replaceChild(span, elements[key]);
        elements[key] = span;
    }


    btnModificar.style.display = 'inline-block';
    btnGuardar.style.display = 'none';
    btnCancelar.style.display = 'none';
}

function cancelarEdicion() {
    for (const key in elements) {
        if (elements[key] instanceof HTMLInputElement) {
            elements[key].value = originalUserData[key];
        }
    }
    deshabilitarEdicion();
}

async function obtenerDatos() {
    const token = localStorage.getItem("token");

    if (!token) {
        console.warn('No hay token. Redirigiendo al login.');
        alert('Necesitas iniciar sesión para ver este perfil.');
        localStorage.removeItem('jwtToken');
        window.location.href = '../login/login.html';
        return;
    }

    const userId = parseJwt(token).id;
    console.log("UserID extraído del token:", userId);

    if (!userId) {
        console.error('No se pudo obtener el ID del usuario del token. Redirigiendo.');
        alert('Error al autenticar tu sesión. Por favor, inicia sesión de nuevo.');
        localStorage.removeItem('jwtToken');
        window.location.href = '../login/login.html';
        return;
    }

    const url = `http://localhost:4000/api/obtenerDatosUsuario/${userId}`;

    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error('Error del servidor al obtener datos:', errorData);
            alert(errorData.mensaje || 'Error al cargar el perfil.');
            if (errorData.mensaje && errorData.mensaje.includes("Token")) {
                localStorage.removeItem('jwtToken');
                window.location.href = '../login/login.html';
            }
            return;
        }

        const data = await res.json();
        console.log("Datos del perfil recibidos:", data);

        if (data.codigo === 200 && data.payload && data.payload.length > 0) {
            const perfil = data.payload[0];
            elements.nombre.textContent = perfil.nombre;
            elements.apellido.textContent = perfil.apellido;
            elements.direccion.textContent = perfil.direccion;
            elements.telefono.textContent = perfil.telefono;
            elements.email.textContent = perfil.email;
            elements.password.textContent = perfil.password; 
        } else {
            console.error('El payload no contiene un objeto de usuario válido o el código no es 200.');
            alert('Error: Datos de usuario incompletos o no encontrados.');
        }
    } catch (err) {
        console.error('Error al conectar con el servidor para obtener el perfil:', err);
        alert('No se pudo conectar al servidor para cargar el perfil.');
    }
}

async function guardarCambios() {
    const token = localStorage.getItem("token");
    const userId = parseJwt(token).id;

    if (!token || !userId) {
        alert('Sesión no válida. Por favor, inicia sesión de nuevo.');
        localStorage.removeItem('jwtToken');
        window.location.href = '../login/login.html';
        return;
    }

    const updatedData = {
        nombre: elements.nombre.value,
        apellido: elements.apellido.value,
        direccion: elements.direccion.value,
        telefono: elements.telefono.value,
        email: elements.email.value,
        rol: 'cliente',
        password: elements.password.value, 
    };

    console.log("Enviando datos para modificar:", updatedData);

    const url = `http://localhost:4000/api/modificarUsuario/${userId}`;

    try {
        const res = await fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedData)
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error('Error del servidor al guardar cambios:', errorData);
            alert(errorData.mensaje || 'Error al guardar los cambios en el perfil.');
            if (errorData.mensaje && errorData.mensaje.includes("Token")) {
                localStorage.removeItem('jwtToken');
                window.location.href = '../login/login.html';
            }
            return;
        }

        const data = await res.json();
        if (data.codigo === 200) {
            alert('Perfil actualizado exitosamente!');
            await obtenerDatos();
            deshabilitarEdicion(); 
        } else {
            alert(data.mensaje || 'Error al actualizar el perfil.');
        }
    } catch (err) {
        console.error('Error al conectar con el servidor para guardar el perfil:', err);
        alert('No se pudo conectar al servidor para guardar los cambios.');
    }
}

document.addEventListener('DOMContentLoaded', obtenerDatos);