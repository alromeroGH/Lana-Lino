import { createHeader } from '../../components/header/header.js';
import { createNav } from '../../components/nav/nav.js';
import { createFooter } from '../../components/footer/footer.js';
import { getProduct } from '../../components/get-product/get-product.js';

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

const productTitle = document.querySelector('.product-title');
const productDescription = document.querySelector('.product-description');



// obtengo el valor del id pasado como parametro en el url
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// console.log(await getProduct(id));
const product = await getProduct(id);

function getData() {
    productTitle.innerText = product.producto;
    productDescription.innerHTML = product.descripcion;
}

function updateInstallmentPrice() {
    productPriceElement.innerHTML = product.precio;

    const basePrice = productPriceElement.innerText;
    const selectedInstallments = parseInt(installmentsSelect.value);

    let cuotaPrice = basePrice / selectedInstallments;
    installmentPriceDisplay.textContent = `Paga en ${selectedInstallments} cuota${selectedInstallments > 1 ? 's' : ''} de $${cuotaPrice.toFixed(2)}`;
}

function updateStockStatus() {
    const currentStock = product.stock;

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


addToCartButton.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = `../cart/cart.html?id=${product.id_producto}`;
})

updateInstallmentPrice();
updateStockStatus();
getData();