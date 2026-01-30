const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5vls80UMNhXVm9NImEGovsuQa3OKc_jnsGqcinv_cTQ6JzolwF7K2Z459Os07qnyXC6hx48M8EW6k/pub?output=csv'; 

let wishlistData = [];

async function init() {
    Papa.parse('achats.csv', {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
            wishlistData = results.data.sort((a, b) => {
                const posA = parseInt(a.Position.replace('#', ''));
                const posB = parseInt(b.Position.replace('#', ''));
                return posA - posB;
            });
            render(wishlistData);
        }
    });
}

function setupFilters() {
    const stores = [...new Set(products.map(p => p.magasin))];
    const select = document.getElementById('storeFilter');
    stores.forEach(s => {
        const op = document.createElement('option');
        op.value = s;
        op.innerText = s;
        select.appendChild(op);
    });

    document.querySelectorAll('input, select').forEach(el => {
        el.addEventListener('input', applyFilters);
    });
}

function applyFilters() {
    const sName = document.getElementById('search').value.toLowerCase();
    const sPrice = parseFloat(document.getElementById('priceMax').value) || Infinity;
    const sStore = document.getElementById('storeFilter').value;

    const filtered = products.filter(p => {
        return p.nom_produit.toLowerCase().includes(sName) &&
               p.prix <= sPrice &&
               (sStore === "" || p.magasin === sStore);
    });
    render(filtered);
}

function render(data) {
    const grid = document.getElementById('wishlist-grid');
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
