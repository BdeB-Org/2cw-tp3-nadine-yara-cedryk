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
        .then(data => {
            console.log('Data received:', data); // Log the received data
            auteursList.innerHTML = '';
            data.items.forEach(auteur => {
                const col = document.createElement('div');
                col.className = 'col-md-4';
                col.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${auteur.nom}</h5>
                            <p class="card-text">${auteur.biographie}</p>
                            <p class="card-text"><small class="text-muted">Date de naissance: ${auteur.date_naissance}</small></p>
                            <p class="card-text"><small class="text-muted">Date de décès: ${auteur.date_deces ? auteur.date_deces : 'N/A'}</small></p>
                        </div>
                    </div>
                `;
                auteursList.appendChild(col);
            });
        })
        .catch(error => {
            console.error('Erreur:', error); 
            auteursList.innerHTML = `<p class="text-danger">Erreur lors de la récupération des données.</p>`;
        });
}

searchButton.addEventListener('click', fetchAuteurs);
fetchAuteurs();
});