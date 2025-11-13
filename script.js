/* ================================
   CARNET D'AVENTURE — SCRIPT BASE
   ================================ */

/* --- DOM ELEMENTS --- */
const chat = document.getElementById("chat");
const input = document.getElementById("input");
const send = document.getElementById("send");
const resetBtn = document.getElementById("resetChat");
const menuBtn = document.getElementById("menuBtn");
const sidePanel = document.getElementById("sidePanel");

/* --- INITIALISATION --- */
console.log("script.js chargé");

/* =====================
   PANNEAU LATERAL
   ===================== */

/* OUVERTURE / FERMETURE PANEL */
menuBtn.addEventListener("click", () => {
  sidePanel.classList.toggle("open");
});

/* FERMETURE AU TOUCH EN DEHORS DU PANNEAU (OPTIONNEL MAIS UTILE) */
document.addEventListener("click", (e) => {
  const isClickInsidePanel = sidePanel.contains(e.target);
  const isClickOnMenuBtn = menuBtn.contains(e.target);

  if (!isClickInsidePanel && !isClickOnMenuBtn) {
    sidePanel.classList.remove("open");
  }
});

/* =====================
   RESET CHAT
   ===================== */
resetBtn.addEventListener("click", () => {
  chat.innerHTML = "";
});

/* =====================
   ENVOI MESSAGE (Gemini)
   ===================== */

/* Rien ajouté ici — ta logique Gemini est dans index.html.
   Ce script reste MINIMAL, comme demandé. */

console.log("TEST-PANEL");
document.body.style.border = "5px solid red";
