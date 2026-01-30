function init() {
    Papa.parse(CSV_URL, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
            wishlistData = results.data;
            
            setupFilters();
            render(wishlistData);
        }
    });
}

init();
