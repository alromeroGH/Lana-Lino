import { createHeader } from '../../components/header/header.js';
import { createNav } from '../../components/nav/nav.js';
import { createFooter } from '../../components/footer/footer.js';
import { createProductCardCart } from '../../components/product-card/product-card.js';

const header = document.getElementById('header');
const nav = document.getElementById('nav');
const footer = document.getElementById('footer');
const productCard = document.querySelectorAll('#product-card'); 
const payment = document.getElementById('payment');
const productContainer = document.querySelector('.products-container');
const totalPrice = document.getElementById('total-price');

header.innerHTML = createHeader();
nav.innerHTML = createNav();
footer.innerHTML = createFooter();
for (let i = 0; i < productCard.length; i++) {
    productCard[i].innerHTML = createProductCardCart('../../assets/img/descarga.jpeg', 'Auriculares', 20000);
}

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
        ${createProductCardCart(
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

payment.addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = '../payment/payment.html';
})