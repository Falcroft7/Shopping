function updateCounter(count) {
    const counterEl = document.getElementById('results-counter');
    if (count === 0) {
        counterEl.textContent = "Aucun produit ne correspond à votre recherche.";
    } else if (count === 1) {
        counterEl.textContent = "1 produit trouvé.";
    } else {
        counterEl.textContent = `${count} produits trouvés.`;
    }
}

function render(data) {
    const grid = document.getElementById('wishlist-grid');
    if (data.length === 0) {
        grid.innerHTML = '';
        return;
    }

    grid.innerHTML = data.map(item => {
        const isSpecial = item.Magasin === "Boutique ADA";
        return `
        <div class="wish-item glass ${isSpecial ? 'special-store' : ''}">
            <div class="item-main-row">
                <div class="item-pos">${item.Position}</div>
                <div class="item-img-container">
                    ${item.Lien ? `<a href="${item.Lien}" target="_blank" rel="noopener noreferrer">` : ''}
                        <img src="${item.Image}" 
                             alt="${item['Nom Produit']}" 
                             onerror="this.src='https://via.placeholder.com/100?text=Image'">
                    ${item.Lien ? `</a>` : ''}
                </div>
                <div class="item-info">
                    <h3 class="product-name">${item['Nom Produit']}</h3>
                    <span class="store-name">📍 ${item.Magasin}</span>
                    ${isSpecial ? '<br><span class="shipping-warning">⚠️ Frais de livraison à prévoir</span>' : ''}
                </div>
                <div class="item-price">
                    <span class="price-tag">${item.Prix}€</span>
                </div>
            </div>
            ${item.Commentaire ? `<div class="item-footer"><p class="comment">${item.Commentaire}</p></div>` : ''}
        </div>
    `}).join('');

    const items = grid.children;
    Array.from(items).forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
}
