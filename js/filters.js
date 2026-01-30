function setupFilters() {
    const stores = [...new Set(wishlistData.map(p => p.Magasin).filter(Boolean))];
    const select = document.getElementById('storeFilter');
    
    select.innerHTML = '<option value="">Tous les magasins</option>';
    stores.forEach(s => {
        const op = document.createElement('option');
        op.value = s;
        op.innerText = s;
        select.appendChild(op);
    });

    document.getElementById('search').addEventListener('input', applyFilters);
    document.getElementById('priceMax').addEventListener('input', applyFilters);
    document.getElementById('storeFilter').addEventListener('change', applyFilters);
}

function applyFilters() {
    const sName = document.getElementById('search').value.toLowerCase();
    const sPrice = parseFloat(document.getElementById('priceMax').value) || Infinity;
    const sStore = document.getElementById('storeFilter').value;

    const filtered = wishlistData.filter(p => {
        const nameMatch = p['Nom Produit'] && p['Nom Produit'].toLowerCase().includes(sName);
        const storeMatch = sStore === "" || p.Magasin === sStore;
        const priceMatch = parseFloat(p.Prix) <= sPrice;
        return nameMatch && storeMatch && priceMatch;
    });
    
    render(filtered);
}
