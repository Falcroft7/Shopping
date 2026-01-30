function init() {
    Papa.parse(CSV_URL, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
            wishlistData = results.data;
            setupFilters();
            updateCounter(wishlistData.length);
            render(wishlistData);
        },
        error: (err) => {
            console.error("Erreur lors du chargement du CSV :", err);
            document.getElementById('results-counter').textContent = "Erreur de chargement des données.";
        }
    });
}

document.addEventListener('DOMContentLoaded', init);
