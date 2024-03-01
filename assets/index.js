// dove mostrare prodotti
const divShow = document.querySelector(".album .row");
console.log("row", divShow);

// url da dove cercare
const url = "https://striveschool-api.herokuapp.com/api/product/";
// chiave
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOWQzNjRjNTllYzAwMTk5MGQ2ZmQiLCJpYXQiOjE3MDkyODQ2NjIsImV4cCI6MTcxMDQ5NDI2Mn0.uUX30S6OfshEvAks_dyZ3YuTgnNl2ZZuY4PrZc86ybw";

fetch(url, {
  headers: {
    Authorization: token,
  },
})
  .then((response) => {
    console.log("Response: ", response);
    //   dove bisogna aspettare EXTRA
    if (response.ok) {
      return response.json();
    } else {
      if (response.status === 400) {
        throw new Error("400 - Errore lato client - Bad Request");
      }
      if (response.status === 401) {
        throw new Error("401 - Errore lato client - Non autorizzato");
      }
      if (response.status === 403) {
        throw new Error("403 - Errore lato client - Il cliente non ha diritto di accesso - Forbidden");
      }
      if (response.status === 404) {
        throw new Error("404 - Errore lato client - Non trovato");
      }
      if (response.status === 405) {
        throw new Error("405 - Errore lato client - Non è permesso effettuare questa operazione");
      }
      if (response.status === 408) {
        throw new Error("408 - Errore lato client - Request Timeout");
      }
      if (response.status === 500) {
        throw new Error("500 - Errore lato server");
      }
      if (response.status === 503) {
        throw new Error("503 - Errore lato server - Servizio non disponibile");
      }
      if (response.status === 504) {
        throw new Error("504 - Errore lato server - Timeout");
      }
      throw new Error("Errore nel reperimento dati");
    }
  })

  .then((collezione) => {
    // secondo then
    console.log("collezione: ", collezione);
    // dove mostrare
    console.log("Elemento singolo: ", collezione[0]);

    collezione.forEach((element) => {
      console.log("element", element);
      // formazione singoli elementi card

      //   dove aggiungere ogni volta la carta <div class="col-md-4">
      const col = document.createElement("div");
      col.classList.add("col-md-4");

      const divCard = document.createElement("div");
      divCard.classList.add("card", "mb-4");
      divCard.style = "width: 18rem";
      //   console.log("divCard", divCard);
      //   img src="..." class="card-img-top" alt="...">
      const img = document.createElement("img");
      img.classList.add("card-img-top", "object-fit-contain");
      img.src = element.imageUrl;
      img.alt = element.name;
      img.style = "height: 25em;";
      //   console.log("elemento img: ", img);
      // <div class="card-body">
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      //  <h5 class="card-title">Card title</h5>
      const h5 = document.createElement("h5");
      h5.classList.add("card-title");
      h5.innerText = element.name;
      //   console.log("h5", h5);
      // <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
      const h6 = document.createElement("h6");
      h6.classList.add("card-subtitle", "mb-2", "text-body-secondary");
      h6.innerText = element.brand;
      //  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      //   const p = document.createElement("p");
      //   p.classList.add("card-text");
      //   p.innerText = element.description;
      //   <a href="#" class="btn btn-primary">Go somewhere</a>
      const a = document.createElement("a");
      a.classList.add("btn", "btn-primary");
      a.innerText = "Visualizza Dettagli";
      a.href = `./details.html?productId=${element._id}`;
      console.log("element._id", element._id);
      //   https://striveschool-api.herokuapp.com/api/product/
      console.log("ancor a: ", a);
      //   a ogni row col

      //   cardBody.append(h5, h6, p, a);
      cardBody.append(h5, h6, a);
      divCard.append(img, cardBody);
      col.appendChild(divCard);
      divShow.appendChild(col);
    });
  });
