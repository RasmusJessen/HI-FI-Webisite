
document.addEventListener("DOMContentLoaded", event => {
    if (localStorage.getItem('token') === null) {
        window.location.assign('Login.html');
    }
 })

function send(send){
    var navn = document.getElementById("inputnavn").value
    var email = document.getElementById("inputemail").value
    var besked = document.getElementById("inputbesked").value
    'use strict';
    if (navn === ""){
        alert("Indtast dit navn");
    }
    else{
        if (email === ""){
            alert("Indtast din e-mail");
            }
        
        else{ 
            // Her hiver den fra functionen i bunden(checkEmail)
            if(checkEmail(email)){ 
                if(besked === ""){
                alert("Indtast Besked");
                }
            else{
                    alert("Vi har nu modtaget dine oplysninger");
                    window.location.replace("Kontakt.html");
                } 
               } 
            else{ 
                alert("E-mail er IKKE udfyldt Korrekt! (Husk: @ + TLD)");
               } 
        }
    }
}
//E-mail validering
function checkEmail(email){ 
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
    if (filter.test(email)){ 
        return true;
    }  
}

document.getElementById("klik").addEventListener("click", search)

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