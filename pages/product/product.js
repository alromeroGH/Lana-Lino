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
const err = document.getElementById('err');

const sizeSelect = document.getElementById('size-select');
const colorSelect = document.getElementById('color-select');

const productTitle = document.querySelector('.product-title');
const productDescription = document.querySelector('.product-description');



// obtengo el valor del id pasado como parametro en el url
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const productData = await getProduct(id); // se obtiene los datos de todos los inventarios
const productBase = productData[0]; // se obtiene la información general

function getData() {
    productTitle.innerText = productBase.producto;
    productDescription.innerHTML = productBase.descripcion;
    productPriceElement.innerHTML = productBase.precio;
    updateInstallmentPrice();
}

function fillSelects() {
    // set elimina repetidos, el ... convierte el set en array normal
    const sizes = [...new Set(productData.map(i => i.talle))];
    const colors = [...new Set(productData.map(i => i.color))];

    sizeSelect.innerHTML = sizes.map(s => `<option value="${s}">${s}</option>`);
    colorSelect.innerHTML = colors.map(c => `<option value="${c}">${c}</option>`);
}

function updateInstallmentPrice() {
    const basePrice = productPriceElement.innerText;
    const selectedInstallments = parseInt(installmentsSelect.value);

    let cuotaPrice = basePrice / selectedInstallments;
    installmentPriceDisplay.textContent = `Paga en ${selectedInstallments} cuota${selectedInstallments > 1 ? 's' : ''} de $${cuotaPrice.toFixed(2)}`;
}

function updateStockStatus() {
    const currentStock = productBase.stock;

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

function checkSelection() {
    const selectedTalle = sizeSelect.value;
    const selectedColor = colorSelect.value;

    // Validación para que el talle y el color seleccionados estén es stock
    const match = productData.find(p => p.talle === selectedTalle && p.color === selectedColor);

    if (match == undefined) {
        err.innerHTML = 'Convinación de talle y color no disponible';
    } else {
        window.location.href = `../cart/cart.html?id=${match.idInventario}`;
    }
}

installmentsSelect.addEventListener('change', updateInstallmentPrice);

addToCartButton.addEventListener('click', (event) => {
    event.preventDefault();
    checkSelection();
})

updateStockStatus();
fillSelects()
getData();