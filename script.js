
let etudiants = [];
let indexModif = -1;

const form = document.getElementById("form");
const nom = document.getElementById("nom");
const groupe = document.getElementById("groupe");
const moyenne = document.getElementById("moyenne");
const liste = document.getElementById("liste");

const btn = document.getElementById("btn");
const annuler = document.getElementById("annuler");
const recherche = document.getElementById("recherche");
const filtreGroupe = document.getElementById("filtreGroupe");
const message = document.getElementById("message");

const nombre = document.getElementById("nombre");
const moyenneGenerale =
    document.getElementById("moyenneGenerale");

// Tache 3 : Afficher les etudiants
function afficher() {
    liste.innerHTML = "";

    let mot = recherche.value.toLowerCase();
    let groupeChoisi = filtreGroupe.value;
    let compteur = 0;

    etudiants.forEach(function(e, i) {
        if (
            e.nom.toLowerCase().includes(mot) &&
            (groupeChoisi === "" || e.groupe === groupeChoisi)
        ) {
            compteur++;

            let resultat = e.moyenne >= 10
                ? "Admis"
                : "Non admis";

            let couleur = e.moyenne >= 10
                ? "admis"
                : "non-admis";

            liste.innerHTML += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${e.nom}</td>
                    <td>${e.groupe}</td>
                    <td>${e.moyenne.toFixed(2)}</td>
                    <td class="${couleur}">${resultat}</td>
                    <td>
                        <button class="modifier"
                            onclick="modifier(${i})">
                            Modifier
                        </button>

                        <button class="supprimer"
                            onclick="supprimer(${i})">
                            Supprimer
                        </button>
                    </td>
                </tr>
            `;
        }
    });

    if (compteur === 0) {
        message.textContent = "Aucun étudiant trouvé.";
    } else {
        message.textContent = compteur + " étudiant(s) affiché(s).";
    }

    actualiserGroupes();
    actualiserStatistiques();
}
/* Tache 4 : Ajouter un etudiant */
form.addEventListener("submit", function(e) {
    e.preventDefault();

    let nomSaisi = nom.value.trim();
    let groupeSaisi = groupe.value.trim();
    let note = Number(moyenne.value);

    if (nomSaisi === "" || groupeSaisi === "") {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    if (moyenne.value.trim() === "" ||
        note < 0 || note > 20) {
        alert("La moyenne doit etre entre 0 et 20.");
        return;
    }

    let etudiant = {
        nom: nomSaisi,
        groupe: groupeSaisi,
        moyenne: note
    };

    if (indexModif === -1) {
        etudiants.push(etudiant);
    } else {
        etudiants[indexModif] = etudiant;
    }

    form.reset();
    indexModif = -1;
    btn.textContent = "Ajouter l'étudiant";
    annuler.hidden = true;

    afficher();
});
