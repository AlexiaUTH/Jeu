/********
 * A FAIRE :
 * 
 * - Ecran d'accueil / Attente avec bouton à cliquer pour lancer une partie
 * - Rendre possible une fin de partie (durée limitée / nombre limité de cibles)
 * - Différence visuelle entre cible touchée et disparition "naturelle"
 * 
 * BONUS :
 * (- Difficulté croissante (cycle de plus en plus rapide) - en gros niveau de jeu)
 * (- Sauvegarde et affichage des scores passées)
 ********/


// a) Conseil : créer un "raccourci" vers la cible
const la_cible = document.querySelector("#cible") // cible devient une variable grâce à let cible = document.querySelector("#cible"), on l'a stocké et on peut la réutiliser
// console.log(cible)
let score = 0 // Garder trace d'un score
// Préparation du cycle de la cible
let cycle_cible;
//Paramètres de jeu (exprimé en secondes):
const duree_cycle = 1;
const duree_animation = 0.25;
// Garder trace de l'état "touchable" de la cible
let cible_touchable = false;

// Préparation des "outils" qui serviront plusieurs fois dans le script - fonctions
let affichage_score = document.querySelector("#affichage_score")
function pourcentage_aleatoire() {
    let resultat = Math.round (Math.random()*100);
    return resultat;
}

//console.log(pourcentage_aleatoire())

/* Il va falloir que la cible se déplace aléatoirement...

// Pour obtenir une valeur aléatoire en JS:

    //let valeur_aleatoire = Math.random();
    // console.log(valeur_aleatoire);
    //let valeur_modifiee = valeur_aleatoire * 100; // Une valeur décimale entre 0 et 1
    // console.log(valeur_modifiee)
    //console.log(Math.random(), Math.random());

On peut se servir de ce genre de valeurs pour obtenir des coordonnées aléatoires à donner à notre cible (via ses propriétés style.top et style.left, en % de la hauteur et de la largeur de la fenêtre)
*/

function deplacement_cible(){ 

// b) Préparer 2 valeurs aléatoire (à l'aide d'un calcul simple), On veut une valeur qui s'adapte à la fenêtre
let coordonnee_X = pourcentage_aleatoire(); // Créer une coordonnées pour la 1ère valeur aléatoire
let coordonnee_Y = pourcentage_aleatoire(); // Créer une coordonnées pour la 2ème valeur aléatoire
                                                    // Math round
// c) Appliquer ces 2 valeurs comme coordonnées de la cible (top, left dans le css)

    //la_ciblecible.style.left = coordonnee_X + "%" // le % précises que la valeur est en %
    //console.log(cible.style.left)
    //la_cible.style.top = coordonnee_Y + "%" // le % précises que la valeur est en %
    //console.log(cible.style.top)

    la_cible.style = "left:" + coordonnee_X +"%;" + "top:" + coordonnee_Y + "%;";
}

// Il faudra aussi pouvoir laisser des actions se produire cycliquement...

function ma_fonction() {
    console.log("il s'est écoulé du temps...")
}
setInterval(ma_fonction,1000);


la_cible.onclick = cible_touchee; // La cible sera touchee lorqu'on réussira à cliquer dessus

function cible_touchee(){
    if (!cible_touchable) { // if (cible_touchable == false)
        return
    }
    
    disparition_cible();

    clearInterval(cycle_cible);
    lancement_cycle_cible(cycle_cible);
    // Gestion du score

    score++; //le score augmente
    document.querySelector("#affichage_score").innerText = + score; // l'affichage du score est mis à jour
}

// CIBLE QUI DEVIENT TRANSPARENT //

function apparition_cible(){
    //La cible doit devenir opaque
    la_cible.classList.remove("invisible");
    cible_touchable = true;
}

function disparition_cible(){
    //La cible doit devenir transparente
    la_cible.classList.add("invisible");
    cible_touchable = false;
}

function actions_cible() {
    deplacement_cible();
    apparition_cible();
    setTimeout(disparition_cible, duree_cycle *1000);
}

function lancement_cycle_cible() {
    cycle_cible = setInterval ( function(){

        deplacement_cible();
        apparition_cible();

        //A ajouter : disparition de la cible après un certain temps ATTENTION: prendre en compte le temps que met la cible à disparaître)

        setTimeout(disparition_cible, duree_cycle * 1000)
    
    }, (duree_cycle + duree_animation) * 1000 );
}

actions_cible();
lancement_cycle_cible(); // La cible se déplacera à des intervalles réguliers
