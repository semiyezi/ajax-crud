const formulaire = document.querySelector("#formulaire");
const nom = document.querySelector("#nom");
const prenom = document.querySelector("#prenom");
const email = document.querySelector("#email");
const poste = document.querySelector("#poste");
const telephone = document.querySelector("#telephone");
const statut = document.querySelector("#statutmarital");
const pays = document.querySelector("#paysorigine");
const tbody = document.querySelector("tbody");
const btnSubmit = document.querySelector("#submit");

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

    //  on ajoute un tr dans le tbody avec les données de l'object
    const newTr = document.createElement("tr");
    // boucle pour les td
    for (const attribut in objectEmploye) {
      if (objectEmploye.hasOwnProperty(attribut)) {
        const newTd = document.createElement("td");
        newTd.innerText = objectEmploye[attribut];
        newTr.appendChild(newTd);
      }
    }
    tbody.appendChild(newTr);
    formulaire.reset();
  }
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
      return true
  }else{
      return false
  }
}
