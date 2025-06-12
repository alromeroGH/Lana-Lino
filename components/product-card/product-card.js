export function createProductCard(imgUrl, name, price, id) {
    return `
        <div class="card">
            <div>
                <a href="../product/product.html"><img src="${imgUrl}" alt=""></a>
            </div>
            <div class="card-content">
                <p>${name}</p>
                <hr/>
                <p>$${price}</p>
            </div>
        </div>
    `;
}

export function createProductCardCart(imgUrl, name, price, id) {
    return `
        <div class="card">
            <div>
                <a href="../product/product.html"><img src="${imgUrl}" alt=""></a>
            </div>
            <div class="card-content">
                <p>${name}</p>
                <hr>
                <p>$${price}</p>
                <hr>
                <button id="deleteProductCard(${id})"><img src="../../assets/icons/compartimiento.png" alt=""></button>
            </div>
        </div>
    `;
}