// https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
       results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
 }
 
 // slet funktionen, bindes til hver slet knap efter alle produkterne er hentet
 function sletItem(event) {
    if (confirm('Er du sikker?')) {
       let id = (isNaN(event.target.dataset['id']) ? 0 : event.target.dataset['id']);
 
       let headers = new Headers();
       headers.append('Content-Type', 'application/json');
 
       let init = {
          method: 'delete',
          headers: headers,
          cache: 'no-cache'
       };
       let request = new Request(`http://localhost:1337/produkt`, init);
 
       fetch(request)
          .then(response => {
             if (response.status == 204) {
                window.location.replace(`Bestil.html`);
             } else {
                throw new Error('Produkt blev ikke slettet');
             }
          }).catch(err => {
             console.log(err);
          });
    }
 }
 
 document.addEventListener("DOMContentLoaded", event => {
 
    // forudfyld formular hvis der skal redigeres
    if (getParameterByName('action') == "edit") {
       let productId = (getParameterByName('id') != null ? getParameterByName('id') : 0);
 
       fetch(`http://localhost:1337/produkt`)
          .then((response) => {
             if (response.ok) {
                return response.json();
             }
          })
          .then((json) => {
 
             // erstat punktum med komma
             let price = json[0].product_pris;
             price = price.replace('.', ',');
 
             document.querySelector('.text').innerHTML = `
             <div class="col-lg-6 col-xs-12">
             <form class="text">
                 Produkt navn:<br>
                 <input type="text" name="opret" class="opret">
                 <br><br>
                 Produkt pris:<br>
                 <input type="text" name="pris" class="pris">
                 <br><br>
                 Produkt varenr:<br>
                 <input type="text" name="varenr" class="varenr">
                 <br><br>
                 Produkt beskrivelse:<br>
                 <textarea class="beskriv" type="text" name="beskriv"></textarea>
                 <br><br>
                 <button>Gem</button>
                 <a href="Bestil.html" class="button">Annuller</a> <span id="productsFormError" class="error"></span>
                 <hr>
               </form> 
             </div>`

             let productFormButton = document.querySelector(".text button");

             productFormButton.addEventListener('click', function (event) {
                let name = document.querySelector('.opret').value;
                let price = document.querySelector('.pris').value;
                let varenr = document.querySelector('.varenr').value;
                let description = document.querySelector('.beskriv').value;
 
                // erstat komma med punkt, så isNaN funktionen fungerer hensigtsmæssigt
                price = price.replace(',', '.');
 
                if (id != 0 && name != '' && description != '' && !isNaN(price) && id > 0) {
                   document.querySelector('#productsFormError').innerHTML = "";
                   let url = `http://localhost:1337/produkt`;
                   let headers = new Headers();
                   headers.append('Content-Type', 'application/json');
 
                   let init = {
                      method: 'put',
                      headers: headers,
                      body: JSON.stringify({
                         id: id,
                         name: name,
                         description: description,
                         price: price
                      }),
                      cache: 'no-cache',
                      cors: 'cors'
                   };
                   let request = new Request(url, init);
 
                   fetch(request)
                      .then(response => {
 
                         if (response.status == 200) {
                            window.location.replace(`Bestil.html`);
                         } else {
                            throw new Error('Produkt blev ikke opdateret')
                         }
                      }).catch(err => {
                         console.log(err);
                      });
 
                } else {
                   document.querySelector('#productsFormError').innerHTML = "Udfyld venligst alle felter korrekt";
                }
             });
          })
          .catch((err) => {
             console.log(err);
          });
 
    } else {
       // vis tom formular til oprettelse af et produkt
       document.querySelector('.text').innerHTML = `
       <div class="col-lg-6 col-xs-12">
       <form class="text">
           Produkt navn:<br>
           <input type="text" name="opret" class="opret">
           <br><br>
           Produkt pris:<br>
           <input type="text" name="pris" class="pris">
           <br><br>
           Produkt varenr:<br>
           <input type="text" name="varenr" class="varenr">
           <br><br>
           Produkt beskrivelse:<br>
           <textarea class="beskriv" type="text" name="beskriv"></textarea>
           <br><br>
           <button>Gem</button>
           <a href="Bestil.html" class="button">Annuller</a> <span id="productsFormError" class="error"></span>
           <hr>
         </form> 
       </div>`
     
 
 
       // bind gem funktionen til knappen
       let productFormButton = document.querySelector(".text button");
       productFormButton.addEventListener('click', function (event) {
          let name = document.querySelector('.opret').value;
          let price = document.querySelector('.pris').value;
          let varenr = document.querySelector('.varenr').value;
          let description = document.querySelector('.beskriv').value;
 
          // erstat komma med punkt, så isNaN funktionen fungerer hensigtsmæssigt
          price = price.replace(',', '.');
 
          if (name != '' && description != '' && !isNaN(price)) {
             document.querySelector('#productsFormError').innerHTML = "";
             let url = `http://localhost:1337/produkt`;
             let headers = new Headers();
             headers.append('Content-Type', 'application/json');
 
             let init = {
                method: 'post',
                headers: headers,
                body: JSON.stringify({
                   name: name,
                   description: description,
                   price: price,
                   varenr: varenr,
                   categori: categori

                }),
                cache: 'no-cache'
             };
             let request = new Request(url, init);
 
             fetch(request)
                .then(response => {
                   // hvis gem handlingen gik fejlfrit igennem, reloades siden
                   if (response.status == 200) {
                      window.location.replace(`Bestil.html`);
                   } else {
                      throw new Error('Produkt blev ikke oprettet');
                   }
                })
                .catch(err => {
                   console.log(err);
                });
          } else {
             document.querySelector('#productsFormError').innerHTML = "Udfyld venligst alle felter korrekt";
          }
 
       });
    }
 
    // hent alle produkter og udskriv listen
    fetch('http://localhost:1337/produkt')
       .then((response) => {
          if (response.ok) {
             return response.json();
          }
       })
       .then((json) => {
          let list = `
          <tr>
          <td>
             <a href="?action=edit&id=${json[i].produkt_navn}" class="button edit">ret</a>
             <a href="#" class="button delete" data-id="${json[i].produkt_price}">slet</a>
          </td>
          <td>${json[i].produkt_navn}</td>
          <td>${json[i].produkt_pris}</td>
          <td>${json[i].produkt_varenr}</td>
          <td>${json[i].produkt_beskrivelse}</td> 
       </tr>`
 
          document.querySelector('.text').innerHTML = list;

 });
})