function setupFilters() {
    const storeSelect = document.getElementById('storeFilter');
    
    const stores = [...new Set(wishlistData.map(p => p.Magasin).filter(Boolean))].sort();
    
    storeSelect.innerHTML = '<option value="">Tous les magasins</option>';
    stores.forEach(s => {
        const op = document.createElement('option');
        op.value = s;
        op.innerText = s;
        storeSelect.appendChild(op);
    });

    document.querySelectorAll('.filters-bar input, .filters-bar select').forEach(el => {
        el.addEventListener('input', applyFilters);
    });
}

function applyFilters() {
    const sName = document.getElementById('search').value.toLowerCase();
    const sPriceMax = parseFloat(document.getElementById('priceMax').value) || Infinity;
    const sStore = document.getElementById('storeFilter').value;
    const sSort = document.getElementById('sortPrice').value;

    let result = wishlistData.filter(p => {
        const nameMatch = (p['Nom Produit'] || '').toLowerCase().includes(sName);
        const storeMatch = sStore === "" || p.Magasin === sStore;
        const priceMatch = parseFloat(p.Prix) <= sPriceMax;
        return nameMatch && storeMatch && priceMatch;
    });

    result.sort((a, b) => {
        if (sSort === "asc") return parseFloat(a.Prix) - parseFloat(b.Prix);
        if (sSort === "desc") return parseFloat(b.Prix) - parseFloat(a.Prix);
        
        const posA = parseInt(a.Position?.replace('#', '')) || 0;
        const posB = parseInt(b.Position?.replace('#', '')) || 0;
        return posA - posB;
    });

    updateCounter(result.length);
    render(result);
}
