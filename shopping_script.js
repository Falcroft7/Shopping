const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5vls80UMNhXVm9NImEGovsuQa3OKc_jnsGqcinv_cTQ6JzolwF7K2Z459Os07qnyXC6hx48M8EW6k/pub?output=csv'; 

let wishlistData = [];

function init() {
    Papa.parse(CSV_URL, {
        download: true,
        header: true,
        complete: (results) => {
            wishlistData = results.data;
            setupFilters();
            render(wishlistData);
        }
    });
}

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

function render(data) {
    const grid = document.getElementById('wishlist-grid');
    if (data.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #64748b;">Aucun produit trouvé.</p>';
        return;
    }

    grid.innerHTML = data.map(item => `
        <div class="wish-card glass">
            <div class="position-badge">${item.Position}</div>
            <img src="${item.Image}" alt="${item['Nom Produit']}" onerror="this.src='https://via.placeholder.com/300?text=Image+Indisponible'">
            
            <div class="card-content">
                <div class="card-header">
                    <h3 class="product-name">${item['Nom Produit']}</h3>
                    <span class="price-tag">${item.Prix}€</span>
                </div>
                
                <p class="store-name">📍 ${item.Magasin}</p>
                
                ${item.Commentaire ? `<p class="comment">${item.Commentaire}</p>` : ''}
            </div>
        </div>
    `).join('');
}

init();
