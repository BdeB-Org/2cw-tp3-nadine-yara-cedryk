document.addEventListener('DOMContentLoaded', function() {
    const auteursSelect = document.getElementById('auteurs-select');
    const auteurDetails = document.getElementById('auteur-details');

    function fetchAuteurs() {
        fetch('http://127.0.0.1:8080/ords/bibliotheque/auteur/')
            .then(response => response.json())
            .then(data => {
                data.items.forEach(auteur => {
                    const option = document.createElement('option');
                    option.value = auteur.id_auteur;
                    option.textContent = auteur.nom;
                    auteursSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Erreur:', error));
    }