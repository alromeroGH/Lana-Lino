import { createHeader } from '../../components/header/header.js';
import { createNav } from '../../components/nav/nav.js';
import { createFooter } from '../../components/footer/footer.js';
import { createProductCardFavorite } from '../../components/product-card/product-card.js';
import { parseJwt } from '../../components/user-id/user-id.js';

const header = document.getElementById('header');
const nav = document.getElementById('nav');
const footer = document.getElementById('footer');
const productContainer = document.querySelector('.products-container');

const formSearch = document.getElementById('form-search');
const search = document.getElementById('search');
const formFilter = document.getElementById('form-filter');
const gender = document.getElementById('gender-filter');
const category = document.getElementById('category-filter');
const color = document.getElementById('color-filter');

header.innerHTML = createHeader();
nav.innerHTML = createNav();
footer.innerHTML = createFooter();

let products = [];

const token = localStorage.getItem("token");
const idUser = parseJwt(token).id;

async function getProducts() {
  try {
    const response = await fetch("http://localhost:4000/api/obtenerProductos");
    const data = await response.json();
    products = [];
    data.payload.forEach((p) => {
      products += addProduct(p.producto, p.precio, p.id_producto);
    });
    if (products.length === 0) {
      productContainer.innerHTML = '<div>No hay productos</div>';
    } else {
      productContainer.innerHTML = products;
    }
  } catch (error) {
    console.error("Error al obtener productos:", error);
  }
}

async function searchProducts(search) {
  try {
    const response = await fetch("http://localhost:4000/api/obtenerProductos");
    const data = await response.json();
    let products = [];
    data.payload.forEach((p) => {
      if (p.producto.toLowerCase().includes(search.toLowerCase())) {
        products += addProduct(p.producto, p.precio, p.id_producto);
      }
    });
    if (products.length === 0) {
      productContainer.innerHTML = '<div>No se encontraron productos</div>';
    } else {
      productContainer.innerHTML = products;
    }
  } catch (error) {
    console.error("Error al buscar productos:", error);
  }
}

async function filterProducts(gender, category, color) {
  try {
    const response = await fetch("http://localhost:4000/api/obtenerProductos");
    const data = await response.json();
    let products = [];
    data.payload.forEach((p) => {
      if (
        (gender === 'all' && p.categoria.toLowerCase() === category.toLowerCase()) ||
        (category === 'all' && p.genero.toLowerCase() === gender.toLowerCase()) ||
        (p.genero.toLowerCase() === gender.toLowerCase() && p.categoria.toLowerCase() === category.toLowerCase())
      ) {
        products += addProduct(p.producto, p.precio, p.id_producto);
      }
    });
    if (products.length === 0) {
      productContainer.innerHTML = '<div>No se encontraron coincidencias</div>';
    } else {
      productContainer.innerHTML = products;
    }
  } catch (error) {
    console.error("Error al filtrar productos:", error);
  }
}

async function addFavorite(idProduct) {

  try {
    const response = await fetch("http://localhost:4000/api/agregarFavorito/", {
      method: "POST",
      headers: { "Content-Type": "application/json", 
         'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        id_producto: idProduct,
        id_usuario: idUser
      })
    });
    const data = await response.json();
    console.log("Favorito agregado:", data);
    alert('Producto agregado a favoritos!');
  } catch (error) {
    console.error("Error al agregar favorito:", error);
  }
}

function addProduct(producto, precio, idProduct) {
  return `<div class="product-card">
            ${createProductCardFavorite(
              "../../assets/img/descarga.jpeg",
              producto,
              precio,
              idProduct,
              idUser
            )}
          </div>`;
}

formSearch.addEventListener('submit', function(event) {
    event.preventDefault();
    searchProducts(search.value);
})

formFilter.addEventListener('submit', function(event) {
  event.preventDefault();
  filterProducts(gender.value, category.value, color.value);
})

getProducts();

 // Hacerla accesible la función addFavorite() desde el HTML generado
window.addFavorite = addFavorite;