function setupFilters() {
    const stores = [...new Set(wishlistData.map(p => p.Magasin).filter(Boolean))];
    const selectStore = document.getElementById('storeFilter');
    
    selectStore.innerHTML = '<option value="">Tous les magasins</option>';
    stores.forEach(s => {
        const op = document.createElement('option');
        op.value = s;
        op.innerText = s;
        selectStore.appendChild(op);
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
        const nameMatch = p['Nom Produit'] && p['Nom Produit'].toLowerCase().includes(sName);
        const storeMatch = sStore === "" || p.Magasin === sStore;
        const priceMatch = parseFloat(p.Prix) <= sPriceMax;
        return nameMatch && storeMatch && priceMatch;
    });

    if (sSort === "asc") {
        result.sort((a, b) => parseFloat(a.Prix) - parseFloat(b.Prix));
    } else if (sSort === "desc") {
        result.sort((a, b) => parseFloat(b.Prix) - parseFloat(a.Prix));
    } else {
        result.sort((a, b) => {
            const posA = parseInt(a.Position.replace('#', '')) || 0;
            const posB = parseInt(b.Position.replace('#', '')) || 0;
            return posA - posB;
        });
    }
    
    render(result);
}
