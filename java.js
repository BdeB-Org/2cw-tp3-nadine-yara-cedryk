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
    function fetchAuteurDetails(id) {
        fetch(`http://127.0.0.1:8080/ords/bibliotheque/auteur/${id}`)
            .then(response => response.json())
            .then(auteur => {
                auteurDetails.innerHTML = `
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${auteur.nom}</h5>
                                <p class="card-text">${auteur.biographie}</p>
                                <p class="card-text"><small class="text-muted">Date de naissance: ${new Date(auteur.date_naissance).toLocaleDateString()}</small></p>
                                <p class="card-text"><small class="text-muted">Date de décès: ${auteur.date_deces ? new Date(auteur.date_deces).toLocaleDateString() : 'N/A'}</small></p>
                            </div>
                        </div>
                    </div>
                `;
            })
            .catch(error => console.error('Erreur:', error));
    }
    