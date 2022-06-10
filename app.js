document.addEventListener("DOMContentLoaded", function(event) { 
    
    var dataTable;
    var elementFounded;

    fetch('https://periodic-table-api.herokuapp.com/')
    .then(response => response.json())
    .then(res => {
        dataTable = res;        
    });

    document.getElementById('name').addEventListener('input', function() {
        getNameStyled()
    });

    document.getElementById('show-more').addEventListener('click', function() {        
        buildTable(elementFounded)
    });

    function getNameStyled() {                
        elementFounded = null;
        tableElementFound = false;        
        
        let symbolsOneLetters = dataTable.map(x => x.symbol.toLowerCase()).filter(x => x.length === 1);;
        let symbolsTwoLetters = dataTable.map(x => x.symbol.toLocaleLowerCase()).filter(x => x.length > 1);
        
        let inputName = document.getElementById('name').value.toLowerCase();        

        document.getElementById("name-container").innerHTML = '';
        document.getElementById('table-element').innerHTML = '';

        for (let i = 0; i < inputName.length; i++) {
            if(i < inputName.length -1) {
                let partName = inputName.charAt(i) + inputName.charAt(i + 1)
                let containName = symbolsTwoLetters.filter(x => x === partName); 
                
                if(containName && containName.length > 0 && !tableElementFound) {
                    createElementWithStyle(inputName.charAt(i) + inputName.charAt(i + 1))                    
                    i++
                    tableElementFound = true;
                    elementFounded = dataTable.find(x => x.symbol.toLowerCase() === partName.toLowerCase())
                } else {
                    createSimpleText(inputName.charAt(i))                    
                }     


            } else {                
                let partName = inputName.charAt(i)
                let containName = symbolsOneLetters.filter(x => x === partName);                
                if(containName && containName.length > 0 && !tableElementFound) {                     
                     createElementWithStyle(inputName.charAt(i));
                     tableElementFound = true;
                     elementFounded = dataTable.find(x => x.symbol.toLowerCase() === partName.toLowerCase())
                } else {
                    createSimpleText(inputName.charAt(i));                    
                }                                
            }                                      
        }
        
        if(elementFounded) {                
            let element = document.getElementById('show-more');
            element.style.visibility = 'visible';      
            document.getElementById('table-element').style.visibility = 'visible';
        } else {                            
            let element = document.getElementById('show-more');
            element.style.visibility = 'hidden';                            
            document.getElementById('table-element').style.visibility = 'hidden';
            let table = document.createElement('table');
            table.innerHTML = ''
        }                 
    }

    function buildTable(data) {                  
        let tableElement = document.getElementById('table-element');     
        tableElement.innerHTML = '';

        let tableHtml = document.createElement('table');

        tableHtml.style.color = '#ffffff';
        tableHtml.style.width = '100%';        
        tableHtml.style.height = '100%';

        Object.keys(data).forEach(key => {            
            let tr = document.createElement('tr');
            tr.style.textAlign = 'left';
            
            let td = document.createElement('td').innerHTML = key;
            td.innerHTML = 'Symbol';            
            tr.append(td)

            td =  document.createElement('td');
            td.innerHTML = data[key];
            tr.append(td)
            tableHtml.append(tr)
        });           
        
        tableElement.append(tableHtml);
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
