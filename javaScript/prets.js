document.addEventListener('DOMContentLoaded', function() {
    const pretsList = document.getElementById('prets-list');
    function fetchPrets() {
        fetch('http://127.0.0.1:8080/ords/bibliotheque/prêts/')
            .then(response => response.json())
            .then(data => {