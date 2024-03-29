const params = new URLSearchParams(window.location.search); // oggetto costruito a partire dai parametri nella URL es. ?agendaId=2938123
console.log("URL search params: ", params);
console.log("window: ", window);
console.log("window.location", window.location);

// token key
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOWQzNjRjNTllYzAwMTk5MGQ2ZmQiLCJpYXQiOjE3MDkyODQ2NjIsImV4cCI6MTcxMDQ5NDI2Mn0.uUX30S6OfshEvAks_dyZ3YuTgnNl2ZZuY4PrZc86ybw";

const elementId = params.get("productId");
console.log("elementId", elementId);

let url = "https://striveschool-api.herokuapp.com/api/product/" + elementId;

// rivela modalità
const titleAlt = document.getElementById("title-alt");

const btnSave = document.querySelector(".d-flex button");
console.log("btnSave", btnSave);

const btnResetForm = document.querySelector(".d-flex button+button");
console.log("btn reset", btnResetForm);

const btnDelete = document.querySelector(".d-none");
console.log("btnDelete", btnDelete);

if (elementId) {
  // modalità modifica
  console.log("modalità modifica");
  console.log("url di modifica con id: ", url);
  titleAlt.innerText = "— Modifica";

  btnSave.innerText = "Modifica Prodotto";
  btnSave.classList.add("btn-success");

  btnDelete.classList.remove("d-none");
  btnDelete.innerText = "Elimina";

  btnResetForm.classList.add("d-none");

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
    })
    .catch((err) => console.log(err));
} else {
  // modalità crea
  btnResetForm.classList.remove("d-none");
  btnResetForm.classList.add("btn-warning", "btn");

  console.log("modalità crea");
  titleAlt.innerText = "— Crea";

  btnSave.innerText = "Crea Prodotto";
  btnSave.classList.add("btn-primary");
}
// };

const riceviDatiForm = (e) => {
  console.log("tasto invio - prova modifica");
  e.preventDefault();
  console.log("modalità crea - dati raccolti form");

  const elementId = params.get("productId");
  // id
  console.log("elementId", elementId);

  // https://images.unsplash.com/photo-1707336670211-abb7a586f736?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  // https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Samsung_Galaxy_S.svg/800px-Samsung_Galaxy_S.svg.png
  // if (imgVerifica.startWith()) {
  // }

  const nameForm = document.getElementById("name").value;
  console.log("nameForm", nameForm);

  const descriptionForm = document.getElementById("description").value;
  console.log("descriptionForm", nameForm);

  const priceForm = document.getElementById("price").value;
  console.log("priceForm", priceForm);

  const brandForm = document.getElementById("brand").value;
  console.log("brandForm", brandForm);

  const imageForm = document.getElementById("image").value;
  console.log("imageForm", imageForm);

  if (imageForm.startsWith("http")) {
    const newProduct = {
      name: nameForm,
      description: descriptionForm,
      brand: brandForm,
      imageUrl: imageForm,
      price: priceForm,
    };

    console.log("oggetto creato: ", newProduct);
    console.log("caricamento su questa url: ", url);
    const urlPost = "https://striveschool-api.herokuapp.com/api/product/";
    console.log("url modificata per post: ", urlPost);
    console.log("token", token);

    const params = new URLSearchParams(window.location.search); // oggetto costruito a partire dai parametri nella URL es. ?agendaId=2938123
    console.log("URL search params: ", params);
    console.log("window: ", window);
    console.log("window.location", window.location);
    let methodMod = "PUT";

    if (elementId) {
      url = url;
      methodMod = methodMod;
    } else {
      url = urlPost;
      methodMod = "POST";
    }

    fetch(url, {
      method: methodMod,
      body: JSON.stringify(newProduct),
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
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
      .then((newObject) => {
        console.log("newObject", newObject);
        console.log("elementId", elementId);
        if (elementId) {
          alert("Oggetto modificato con successo, ritornerai alla home");
        } else {
          alert("Oggetto creato, ritornerai alla home");
        }

        e.target.reset();
        setTimeout(() => {
          window.location.assign("./index.html");
          //   console.log("Verrai riportato alla pagina principale");
        }, 1500);
        // window.location.assign("./index.html");
      })
      .catch((err) => console.log(err));
  } else {
    alert("l'immagine inserita non è valida");
  }
};

const deleteProduct = () => {
  console.log("btn delete");
  // console.log("da eliminare: ", response);
  const conferma = confirm("Sei sicuro di eliminare il prodotto?");
  console.log("url", url);

  if (conferma) {
    fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    })
      .then((daEliminare) => daEliminare.json())
      .then((eliminato) => {
        console.log("eliminato", eliminato);
        alert(`Prodotto ${eliminato.name}, verrai riportato alla Homepage`);
      });

    setTimeout(() => {
      window.location.assign("./index.html");
    }, 1500);
  }
};

const provaForm = document.querySelector("form");

const resetForm = (e) => {
  const confermReset = confirm("Sei sicuro di resettare i dati inseriti?");
  if (confermReset) {
    console.log(e.target.form);
    e.target.form.reset();
  }
};
