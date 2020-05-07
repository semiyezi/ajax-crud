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
});
