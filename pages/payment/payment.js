import { createHeader } from '../../components/header/header.js';
import { createFooter } from '../../components/footer/footer.js';
import { createProductCard } from '../../components/product-card/product-card.js';

const header = document.getElementById('header');
const footer = document.getElementById('footer');
const productContainer = document.querySelector('.products-container');
const totalPrice = document.getElementById('total-price');

header.innerHTML = createHeader();
footer.innerHTML = createFooter();

let products = [];
let total = 0;


async function getProducts() {
    fetch("http://localhost:4000/api/obtenerProductos")
  .then((response) => response.json())
  .then((data) => {
    products = [];
    total = 0;
    data.payload.forEach((p) => {
        total += p.precio;
        products += `<div class="product-card">
        ${createProductCard(
            "../../assets/img/descarga.jpeg",
            p.producto,
            p.precio
        )}
        </div>`;
        productContainer.innerHTML = products;
    });
    totalPrice.innerHTML = `<h1>Total: $${total}</h1>`;
  })
  .catch((error) => console.error("Error al obtener productos:", error));
}

getProducts();