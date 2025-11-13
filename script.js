/* ================================
   CARNET D'AVENTURE — SCRIPT BASE
   ================================ */

/* --- DOM ELEMENTS (références) --- */
const chat = document.getElementById("chat");
const input = document.getElementById("input");
const send = document.getElementById("send");
const resetBtn = document.getElementById("resetChat");
const menuBtn = document.getElementById("menuBtn");

/* --- INITIALISATION --- */
console.log("script.js chargé");

// À compléter plus tard, bloc par bloc, uniquement sur demande.

/* =====================
   PANNEAU LATERAL
   ===================== */

/* OUVERTURE / FERMETURE PANEL */
menuBtn.addEventListener("click", () => {
  const panel = document.getElementById("sidePanel");

  if (panel.classList.contains("-translate-x-full")) {
    panel.classList.remove("-translate-x-full");
    panel.classList.add("translate-x-0");
  } else {
    panel.classList.remove("translate-x-0");
    panel.classList.add("-translate-x-full");
  }
});