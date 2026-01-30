function render(data) {
    const grid = document.getElementById('wishlist-grid');
    if (data.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #64748b;">Aucun produit trouvé.</p>';
        return;
    }

    grid.innerHTML = data.map(item => `
        <div class="wish-item glass">
            <div class="item-main-row">
                <div class="item-pos">${item.Position}</div>
                <div class="item-img-container">
                    <img src="${item.Image}" alt="${item['Nom Produit']}" onerror="this.src='https://via.placeholder.com/100?text=Image'">
                </div>
                <div class="item-info">
                    <h3 class="product-name">${item['Nom Produit']}</h3>
                    <span class="store-name">📍 ${item.Magasin}</span>
                </div>
                <div class="item-price">
                    <span class="price-tag">${item.Prix}€</span>
                </div>
            </div>
            ${item.Commentaire ? `
                <div class="item-footer">
                    <p class="comment">${item.Commentaire}</p>
                </div>
            ` : ''}
        </div>
    `).join('');
}
