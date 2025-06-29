import { createHeader } from '../../../components/header/header.js';
import { createAdminNav } from '../../../components/nav/nav.js';
import { createFooter } from '../../../components/footer/footer.js';

const header = document.getElementById('header');
const nav = document.getElementById('nav');
const footer = document.getElementById('footer')

header.innerHTML = createHeader();
nav.innerHTML = createAdminNav();
footer.innerHTML = createFooter();


const productForm = document.getElementById('add-product'); 
const productNameInput = document.getElementById('product-name');
const productDescriptionInput = document.getElementById('product-description');
const productPriceInput = document.getElementById('product-cost');
const productGenreInput = document.getElementById('product-genre');
const productCategorySelect = document.getElementById('product-category'); 


loadCategories();

async function loadCategories() {
    try {
        const token = localStorage.getItem('token');
        const headers = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch('http://localhost:4000/api/obtenerCategorias', {
            method: 'GET',
            headers: headers 
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error al cargar categorías:', errorData);
            return;
        }

        const data = await response.json();

        if (data.codigo === 200 && data.payload && data.payload.length > 0) {
            data.payload.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id_categoria;
                option.textContent = category.nombre;
                productCategorySelect.appendChild(option);
            });
        } else {
            console.warn('Backend devolvió categorías vacías o error:', data);
        }
    } catch (error) {
        console.error('Error de conexión al cargar categorías:', error);
    }
}


productForm.addEventListener('submit', async (event) => {
    event.preventDefault(); 
    const nombre = productNameInput.value;
    const descripcion = productDescriptionInput.value;
    const precio = parseFloat(productPriceInput.value); 
    const genero = productGenreInput.value;
    const categoriaNombre = productCategorySelect.value;
    const imagen = '../../../assets/img/descarga.jpeg'; 
    if (!nombre || !descripcion || isNaN(precio) || !genero || !categoriaNombre ) {
        alert('Por favor, completa todos los campos.', 'error');
        return;
    }
    if (precio <= 0) {
        alert('El precio debe ser un valor positivo.', 'error');
        return;
    }
    const body = {
        nombre,
        descripcion,
        precio,
        genero,
        id_categoria: categoriaNombre,
        imagen
    };

    let token = localStorage.getItem('token');

    if (!token) {
        alert('Debes iniciar sesión para cargar productos.', 'error');
        return;
    }
    try {
        const response = await fetch('http://localhost:4000/api/cargarProducto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        if (response.ok) { 
            if (data.codigo === 200) {
                alert(data.mensaje || 'Producto registrado exitosamente!', 'success');
                
            } else {
                alert(data.mensaje || 'Error al registrar el producto.', 'error');
                console.error('Error de registro del backend:', data);
            }
        } else {
            alert(data.mensaje || `Error del servidor: ${response.status} ${response.statusText}`, 'error');
            console.error('Respuesta HTTP de error:', data);
        }
    } catch (error) {
        console.error('Error de conexión al registrar el producto:', error);
        alert('No se pudo conectar al servidor para registrar el producto. Inténtalo de nuevo.', 'error');
    }
});