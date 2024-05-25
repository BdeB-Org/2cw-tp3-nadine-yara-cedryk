document.addEventListener('DOMContentLoaded', function() {
    const auteursList = document.getElementById('auteurs-list');
    const searchButton = document.getElementById('search-button');
    const searchNom = document.getElementById('search-nom');
    const searchDateNaissance = document.getElementById('search-date-naissance');

    function fetchAuteurs() {
        let url = 'http://127.0.0.1:8080/ords/bibliotheque/auteur/';
        const nom = searchNom.value;
        const dateNaissance = searchDateNaissance.value;

        if (nom) {
            url += `?nom=${encodeURIComponent(nom)}`;
        }
        if (dateNaissance) {
            url += nom ? `&date_naissance=${encodeURIComponent(dateNaissance)}` : `?date_naissance=${encodeURIComponent(dateNaissance)}`;
        }

        console.log('Fetching data from:', url); 

        fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })