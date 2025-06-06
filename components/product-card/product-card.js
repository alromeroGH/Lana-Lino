export function createProductCard(imgUrl, name, price) {
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