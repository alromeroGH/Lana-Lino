import { createHeader } from '../../components/header/header.js';
import { createNav } from '../../components/nav/nav.js';
import { createFooter } from '../../components/footer/footer.js';
import { createProductCard } from '../../components/product-card/product-card.js';

const header = document.getElementById('header');
const nav = document.getElementById('nav');
const footer = document.getElementById('footer');
const productCard = document.querySelectorAll('#product-card'); 

header.innerHTML = createHeader();
nav.innerHTML = createNav();
footer.innerHTML = createFooter();
for (let i = 0; i < productCard.length; i++) {
    productCard[i].innerHTML = createProductCard('../../assets/img/descarga.jpeg', 'Auriculares', 20000);
}