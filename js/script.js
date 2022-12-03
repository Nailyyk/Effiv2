//  burger menu
function menuOnClick() {
  console.log('Hello');
  document.getElementById("menu-bar").classList.toggle("change");
  document.getElementById("nav").classList.toggle("change");
  document.getElementById("menu-bg").classList.toggle("change-bg");
}

// onglets

function openOnglet(evt,name){
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName('tabcontent');
  for(i = 0; i <tabcontent.length; i++){
    tabcontent[i].style.display = 'None';
  }

  tablinks = document.getElementsByClassName('tablinks');
  for(i = 0; i <tablinks.length; i++){
    tablinks.className = tablinks[i].className.replace("active", "");
  }
  
  document.getElementById(name).style.display="block";
  evt.currentTarget.className+="active";
}


 // exercice clavier
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const endGameElement = document.getElementById("end-game-container");
const settingBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const difficultySelect = document.getElementById("difficulty");

// Mots à écrire
const words = [
  "chien",
  "chat",
  "lettre",
  "début",
  "Je",
  "suis",
  "fort(e)",
  "moutarde",
  "Avec",
  "carottes",
  "Rectangle",
  "Oeil",
  "partir",
  "Chanter",
  "Perpendiculaire",
  "aléatoire",
  "pourquoi",
  "année",
  "à propos",
  "peut-être",
  "Jamais",
  "France",
  "écouteurs",
  "J'aime",
  "suivre",
  "étudier",
  "/",
  "(",
  "15",
  "25,1",
  "Bonjour",
  "enchanté",
  "je",
  "entraine",
  "ordinateur",
  "halloween",
  "noël",
  "Elle",
  "eux",
  "Vous",
  "Dormir",
  "c'est",
  "étrange",
  "beaucoup",
  "parler",
  "Rapide",
  "ouvrir",
  "mains",
  "Voiture",
  "fauteuil",
  "canapé",
  "Table",
  "mobylette",
  "canne",
  "Dragon",
  "souris",
  "ça",
  "place",
  "restaurant",
  "toujours",
  "jamais",
  "Montagne",
  "Français",
  "poIsSon",
  "clés",
  "extincteur",
  "volume",
  "maillot",
  "épaule",
  "Icone",
  "vouloir",
  "changer",
  "Travail",
  "internet",
  "dossier",
  "Batterie",
  "mur",
  "Tapisserie",
  "non",
  "Oui",
  "histoire",
];

// Rendre les mots aléatoire
let randomWord;

// score de base
let score = 0;

// temps de base
let time = 10;

// Ajuster la difficulté
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// Modifier la difficulté
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// Se focus sur le text
text.focus();

// timer
const timeInterval = setInterval(updateTime, 1000);

// Génère un mot aléatoire du tableau avec m.random
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Ajoute un mot au DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// Modifie le score
function updateScore() {
  score++;
  scoreElement.innerHTML = score;
}

// Ajoute du temps en facile
function updateTime() {
  time--;
  timeElement.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);

    //   game over
    gameOver();
  }
}

// Afficher la fin du jeu/score/temps et un btn
function gameOver() {
  endGameElement.innerHTML = `
  <h1>Le temps est expiré</h1>
  <p>Votre score final est de : ${score}</p>
  <button onclick="location.reload()" style="
  background: orange; color: #f4f4f4;">Recommencer</button>
    `;

  endGameElement.style.display = "flex";
}

addWordToDOM();

text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    e.target.value = "";

    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

// Bouton de réglage
settingBtn.addEventListener("click", () => settings.classList.toggle("hide"));

// Selection de la difficulté
difficultySelect.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});

