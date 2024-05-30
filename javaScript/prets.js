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
                        <h5 class="card-title">Prêt ID: ${prêt.id_prêt}</h5>
                        <p class="card-text">Date de prêt: ${prêt.date_prêt}</p>
                        <p class="card-text">Date de retour: ${prêt.date_retour}</p>
                        <p class="card-text">Emprunteur ID: ${prêt.emprunteurs_id_emprunteur}</p>
                        <p class="card-text">Livre ID: ${prêt.livres_id_livre}</p>
                    </div>
                </div>