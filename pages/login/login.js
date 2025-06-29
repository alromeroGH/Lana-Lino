import { createHeader } from '../../components/header/header.js';

const header = document.getElementById('header');
header.innerHTML = createHeader(); // Esto está bien

const btn = document.getElementById('btn-login');
if (btn) {
  btn.addEventListener('click', iniciarSesion);
}

async function iniciarSesion() {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();

  if (!email || !password) {
    alert('Por favor, completa ambos campos (email y contraseña).');
    return;
  }

  try {
    const res = await fetch('http://localhost:4000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    
    if (!res.ok) {
        const errorData = await res.json();
        console.error('Error del servidor:', errorData);
        alert(errorData.error || errorData.message || 'Error en el inicio de sesión. Credenciales incorrectas.');
        return;
    }

    const data = await res.json();
    console.log("Respuesta completa del backend al login:", data);
    const token = data.jwt;

    if (token) {
      alert('Inicio de sesión exitoso.');
      localStorage.setItem("jwtToken", token);
      window.location.href = '../home/home.html';
    } else {
      alert('Inicio de sesión exitoso, pero no se recibió el token. Intenta de nuevo.');
      console.error("El backend no envió el token en la propiedad 'jwt':", data);
    }

  } catch (err) {
    console.error('Error al conectar con el servidor de login:', err);
    alert('No se pudo conectar al servidor. Verifica tu conexión o el estado del servidor.');
  }
}
