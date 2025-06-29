export function createProductCard(imgUrl, name, price) {
    return `
        <div class="card">
            <div>
                <a href="../product/product.html"><img src="${imgUrl}" alt=""></a>
            </div>
            <div class="card-content">
                <a href="../product/product.html"><p>${name}</p></a>
                <hr/>
                <p>$${price}</p>
            </div>
        </div>
    `;
}

export function createProductCardCart(imgUrl, name, price, idProduct) {
    return `
        <div class="card">
            <div>
                <a href="../product/product.html?id=${idProduct}"><img src="${imgUrl}" alt=""></a>
            </div>
            <div class="card-content">
                <p>${name}</p>
                <hr>
                <p>$${price}</p>
                <hr>
                <button onclick="deleteProductCard(${idProduct})"><img src="../../assets/icons/compartimiento.png" alt=""></button>
            </div>
        </div>
    `;
}

export function createProductCardFavorite(imgUrl, name, price, idProduct) {
    return `
        <div class="card">
            <div>
                <a href="../product/product.html?id=${idProduct}"><img src="${imgUrl}" alt=""></a>
            </div>
            <div class="card-content">
                <p>${name}</p>
                <hr>
                <p>$${price}</p>
                <hr>
                <button onclick="addFavorite(${idProduct})"><img src="../../assets/icons/favorito.png" alt=""></button>
            </div>
        </div>
    `;
}