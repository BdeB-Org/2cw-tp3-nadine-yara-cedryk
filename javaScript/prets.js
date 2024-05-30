document.addEventListener('DOMContentLoaded', function() {
    const pretsList = document.getElementById('prets-list');
    function fetchPrets() {
        fetch('http://127.0.0.1:8080/ords/bibliotheque/prêts/')
            .then(response => response.json())
            .then(data => {
                pretsList.innerHTML = '';
                data.items.forEach(prêt => {
                    const col = document.createElement('div');
                    col.className = 'col-md-4';
                    col.innerHTML = `
                    <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Prêt ID: ${prêt.id_pret}</h5>
                        <p class="card-text">Date de prêt: ${new Date(prêt.date_pret).toLocaleDateString()}</p>
                        <p class="card-text">Date de retour: ${new Date(prêt.date_retour).toLocaleDateString()}</p>
                        <p class="card-text">Emprunteur ID: ${prêt.emprunteurs_id_emprunteur}</p>
                        <p class="card-text">Livre ID: ${prêt.id_livre}</p>
                    </div>
                </div>
                `;
                pretsList.appendChild(col);
            });
        })
        .catch(error => console.error('Erreur:', error));
}

fetchPrets();
});