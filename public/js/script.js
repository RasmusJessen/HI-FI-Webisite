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

function search() {
     document.getElementById
}