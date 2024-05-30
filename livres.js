document.addEventListener('DOMContentLoaded', function() {
    const livresList = document.getElementById('livres-list');

    function fetchLivres() {
        fetch('http://127.0.0.1:8080/ords/bibliotheque/livres/')
            .then(response => response.json())
            .then(data => {
                livresList.innerHTML = '';
                data.items.forEach(livre => {
                    const col = document.createElement('div');
                    col.className = 'col-md-4';
                    col.innerHTML = `
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${livre.titre}</h5>
                                <p class="card-text">Année de publication: ${livre.année_de_publication}</p>
                                <p class="card-text">Nombre de copies disponibles: ${livre.nombre_copies_disponibles}</p>
                                <p class="card-text">Auteur ID: ${livre.auteur_id_auteur}</p>
                                <p class="card-text">Genre ID: ${livre.genres_id_genre}</p>
                            </div>
                        </div>
                    `;
                    livresList.appendChild(col);
                });
            })
            .catch(error => console.error('Erreur:', error));
    }

    fetchLivres();
});
