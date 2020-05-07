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
const btnReset = document.querySelector("#reset");
let updateRow;

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
    let newTr;
    if (btnSubmit.value == "Modifier") {
        //  on recupere  le tr à modifier
        newTr = updateRow;
        newTr.innerHTML = "";
        btnSubmit.value = "Ajouter"
    }else{
        // on cree une nouvelle ligne
        newTr = document.createElement('tr');
    }
    // boucle pour les td
    for (const attribut in objectEmploye) {
      if (objectEmploye.hasOwnProperty(attribut)) {
        const newTd = document.createElement("td");
        newTd.innerHTML =  objectEmploye[attribut];
        newTr.appendChild(newTd);
      }
    }
    newTr.innerHTML += ajouterBouttons();
    tbody.appendChild(newTr);
    ajouterEvenement();
    formulaire.reset();
  }
});
reset.addEventListener("click",function(e){
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
      return true
  }else{
      return false
  }
}
function ajouterBouttons(){
    return `<td>
                <button class="ui button btn-modifier">Modifier</button>
                <button class="ui button btn-supprimer">Supprimer</button>
            <td>
            `;
}

function ajouterEvenement(){
    const btnModifier = document.querySelectorAll('.btn-modifier');
    const btnSupprimer = document.querySelectorAll('.btn-supprimer');

    //modification
    for (let index = 0; index < btnModifier.length; index++) {
        btnModifier[index].addEventListener("click",function(e){
            btnSubmit.value = "Modifier";
            let row = e.target.parentNode.parentNode;
            updateRow = row ;
            // on rempli le formulaire 
            nom.value = row.cells[0].innerHTML;
            prenom.value = row.cells[1].innerHTML;
            email.value = row.cells[2].innerHTML;
            poste.value = row.cells[3].innerHTML;
            telephone.value = row.cells[4].innerHTML;
            statut.value = row.cells[5].innerHTML;
            pays.value = row.cells[6].innerHTML;
        });
        
    }
    // Suppression
    for (let index = 0; index < btnSupprimer.length; index++) {
        btnSupprimer[index].addEventListener("click",function(e){
            if(confirm('Voulez-vous vraiment supprimer cet employé ???')){
                const tr = e.target.parentNode.parentNode;
                tbody.removeChild(tr);
            }
        });
    }
}
