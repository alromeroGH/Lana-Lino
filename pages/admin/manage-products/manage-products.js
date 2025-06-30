import { createHeader } from '../../../components/header/header.js';
import { createAdminNav } from '../../../components/nav/nav.js';
import { createFooter } from '../../../components/footer/footer.js';

const header = document.getElementById('header');
const nav = document.getElementById('nav');
const footer = document.getElementById('footer');

header.innerHTML = createHeader();
nav.innerHTML = createAdminNav();
footer.innerHTML = createFooter();

const main = document.querySelector('main');

async function loadProducts() {
    try {
        const response = await fetch('http://localhost:4000/api/obtenerProductos');
        const data = await response.json();

        if (data.codigo !== 200) {
            throw new Error(data.mensaje);
        }

        renderTable(data.payload);
    } catch (error) {
        console.error('Error al cargar productos:', error);
        main.innerHTML = '<p>Error al cargar productos.</p>';
    }
}

function renderTable(productos) {
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Género</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            ${productos.map((prod, index) => `
                <tr>
                    <td><input type="text" value="${prod.producto}" id="nombre-${index}" /></td>
                    <td><input type="text" value="${prod.descripcion}" id="descripcion-${index}" /></td>
                    <td><input type="number" value="${prod.precio}" id="precio-${index}" /></td>
                    <td><input type="text" value="${prod.genero}" id="genero-${index}" /></td>
                    <td><button onclick="modificarProducto(${index}, '${prod.idCategoria}')">Guardar</button></td>
                </tr>
            `).join('')}
        </tbody>
    `;

    main.appendChild(table);
}

window.modificarProducto = async function(index, idCategoria) {
    const nombre = document.getElementById(`nombre-${index}`).value;
    const descripcion = document.getElementById(`descripcion-${index}`).value;
    const precio = parseFloat(document.getElementById(`precio-${index}`).value);
    const genero = document.getElementById(`genero-${index}`).value;
   
    let validacion = genero.toLowerCase();
    const generosValidos = ['unisex', 'masculino', 'femenino'];

    if (!generosValidos.includes(validacion)) {
    alert('Error, género inválido');
    return;
}


    const token = localStorage.getItem('jwtToken');
    if (!token) return alert('Debes iniciar sesión');

    const body = {
        nombre,
        descripcion,
        precio,
        genero,
        id_categoria: idCategoria
    };

    try {
        const response = await fetch('http://localhost:4000/api/modificarProducto', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        if (data.codigo === 200) {
            alert('Producto actualizado correctamente');
        } else {
            alert('Error al actualizar producto: ' + data.mensaje);
        }
    } catch (error) {
        console.error('Error al modificar producto:', error);
    }
};

loadProducts();