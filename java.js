document.addEventListener('DOMContentLoaded', function() {
    const auteursList = document.getElementById('auteurs-list');
    const searchButton = document.getElementById('search-button');
    const searchNom = document.getElementById('search-nom');

    function fetchAuteurs(query = '') {
        let url = 'http://127.0.0.1:8080/ords/bibliotheque/auteur/';
        if (query) {
            url += `?q={"nom":{"$like":"%${query}%"}}`;
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                auteursList.innerHTML = '';
                data.items.forEach(auteur => {
                    const col = document.createElement('div');
                    col.className = 'col-md-4';
                    col.innerHTML = `
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${auteur.nom}</h5>
                                <p class="card-text">${auteur.biographie}</p>
                                <p class="card-text"><small class="text-muted">Date de naissance: ${new Date(auteur.date_naissance).toLocaleDateString()}</small></p>
                                <p class="card-text"><small class="text-muted">Date de décès: ${auteur.date_deces ? new Date(auteur.date_deces).toLocaleDateString() : 'N/A'}</small></p>
                            </div>
                        </div>
                    `;
                    auteursList.appendChild(col);
                });
            })
            .catch(error => console.error('Erreur:', error));
    }

    searchButton.addEventListener('click', function() {
        const nom = searchNom.value;
        fetchAuteurs(nom);
    });

    
    fetchAuteurs();
});