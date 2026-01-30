// Remplace par l'URL de ton CSV GitHub une fois en ligne
const CSV_URL = 'achats.csv'; 

let products = [];

// 1. Chargement des données
async function loadData() {
    Papa.parse(CSV_URL, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: (results) => {
            products = results.data.filter(p => p.nom_produit);
            setupFilters();
            render(products);
        }
    });
}

// 2. Création dynamique du filtre magasin
function setupFilters() {
    const stores = [...new Set(products.map(p => p.magasin))];
    const select = document.getElementById('storeFilter');
    stores.forEach(s => {
        const op = document.createElement('option');
        op.value = s;
        op.innerText = s;
        select.appendChild(op);
    });

    // Listeners
    document.querySelectorAll('input, select').forEach(el => {
        el.addEventListener('input', applyFilters);
    });
}

// 3. Application des filtres
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

// 4. Rendu des cartes
function render(data) {
    const grid = document.getElementById('wishlist-grid');
    grid.innerHTML = data.map(p => `
        <div class="wish-card">
            <img src="${p.url_image || 'https://via.placeholder.com/300'}" alt="${p.nom_produit}">
            <div style="padding: 0 10px">
                <small style="color: #64748b; font-weight: 600">${p.magasin}</small>
                <h3 style="margin: 5px 0 15px 0; font-size: 1.1rem">${p.nom_produit}</h3>
                <div style="display: flex; justify-content: space-between; align-items: center">
                    <span class="price-tag">${p.prix}€</span>
                    <a href="${p.url_produit || '#'}" target="_blank" style="text-decoration: none; color: #3b82f6; font-weight: 600">Détails →</a>
                </div>
            </div>
        </div>
    `).join('');
}

loadData();
