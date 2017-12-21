(() => {
    document.addEventListener('DOMContentLoaded', () => {
       
        const form = document.querySelector('.kon');
        document.querySelector ('#sendkontakt').addEventListener('click', () => {
            const data = JSON.stringify({
                'inputnavn': document.querySelector('#inputnavn').value,
                'inputemail': document.querySelector('#inputemail').value,
                'inputbesked': document.querySelector('#inputbesked').value
            });
            console.log(data);
        
            fetch('http://localhost:1337/kontakt', {
                'method': 'POST',
                'headers': {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Content-Length': data.length
                },
                'mode': 'cors',
                'cache': 'default',
                'body': data
            })
                .then((result) => result.json())
                .then((data) => {
                    document.getElementsByClassName('kon').innerHTML = "Du har sendt din besked...";
                    
                    window.location.replace('Kontakt.html');
                })
                .catch((err) => {
                    console.log(err);
                });
        
            return false;
            
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
                    if(    checkEmail(email)    ){ 
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
        
        });


//E-mail validering
function checkEmail(email){ 
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
    if (filter.test(email)){ 
        return true;
    }  
}
 
    });
})();