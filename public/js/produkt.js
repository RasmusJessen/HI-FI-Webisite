document.getElementById("klik").addEventListener("click", search), () => {
    
     }
    
    //Søge funktion
    function search() {
        var tekst = document.getElementById("soeg").value
       //alert (tekst)
    
       var fetchurl = `http://localhost:1337/produkt/sog/${tekst}`;
    
    console.log(fetchurl);
    
        fetch(fetchurl)
        .then((response) => {
            // grib svarets indhold (body) og send det som et json objekt til næste .then()
            return response.json();
        })
        .then((data) => {
            // nu er json objektet lagt ind i data variablen, udskriv data
            console.log(data);
    
            document.getElementById('content').innerHTML = '<h1>Søg</h1>'
    
            data.forEach(function(element) {
                document.getElementById('content').innerHTML +=`<h2> ${element.navn} </h2>
                <img src="../Billeder/${element.img}">
                <h3> ${element.pris} kr.</h3>
                <p>varenr nr ${element.varenr}</p> 
                <p>${element.info}</p>
                `;
            }, this);
            // for (var i = 0; i < data.length; i++) {
                // document.getElementById('content').innerHTML += '<div class="container3">' + '<h3>' + data[i].navn + '</h3>' + '<img src="creek_classic_cd.jpg"' + data[i].fk_img  + '<h6>pris: ' + data[i].pris + '<br>' + 'varanr: ' + data[i].varenr + '</h6>' + '<p>' + data[i].info + '</p>' + '</div>';
        })
    
    
        //  document.getElementById("soeg").innerHTML = search(); 
    }