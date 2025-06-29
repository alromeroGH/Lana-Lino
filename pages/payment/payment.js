import { createHeader } from '../../components/header/header.js';
import { createFooter } from '../../components/footer/footer.js';
import { createProductCard } from '../../components/product-card/product-card.js';
import { parseJwt } from '../../components/user-id/user-id.js';

const header = document.getElementById('header');
const footer = document.getElementById('footer');
const productContainer = document.querySelector('.products-container');
const totalPrice = document.getElementById('total-price');

const form = document.querySelector('form');
const typePayment = document.getElementById('type-payment');
const numberCard = document.getElementById('number-card');
const expiration = document.getElementById('expiration');
const nameCard = document.getElementById('name');
const errType = document.getElementById('err-type');
const errNum = document.getElementById('err-num');
const errExpiration = document.getElementById('err-expiration');
const errName = document.getElementById('err-name');

header.innerHTML = createHeader();
footer.innerHTML = createFooter();

const token = localStorage.getItem("token");
const idUser = parseJwt(token).sub;

let products = [];
let total = 0;


async function getCart() {
   try {
      const response = await fetch(`http://localhost:4000/api/obtenerProductosCarrito/${idUser}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", 
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      // console.log("Productos del carrito:", data);
      products = [];
      total = 0;
      data.payload.forEach((p) => {
          total += p.precio;
          products += `<div class="product-card">
          ${createProductCard(
              "../../assets/img/descarga.jpeg",
              p.producto,
              p.precio,
              p.idInventario
          )}
          </div>`;
          productContainer.innerHTML = products;
          totalPrice.innerHTML = `Total: $${total.toFixed(2)}`;
    });
    } catch (error) {
      console.error("Error al cargar el carrito:", error);
  }
}

function validPay() {
  let haveErrors = [true, true, true, true];

  const yearNow = new Date().getFullYear();
  let monthNow = new Date().getMonth() + 1;
  const dayNow = new Date().getDate();

  if (monthNow < 10) {
    monthNow = `0${new Date().getMonth() + 1}`;  
  }

  const dateNow = `${yearNow}-${monthNow}-${dayNow}`;

  if (typePayment.value === '') {
    errType.innerHTML = 'El campo no puede estar vacío.';
    haveErrors[0] = true;
  } else {
    errType.innerHTML = '';
    haveErrors[0] = false;
  }

  if (typePayment.value == 'transferecia') {
    window.location.href = 'https://www.mercadopago.com';
  }

  if (numberCard.value === '') {
    errNum.innerHTML = 'El campo no puede estar vacío.';
    haveErrors[1] = true;
  } else if(numberCard.value.length != 16) {
    errNum.innerHTML = 'El número debe tener 16 caracteres'
    haveErrors[1] = true;
  } else {
    errNum.innerHTML = '';
    haveErrors[1] = false;
  }

  if (expiration.value === '') {
    errExpiration.innerHTML = 'El campo no puede estar vacío.';
    haveErrors[2] = true;
  } else if (expiration.value <= dateNow) {
    errExpiration.innerHTML = 'Tarjeta expirada.';
    haveErrors[2] = true;
  } else {
    errExpiration.innerHTML = '';
    haveErrors[2] = false;
  }

  if (nameCard.value === '') {
    errName.innerHTML = 'El campo no puede estar vacío.';
    haveErrors[3] = true;
  } else {
    errName.innerHTML = '';
    haveErrors[3] = false;
  }

  setTimeout(() => {
  if (!haveErrors.includes(true)) {
    alert('Productos comprados.');
  }
}, 500);
}

typePayment.addEventListener('change', function(event) {
  event.preventDefault();
  if (typePayment.value == 'debito' || typePayment.value == 'credito') {
    numberCard.hidden = '';
    expiration.hidden = '';
    nameCard.hidden = '';
  }
})

form.addEventListener('submit', function(event) {
  event.preventDefault();
  validPay();
})

getCart();