import { parseJwt } from '../../components/user-id/user-id.js';

const token = localStorage.getItem("token");
const idUser = parseJwt(token).sub;

let rol = await getUser();

export function createNav() {
    return`
        <nav class="nav">
            <ul>
              <li class="item-lista"><a href="../home/home.html">Productos</a></li>
              <li class="item-lista"><a href="../favorites/favorites.html">Favoritos</a></li>
              <li class="item-lista"><a href="../cart/cart.html">Carrito</a></li>
              <li class="item-lista"><a href="../profile/profile.html">Perfil</a></li>
              ${(rol === 'admin') ? '<li class="item-lista"><a href="../admin/add-product/add-product.html">Administrador</a></li>' : ''}
              <li class="item-lista"><a href="../login/login.html">Cerrar Sesión</a></li>
            </ul>
        </nav>
    `;
}

export function createAdminNav() {
    return`
        <nav class="nav">
            <ul>
              <li class="item-lista"><a href="../../home/home.html">Productos</a></li>
              <li class="item-lista"><a href="../../favorites/favorites.html">Favoritos</a></li>
              <li class="item-lista"><a href="../../cart/cart.html">Carrito</a></li>
              <li class="item-lista"><a href="../../profile/profile.html">Perfil</a></li>
              ${(rol === 'admin') ? '<li class="item-lista"><a href="../../admin/add-product/add-product.html">Administrador</a></li>' : ''}
              <li class="item-lista"><a href="../../login/login.html">Cerrar Sesión</a></li>
            </ul>
        </nav>
    `;
}

async function getUser() {
    try {
    const response = await fetch(`http://localhost:4000/api/obtenerDatosUsuario/${idUser}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", 
         'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data.payload[0].rol;

  } catch (error) {
    console.error("Error al obtener productos:", error);
  }
}