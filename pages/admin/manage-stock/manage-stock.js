import { createHeader } from '../../../components/header/header.js';
import { createAdminNav } from '../../../components/nav/nav.js';
import { createFooter } from '../../../components/footer/footer.js';

const header = document.getElementById('header');
const nav = document.getElementById('nav');
const footer = document.getElementById('footer')

header.innerHTML = createHeader();
nav.innerHTML = createAdminNav();
footer.innerHTML = createFooter();

const inventoryForm = document.getElementById('add-inventory');
const inventoryProductSelect = document.getElementById('stock-product');
const inventoryColor = document.getElementById('stock-color');
const inventorySize = document.getElementById('stock-size');
const inventoryStock = document.getElementById('stock');

loadProducts();

async function loadProducts(){
    try {
        const token = localStorage.getItem('token');
        const headers = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch('http://localhost:4000/api/obtenerProductos', {
            method: 'GET',
            headers: headers 
        });
        
        if(!response.ok){
            const errorData = await response.json();
            console.error ('Error al cargar productos: ', errorData);
            return;
        }

        const data = await response.json();
    
        if(data.codigo === 200 && data.payload && data.payload.length >0){
            data.payload.forEach(product => {
                const option = document.createElement('option');
                option.value = product.id_producto;
                option.textContent = product.producto;
                inventoryProductSelect.appendChild(option);
            });
        }else{
            console.warn('Backend devolvio productos vacios o error:', data)
        }
    } catch (error) {
        console.error('Error de conexion al cargar categorias:', error);
    }   
}

inventoryForm.addEventListener('submit', async(event)=>{
    event.preventDefault();
    
    const producto = inventoryProductSelect.value;
    const color = inventoryColor.value;
    const talle = inventorySize.value;
    const stock = inventoryStock.value;

    if(!producto || !color || !talle || !stock){
        alert('Por favor, completa todos los campos', 'error')
        return;
    }
    if (stock<= 0){
        alert('Cantidad de stock invalido');
        return;  
    }
    
    const body = {
        talle,
        color,
        stock,
        id_producto: producto
    };

    let token = localStorage.getItem('token');

    if (!token){
        alert('Debes iniciar sesion para cargar inventarios');
        return;
    }
    try {
        const response = await fetch('http://localhost:4000/api/crearInventario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        if(response.ok){
            if(data.codigo === 200){
                alert(data.mensaje || 'Inventario registrado exitosamente!', 'success');
            }else{
                alert(data.mensaje || 'Error al registrar el producto.', 'error');
                console.error('Error de registro del backend:', data);
            }

        }else{
            alert(data.mensaje || `Error del servidor: ${response.status} ${response.statusText}`, 'error');
            console.error('Respuesta HTTP de error:', data);
        }
    }catch (error){
        console.error('Error de conexión al registrar el producto:', error);
        alert('No se pudo conectar al servidor para registrar el producto. Inténtalo de nuevo.', 'error');
    }
});