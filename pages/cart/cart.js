import { createHeader } from '../../components/header/header.js';
import { createNav } from '../../components/nav/nav.js';
import { createFooter } from '../../components/footer/footer.js';
import { createProductCardCart } from '../../components/product-card/product-card.js';

const header = document.getElementById('header');
const nav = document.getElementById('nav');
const footer = document.getElementById('footer');
const productCard = document.querySelectorAll('#product-card'); 
const payment = document.getElementById('payment');

header.innerHTML = createHeader();
nav.innerHTML = createNav();
footer.innerHTML = createFooter();
for (let i = 0; i < productCard.length; i++) {
    productCard[i].innerHTML = createProductCardCart('../../assets/img/descarga.jpeg', 'Auriculares', 20000);
}

payment.addEventListener('click', function(event) {
    event.preventDefault();
    paymentPage();
} )

function paymentPage() {
    window.location.href = '../payment/payment.html';
}