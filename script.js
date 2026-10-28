
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

/* Tache 5 : Modifier un etudiant */
function modifier(i) {
    nom.value = etudiants[i].nom;
    groupe.value = etudiants[i].groupe;
    moyenne.value = etudiants[i].moyenne;

    indexModif = i;

    btn.textContent = "Enregistrer la modification";
    annuler.hidden = false;

    nom.focus();
}

// Annuler la modification
annuler.addEventListener("click", function() {
    form.reset();

    indexModif = -1;
    btn.textContent = "Ajouter l'étudiant";
    annuler.hidden = true;
});
/* Tache 6 : Supprimer un etudiant */
function supprimer(i) {
    let confirmation = confirm(
        "Voulez-vous vraiment supprimer cet étudiant ?"
    );

    if (confirmation) {
        etudiants.splice(i, 1);

        if (indexModif === i) {
            form.reset();
            indexModif = -1;
            btn.textContent = "Ajouter l'étudiant";
            annuler.hidden = true;
        } else if (indexModif > i) {
            indexModif--;
        }

        afficher();
    }
}

// Afficher chaque groupe une seule fois
function actualiserGroupes() {
    let choix = filtreGroupe.value;

    let groupes = [];

    etudiants.forEach(function(e) {
        if (!groupes.includes(e.groupe)) {
            groupes.push(e.groupe);
        }
    });

    filtreGroupe.innerHTML =
        '<option value="">Tous les groupes</option>';

    groupes.forEach(function(g) {
        let option = document.createElement("option");
        option.value = g;
        option.textContent = g;
        filtreGroupe.appendChild(option);
    });

    if (groupes.includes(choix)) {
        filtreGroupe.value = choix;
    }
}


/* Tache 7 : Calculer les statistiques */
function actualiserStatistiques() {
    nombre.textContent = etudiants.length;

    if (etudiants.length === 0) {
        moyenneGenerale.textContent = "0.00";
        return;
    }

    let total = 0;

    etudiants.forEach(function(e) {
        total = total + e.moyenne;
    });

    let moyenne = total / etudiants.length;

    moyenneGenerale.textContent = moyenne.toFixed(2);
}

// Recherche par nom
recherche.addEventListener("input", function() {
    afficher();
});

// Filtrage par groupe
filtreGroupe.addEventListener("change", function() {
    afficher();
});

// Affichage initial
afficher();
