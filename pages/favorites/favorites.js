import { createHeader } from '../../components/header/header.js';
import { createNav } from '../../components/nav/nav.js';
import { createFooter } from '../../components/footer/footer.js';
import { createProductCardCart } from '../../components/product-card/product-card.js';
import { getProduct } from '../../components/get-product/get-product.js';
import { parseJwt } from '../../components/user-id/user-id.js';

const header = document.getElementById('header');
const nav = document.getElementById('nav');
const footer = document.getElementById('footer');
const productsContainer = document.querySelector('.products-container'); 


header.innerHTML = createHeader();
nav.innerHTML = createNav();
footer.innerHTML = createFooter();

const token = localStorage.getItem("token");
const idUser = parseJwt(token).id;

export async function getFavorites() {
  try {
    const response = await fetch(`http://localhost:4000/api/obtenerFavoritos/${idUser}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", 
         'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    // console.log("Favoritos:", data);
    const products = await Promise.all(
        data.payload.map(async element => {
        let product = await getProduct(element.idProducto);
        return createProductCardCart('../../assets/img/descarga.jpeg', 
            product[0].producto, product[0].precio, product[0].id_producto);
    })
    );
    if (products.length === 0) {
      productsContainer.innerHTML = '<div>No hay productos</div>';
    } else {
      productsContainer.innerHTML = products.join(' ');
    }
  } catch (error) {
    console.error("Error al mostrar favoritos:", error);
  }
}

async function deleteProductCard(idProduct){
    if (confirm('Desea eliminar?')) {
        try {
            const response = await fetch("http://localhost:4000/api/eliminarFavorito", {
            method: "DELETE",
            headers: { "Content-Type": "application/json", 
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                "id_usuario": idUser,
                "id_producto": idProduct
            })
            });
            console.log(idUser, idProduct)
            const data = await response.json();
            console.log("Eliminado:", data);
            location.reload();
        } catch (error) {
            console.error("Error al mostrar favoritos:", error);
        }
    }
}

getFavorites();

 // Hacerla accesible la función deleteProductCard() desde el HTML generado
window.deleteProductCard = deleteProductCard;