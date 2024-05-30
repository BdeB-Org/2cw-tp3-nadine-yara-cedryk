document.addEventListener('DOMContentLoaded', function() {
    const genresList = document.getElementById('genres-list');
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-nom');
    function fetchGenres(query = '') {
        let url = 'http://127.0.0.1:8080/ords/bibliotheque/genres/';
        if (query) {
            url += `?q={"nom":{"$like":"%${query}%"}}`;
        }
        fetch(url)
        .then(response => response.json())
        .then(data => {
            genresList.innerHTML = '';
            data.items.forEach(genre => {