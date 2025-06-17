import { createHeader } from '../../components/header/header.js';
import { createNav } from '../../components/nav/nav.js';
import { createFooter } from '../../components/footer/footer.js';

const header = document.getElementById('header');
const nav = document.getElementById('nav');
const footer = document.getElementById('footer')

header.innerHTML = createHeader();
nav.innerHTML = createNav();
footer.innerHTML = createFooter();

const productPriceElement = document.getElementById('product-base-price');
const installmentsSelect = document.getElementById('installments-select');
const installmentPriceDisplay = document.getElementById('installment-price-display');
const stockQuantityElement = document.getElementById('stock-quantity');
const addToCartButton = document.getElementById('add-to-cart-btn');

const basePrice = parseFloat(productPriceElement.textContent.replace('.', '').replace(',', '.'));
const currentStock = 15;

function updateInstallmentPrice() {
    const selectedInstallments = parseInt(installmentsSelect.value);
    let cuotaPrice = basePrice / selectedInstallments;
    installmentPriceDisplay.textContent = `Paga en ${selectedInstallments} cuota${selectedInstallments > 1 ? 's' : ''} de $${cuotaPrice.toFixed(2).replace('.', ',')}`;
}

function updateStockStatus() {
    if (currentStock <= 0) {
        stockQuantityElement.textContent = 'Producto sin stock';
        addToCartButton.disabled = true;
        addToCartButton.textContent = 'Sin Stock';
    } else {
        stockQuantityElement.textContent = `${currentStock} unidades disponibles`;
        addToCartButton.disabled = false;
        addToCartButton.textContent = 'Agregar al Carrito';
    }
}

installmentsSelect.addEventListener('change', updateInstallmentPrice);

document.addEventListener('DOMContentLoaded', () => {
    updateInstallmentPrice();
    updateStockStatus();
});

addToCartButton.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = '../cart/cart.html';
})