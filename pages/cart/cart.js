import { createHeader } from '../../components/header/header.js';
import { createNav } from '../../components/nav/nav.js';
import { createFooter } from '../../components/footer/footer.js';
import { createProductCardCart } from '../../components/product-card/product-card.js';
import { parseJwt } from '../../components/user-id/user-id.js';

const header = document.getElementById('header');
const nav = document.getElementById('nav');
const footer = document.getElementById('footer');
const payment = document.getElementById('payment');
const productContainer = document.querySelector('.products-container');
const totalPrice = document.getElementById('total-price');

header.innerHTML = createHeader();
nav.innerHTML = createNav();
footer.innerHTML = createFooter();

const params = new URLSearchParams(window.location.search);
const idInventory = params.get("id");

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
          ${createProductCardCart(
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

async function addCart() {
  try {
      const response = await fetch("http://localhost:4000/api/agregarACarrito/", {
        method: "POST",
        headers: { "Content-Type": "application/json", 
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id_inventario: idInventory,
          id_usuario: idUser
        })
      });
      const data = await response.json();
      
      // elimina el url después de agregar al carrito
      window.history.replaceState({}, document.title, window.location.pathname);
      // console.log("Producto agregado al carrito:", data);
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
}

async function deleteProductCard(idInventoryDelete) {
  if (confirm('Desea eliminar?')) {
    try {
      const response = await fetch("http://localhost:4000/api/eliminarProductoCarrito", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", 
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id_usuario: idUser,
          id_inventario: idInventoryDelete
        })
      });
      console.log(idUser)
      console.log(idInventory)
      const data = await response.json();
      console.log("Producto eliminado del carrito:", data);
      location.reload();
      } catch (error) {
        console.error("Error al eliminar del carrito:", error);
    }
  }
}

// función autoejecutada
(async function main() {
  if (idInventory !== null) {
    await addCart();
  }
  await getCart();
})();


payment.addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = '../payment/payment.html';
})

// Hacerla accesible la función deleteProductCard() desde el HTML generado
window.deleteProductCard = deleteProductCard;