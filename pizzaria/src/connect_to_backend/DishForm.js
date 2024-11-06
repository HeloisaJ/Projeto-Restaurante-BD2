const runScript = require('../../backend/dbScript');

document.getElementById('dishForm').addEventListener('submit', function(event){
    event.defaultPrevented();

    let input = new Array();

    input.push(document.getElementById('dishName').value);
    input.push(document.getElementById('description').value);
    input.push(document.getElementById('price').value);
    input.push(true); // disponibilidade
    
    runScript("insert", "prato", input);
});