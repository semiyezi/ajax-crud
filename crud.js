const formulaire = document.querySelector("#formulaire");
const _id = document.querySelector("#_id");
const nom = document.querySelector("#nom");
const prenom = document.querySelector("#prenom");
const email = document.querySelector("#email");
const poste = document.querySelector("#poste");
const telephone = document.querySelector("#telephone");
const statut = document.querySelector("#statutmarital");
const pays = document.querySelector("#paysorigine");
const tbody = document.querySelector("tbody");
const btnSubmit = document.querySelector("#submit");
const btnReset = document.querySelector("#reset");
let updateRow;
// ----------
// API
//--------------
// Afficher les employés
recuperEmployes();
function recuperEmployes() {
    tbody.innerHTML = "";
  axios
    .get("http://167.71.45.243:4000/api/employes/?api_key=svutqyq")
    .then(function (response) {
      for (const employe of response.data) {
        Afficheremployes(arrangerAttributEmploye(employe));
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function arrangerAttributEmploye(employe) {
  return {
    nom: employe.nom,
    prenom: employe.prenom,
    email: employe.email,
    poste: employe.poste,
    numeroTelephone:
      employe.numeroTelephone == undefined ? "" : employe.numeroTelephone,
    estMarie: employe.estMarie,
    pays: employe.pays,
    _id: employe._id,

  };
}

function Afficheremployes(employe) {
  const newTr = document.createElement("tr");
  // boucle pour les td
  for (const attribut in employe) {
    if (employe.hasOwnProperty(attribut)) {
      const newTd = document.createElement("td");
      newTd.innerHTML = employe[attribut];
      newTr.appendChild(newTd);
    }
  }
  newTr.cells[7].style.display = "none";
  newTr.innerHTML += ajouterBouttons(employe._id);
  tbody.appendChild(newTr);
    ajouterEvenement(employe._id);
}

btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  //   validation du formulaire

  if (validerFormulaire()) {
    const objectEmploye = {
      nom: nom.value,
      prenom: prenom.value,
      email: email.value,
      numeroTelephone: telephone.value,
      poste: poste.value,
      estMarie: statut.value,
      pays: pays.value,
    };
    if (btnSubmit.value == "Modifier") {
      //PUT
      axios
        .put(`http://167.71.45.243:4000/api/employes/${_id.value}?api_key=svutqyq`,objectEmploye)
        .then(function (response) {
            btnSubmit.value = "Ajouter"
            recuperEmployes()
          
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      //POST
      axios
        .post("http://167.71.45.243:4000/api/employes/?api_key=svutqyq",objectEmploye)
        .then(function (response) {
            recuperEmployes()
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    formulaire.reset();
  }
});
reset.addEventListener("click", function (e) {
  e.preventDefault();
  formulaire.reset();
});
function validerFormulaire() {
  const erreurNom = document.querySelector("#erreurnom");
  const erreurPrenom = document.querySelector("#erreurprenom");
  const erreurEmail = document.querySelector("#erreuremail");
  const erreurPoste = document.querySelector("#erreurposte");
  const erreurTelephone = document.querySelector("#erreurtelephone");
  const erreurStatut = document.querySelector("#erreurstatut");
  const erreurPays = document.querySelector("#erreurpays");
  if (!nom.value.length) {
    erreurNom.innerText = "Le nom est requis";
  } else {
    erreurNom.innerHTML = "";
  }
  if (!prenom.value.length) {
    erreurPrenom.innerText = "Le Prenom est requis";
  } else {
    erreurPrenom.innerText = "";
  }
  if (!email.value.length) {
    erreurEmail.innerText = "Le Email est requis";
  } else {
    erreurEmail.innerText = "";
  }
  if (!poste.value.length) {
    erreurPoste.innerText = "Le Poste est requis";
  } else {
    erreurPoste.innerText = "";
  }
  if (!telephone.value.length) {
    erreurTelephone.innerText = "Le Telephone est requis";
  } else {
    erreurTelephone.innerText = "";
  }
  if (!statut.value.length) {
    erreurStatut.innerText = "Le Statut est requis";
  } else {
    erreurStatut.innerText = "";
  }
  if (!pays.value.length) {
    erreurPays.innerText = "Le Pays est requis";
  } else {
    erreurPays.innerText = "";
  }

  if (
    !erreurNom.innerText.length &&
    !erreurPrenom.innerText.length &&
    !erreurEmail.innerText.length &&
    !erreurPoste.innerText.length &&
    !erreurTelephone.innerText.length &&
    !erreurStatut.innerText.length &&
    !erreurPays.innerText.length
  ) {
    return true;
  } else {
    return false;
  }
}
function ajouterBouttons(id) {
  return `<td>
                <button class="ui button btn-modifier">Modifier</button>
                <button class="ui button btn-supprimer" id="btn-supprimer-${id}">Supprimer</button>
            <td>
            `;
}

function ajouterEvenement(id) {
  const btnModifier = document.querySelectorAll(".btn-modifier");
  const btnSupprimer = document.querySelector(`#btn-supprimer-${id}`);

  //modification
  for (let index = 0; index < btnModifier.length; index++) {
    btnModifier[index].addEventListener("click", function (e) {
      btnSubmit.value = "Modifier";
      let row = e.target.parentNode.parentNode;
      updateRow = row;
      // on rempli le formulaire
      nom.value = row.cells[0].innerHTML;
      prenom.value = row.cells[1].innerHTML;
      email.value = row.cells[2].innerHTML;
      poste.value = row.cells[3].innerHTML;
      telephone.value = row.cells[4].innerHTML;
      statut.value = row.cells[5].innerHTML;
      pays.value = row.cells[6].innerHTML;
      _id.value = row.cells[7].innerHTML;
    });
  }
  // Suppression
    btnSupprimer.addEventListener("click", function(e) {
      if (confirm("Voulez-vous vraiment supprimer cet employé ???")) {
        const tr = e.target.parentNode.parentNode;
        const id = tr.cells[7].innerText;
        axios
        .delete(`http://167.71.45.243:4000/api/employes/${id}?api_key=svutqyq`)
        .then(function (response) {
            btnSubmit.value = "Ajouter"
            recuperEmployes()
          
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    });
}
