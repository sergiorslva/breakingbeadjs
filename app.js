document.addEventListener("DOMContentLoaded", function(event) { 

    const myNamedLister = (data) => buildTable(data);
    var table;
    var elementFounded;

    fetch('https://periodic-table-api.herokuapp.com/')
    .then(response => response.json())
    .then(res => {
        table = res
    });

    document.getElementById('name').addEventListener('input', function() {
        getNameStyled()
    });

    document.getElementById('show-more').addEventListener('click', function() {
        buildTable(elementFounded)
    });

    function getNameStyled() {        

        elementFounded = false;
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
                    elementFounded = table.find(x => x.symbol.toLowerCase() === partName.toLowerCase())
                } else {
                    createSimpleText(inputName.charAt(i))                    
                }     


            } else {                
                var partName = inputName.charAt(i)
                var containName = symbolsOneLetters.filter(x => x === partName);                
                if(containName && containName.length > 0 && !tableElementFound) {                     
                     createElementWithStyle(inputName.charAt(i));
                     tableElementFound = true;
                     elementFounded = table.find(x => x.symbol.toLowerCase() === partName.toLowerCase())
                } else {
                    createSimpleText(inputName.charAt(i));                    
                }                                
            }                                      
        }

        console.log()
        if(elementFounded) {                
            var element = document.getElementById('show-more');
            element.style.visibility = 'visible';      
            document.getElementById('table-element').style.visibility = 'visible';
        } else {                            
            var element = document.getElementById('show-more');
            element.style.visibility = 'hidden';                            
            document.getElementById('table-element').style.visibility = 'hidden';
            var table = document.createElement('table');
            table.innerHTML = ''
        }                 
    }

    function buildTable(data) {                  
        var tableElement = document.getElementById('table-element');     
        tableElement.innerHTML = '';

        var table = document.createElement('table');

        table.style.color = '#ffffff';
        table.style.width = '100%';        
        table.style.height = '100%';

        Object.keys(data).forEach(key => {            
            var tr = document.createElement('tr');
            tr.style.textAlign = 'left';
            
            var td = document.createElement('td').innerHTML = key;
            td.innerHTML = 'Symbol';            
            tr.append(td)

            td =  document.createElement('td');
            td.innerHTML = data[key];
            tr.append(td)
            table.append(tr)
        });           
        
        tableElement.append(table);
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
