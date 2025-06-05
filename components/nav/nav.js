export function createNav(isAdmin = false) {
    return`
        <nav class="nav">
            <ul>
              <li class="item-lista"><a href="../home/home.html">Productos</a></li>
              <li class="item-lista"><a href="../favorites/favorites.html">Favoritos</a></li>
              <li class="item-lista"><a href="../cart/cart.html">Carrito</a></li>
              <li class="item-lista"><a href="../profile/profile.html">Perfil</a></li>
              ${isAdmin ? '<li class="item-lista"><a href="../admin/manage-products/manage-products.html">Administrador</a></li>' : ''}
              <li class="item-lista"><a href="../login/login.html">Cerrar Sesión</a></li>
            </ul>
        </nav>
    `;
}