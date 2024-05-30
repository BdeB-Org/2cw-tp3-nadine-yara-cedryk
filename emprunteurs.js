document.addEventListener('DOMContentLoaded', function() {
    const emprunteursList = document.getElementById('emprunteurs-list');
    function fetchEmprunteurs() {
        fetch('http://127.0.0.1:8080/ords/bibliotheque/emprunteurs/')
            .then(response => response.json())
            .then(data => {