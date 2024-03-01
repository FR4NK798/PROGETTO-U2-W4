const params = new URLSearchParams(window.location.search); // oggetto costruito a partire dai parametri nella URL es. ?agendaId=2938123
console.log("URL search params: ", params);
console.log("window: ", window);
console.log("window.location", window.location);

const elementId = params.get("productId");
console.log("elementId", elementId);

const url = "https://striveschool-api.herokuapp.com/api/product/" + elementId;

if (elementId) {
  const method = "PUT";

  console.log("url: ", url);
} else {
  const method = "POST";
  const url = "https://striveschool-api.herokuapp.com/api/product/";
  console.log("url: ", url);
}

window.onload = () => {
  // rivela modalità
  const titleAlt = document.getElementById("title-alt");

  const btnSave = document.querySelector(".d-flex button");
  console.log("btnSave", btnSave);

  const btnDelete = document.querySelector(".d-none");
  console.log("btnDelete", btnDelete);

  if (elementId) {
    // modalità modifica
    console.log("modalità modifica");
    titleAlt.innerText = "— Modifica";

    btnSave.innerText = "Modifica Prodotto";
    btnSave.classList.add("btn-success");

    btnDelete.classList.remove("d-none");
    btnDelete.innerText = "Elimina";

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
      .then((response) => {
        console.log("response2", response);

        document.getElementById("brand").value = response.brand;
        document.getElementById("description").value = response.description;
        document.getElementById("price").value = response.price;
        document.getElementById("name").value = response.name;
        document.getElementById("image").value = response.imageUrl;
      });
  } else {
    // modalità crea
    console.log("modalità crea");
    titleAlt.innerText = "— Crea";

    btnSave.innerText = "Crea Prodotto";
    btnSave.classList.add("btn-primary");
  }

  const riceviDatiForm = (e) => {
    e.preventDefault();
    console.log("modalità crea - dati raccolti form");

    const imgVerifica = response.imageUrl;
    console.log("url immagine inserita: ", imgVerifica);
    // https://images.unsplash.com/photo-1707336670211-abb7a586f736?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
    // https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Samsung_Galaxy_S.svg/800px-Samsung_Galaxy_S.svg.png
    // if (imgVerifica.startWith()) {
    // }

    class Product {
      constructor(name, description, price, brand, image) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.brand = brand;
        this.image = image;
      }
    }
    const newProduct = new Product(
      response.name,
      response.description,
      response.price,
      response.brand,
      response.imageUrl
    );

    // if (response.imageUrl) console.log();
  };
};
