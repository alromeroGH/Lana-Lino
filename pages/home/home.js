import { createHeader } from '../../components/header/header.js';
import { createNav } from '../../components/nav/nav.js';
import { createFooter } from '../../components/footer/footer.js';
import { createProductCard } from '../../components/product-card/product-card.js';

const header = document.getElementById('header');
const nav = document.getElementById('nav');
const footer = document.getElementById('footer')
const productContainer = document.querySelector('.products-container');

const formSearch = document.getElementById('form-search')
const search = document.getElementById('search');

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
      productContainer.innerHTML = products;
    });
  })
  .catch((error) => console.error("Error al obtener productos:", error));
}

async function searchProducts(search) {
    
}

formSearch.addEventListener('submit', (event) => {
    event.preventDefault();
    searchProducts(search.value);
})

 getProducts();