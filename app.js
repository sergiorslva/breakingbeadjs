document.addEventListener("DOMContentLoaded", function(event) { 
        
    var table;
    fetch('https://periodic-table-api.herokuapp.com/')
    .then(response => response.json())
    .then(res => {
        table = res
    });

    document.getElementById('name').addEventListener('blur', function() {
        getNameStyled()
    });


    function getNameStyled() {

        tableElementFound = false;
        
        var symbolsOneLetters = table.map(x => x.symbol.toLowerCase()).filter(x => x.length === 1);;
        var symbolsTwoLetters = table.map(x => x.symbol.toLocaleLowerCase()).filter(x => x.length > 1);
        
        var inputName = document.getElementById('name').value.toLowerCase();        

        document.getElementById("name-container").innerHTML = '';

        for (let i = 0; i < inputName.length; i++) {
            if(i < inputName.length -1) {
                var partName = inputName.charAt(i) + inputName.charAt(i + 1)
                var containName = symbolsTwoLetters.filter(x => x === partName); 
                
                if(containName && containName.length > 0 && !tableElementFound) {
                    createElementWithStyle(inputName.charAt(i) + inputName.charAt(i + 1))                    
                    i++
                    tableElementFound = true;
                } else {
                    createSimpleText(inputName.charAt(i))                    
                }     


            } else {                
                var partName = inputName.charAt(i)
                var containName = symbolsOneLetters.filter(x => x === partName);                
                if(containName && containName.length > 0 && !tableElementFound) {                     
                     createElementWithStyle(inputName.charAt(i));
                     tableElementFound = true;
                } else {
                    createSimpleText(inputName.charAt(i));                    
                }                                
            }            
        }
    }

    function createElementWithStyle (text) {        
        var span = document.createElement("span");
        span.classList.add('B', 'br')
        var textContent = document.createTextNode(text);
        span.appendChild(textContent);            
        document.getElementById("name-container").appendChild(span);        
    }

    function createSimpleText (text) {        
        var span = document.createElement("span");        
        span.className = 'simple-text'
        var textContent = document.createTextNode(text);
        span.appendChild(textContent);            
        document.getElementById("name-container").appendChild(span);        
    }
});
