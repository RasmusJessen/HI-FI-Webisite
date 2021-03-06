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
       let request = new Request(`http://localhost:1337/produkt/${id}`, init);
 
       fetch(request)
          .then(response => {
             if (response.status == 204) {
                window.location.replace(`Admin.html`);
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
       let id = (getParameterByName('id') != null ? getParameterByName('id') : 0);
 
       fetch(`http://localhost:1337/produkt/${id}`)
          .then((response) => {
             if (response.ok) {
                return response.json();
             }
          })
          .then((json) => {
            console.log("yo");
             // erstat punktum med komma
             let price = json[0].pris + "";
             price = price.replace('.', ',');
 
             document.querySelector('#productsForm').innerHTML = `      
                <h2>Rediger produkt</h2>
                <label>Produkt navn</label>
                <input type="text" name="productName" id="productName" value="${json[0].navn}">
                <br>
                <label>Produkt beskrivelse</label>
                <input type="text" name="productDescription" id="productDescription" value="${json[0].info}">
                <br>
                <label>Produkt pris</label>
                <input type="text" name="productPrice" id="productPrice" value="${price}">
                <br>
                <label>Produkt varenr</label>
                <input type="text" name="productVarenr" id="productVarenr" value="${json[0].varenr}">
                <br>
    
                <button>Gem</button>
                <a href="Admin.html" class="button">Annuller</a> <span id="productsFormError" class="error"></span>
                <hr>`;
 
             let productFormButton = document.querySelector("#productsForm button");
 
             productFormButton.addEventListener('click', function (event) {
                let name = document.querySelector('#productName').value;
                let description = document.querySelector('#productDescription').value;
                let price = document.querySelector('#productPrice').value;
                let varenr = document.querySelector('#productVarenr').value;
                let id = (getParameterByName('id') != null ? getParameterByName('id') : 0);
 
                // erstat komma med punkt, så isNaN funktionen fungerer hensigtsmæssigt
                price = price.replace(',', '.');
 
                if (id != 0 && name != '' && description != '' && !isNaN(price) && id > 0) {
                   document.querySelector('#productsFormError').innerHTML = "";
                   let url = `http://localhost:1337/produkt/${id}`;
                   let headers = new Headers();
                   headers.append('Content-Type', 'application/json');
 
                   let init = {
                      method: 'put',
                      headers: headers,
                      body: JSON.stringify({
                         id: id,
                         name: name,
                         description: description,
                         price: price,
                         varenr: varenr
                      }),
                      cache: 'no-cache',
                      cors: 'cors'
                   };
                   let request = new Request(url, init);
 
                   fetch(request)
                      .then(response => {
 
                         if (response.status == 200) {
                            window.location.replace(`Admin.html`);
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
       document.querySelector('#productsForm').innerHTML = `
          <label>Produkt navn:</label>
          <input type="text" name="productName" id="productName" value="">
          <br>
          <label>Produkt beskrivelse:</label>
          <input type="text" name="productDescription" id="productDescription" value="">
          <br>
          <label>Produkt pris:</label>
          <input type="text" name="productPrice" id="productPrice" value="">
          <br>
          <label>Produkt varenr:</label>
          <input type="text" name="productVarenr" id="productVarenr" value="">
          <br>
          
          <button>Gem</button>
          <a href="Admin.html" class="button">Annuller</a> <span id="productsFormError" class="error"></span>
          <hr>`;
 
 
       // bind gem funktionen til knappen
       let productFormButton = document.querySelector("#productsForm button");
       productFormButton.addEventListener('click', function (event) {
          let name = document.querySelector('#productName').value;
          let description = document.querySelector('#productDescription').value;
          let price = document.querySelector('#productPrice').value;
          let varenr = document.querySelector('#productVarenr').value;
 
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
                   varenr: varenr
                }),
                cache: 'no-cache'
             };
             let request = new Request(url, init);
 
             fetch(request)
                .then(response => {
                   // hvis gem handlingen gik fejlfrit igennem, reloades siden
                   if (response.status == 200) {
                      window.location.replace(`Admin.html`);
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
             <table>
                <tr>
                   <th></th>
                   <th style="text-align:center">navn</th>
                   <th>pris</th>
                   <th style="text-align:center">info</th>
                   <th style="text-align:center">varenr</th>
                </tr>`;
 
          for (let i = 0; i < json.length; i++) {
                //console.log(json);
             let price = json[i].pris + "";
             price = price.replace('.', ',');
             list += `
                <tr>
                   <td>
                      <a href="?action=edit&id=${json[i].id}" class="button edit">ret</a>
                      <a href="#" class="button delete" data-id="${json[i].id}">slet</a>
                   </td>
                   <td style="text-align:center">${json[i].navn}</td>
                   <td>${json[i].pris}</td>    
                   <td style="text-align:center">${json[i].info}</td>
                   <td style="text-align:center">${json[i].varenr}</td>
                </tr>`;
          }
 
          list += `</table><hr>`;
 
          document.querySelector('#productList').innerHTML = list;
 
          // lokaliser alle slet knapper, og tilføj en slet funktion
          let deleteButtons = document.querySelectorAll('#productList a.delete');
          deleteButtons.forEach((button) => {
             button.addEventListener('click', sletItem);
          })
       })
       .catch((err) => {
          console.log(err);
       })
 });

//  fetch('http://localhost:1337/produkt')
//  .then((response) => {
//      // grib svarets indhold (body) og send det som et json objekt til næste .then()
//      return response.json();
//  })
//  .then((data) => {
//      // nu er json objektet lagt ind i data variablen, udskriv data
//      console.log(data);
//      data.forEach(function(element) {
//          document.getElementById('content').innerHTML +=`<h2> ${element.navn} </h2>
//          <img src="../Billeder/${element.img}">
//          <h3> ${element.pris} kr.</h3>
//          <h4>varenr nr ${element.varenr}</h4> 
//          <p>${element.info}</p>
//          `;
//      }, this);
//      // for (var i = 0; i < data.length; i++) {
//          // document.getElementById('content').innerHTML += '<div class="container3">' + '<h3>' + data[i].navn + '</h3>' + '<img src="creek_classic_cd.jpg"' + data[i].fk_img  + '<h6>pris: ' + data[i].pris + '<br>' + 'varanr: ' + data[i].varenr + '</h6>' + '<p>' + data[i].info + '</p>' + '</div>';
//  })