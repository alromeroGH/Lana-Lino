import { createHeader } from '../../components/header/header.js';
import { createNav } from '../../components/nav/nav.js';
import { createFooter } from '../../components/footer/footer.js';
import { createProductCard } from '../../components/product-card/product-card.js';

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


async function getProducts() {
    fetch("http://localhost:4000/api/obtenerProductos")
  .then((response) => response.json())
  .then((data) => {
    products = [];
    data.payload.forEach((p) => {
        products += `<div class="product-card">
        ${createProductCard(
        "../../assets/img/descarga.jpeg",
        p.producto,
        p.precio
      )}
      </div>`;
    });
    if (products.length === 0) {
      productContainer.innerHTML = '<div>No hay productos</div>'
    } else {
      productContainer.innerHTML = products;
    }
  })
  .catch((error) => console.error("Error al obtener productos:", error));
}

async function searchProducts(search) {
  fetch("http://localhost:4000/api/obtenerProductos")
    .then((response) => response.json())
    .then((data) => {
      let products = [];
      data.payload.forEach((p) => {
        if (p.producto.toLowerCase().includes(search.toLowerCase())) {
          products += `<div class="product-card">
            ${createProductCard(
              "../../assets/img/descarga.jpeg",
              p.producto,
              p.precio
            )}
          </div>`;
        }
      });
      if (products.length === 0) {
        productContainer.innerHTML = '<div>No se encontraron productos</div>'
      } else {
        productContainer.innerHTML = products;
      }
    })
    .catch((error) => console.error("Error al obtener productos:", error));
}

async function filterProducts(gender, category, color) {
  fetch("http://localhost:4000/api/obtenerProductos")
    .then((response) => response.json())
    .then((data) => {
      let products = [];
      data.payload.forEach((p) => {
        if (gender === 'all' &&
              p.categoria.toLowerCase() == category.toLowerCase()) {
          products += addProduct(p.producto, p.precio);
        } else if (category === 'all' &&
              p.genero.toLowerCase() == gender.toLowerCase()) {
          products += addProduct(p.producto, p.precio);
        } else if (p.genero.toLowerCase() == gender.toLowerCase() &&
              p.categoria.toLowerCase() == category.toLowerCase()) {
          products += addProduct(p.producto, p.precio);
        }
      });
      if (products.length === 0) {
        productContainer.innerHTML = '<div>No se encontraron coincidiencias</div>'
      } else {
        productContainer.innerHTML = products;
      }
    })
    .catch((error) => console.error("Error al obtener productos:", error));
}

function addProduct(producto, precio) {
  return `<div class="product-card">
            ${createProductCard(
              "../../assets/img/descarga.jpeg",
              producto,
              precio
            )}
          </div>`;
}

formSearch.addEventListener('submit', (event) => {
    event.preventDefault();
    searchProducts(search.value);
})

formFilter.addEventListener('submit', function(event) {
  event.preventDefault();
  filterProducts(gender.value, category.value, color.value);
})

 getProducts();