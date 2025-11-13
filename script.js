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

/* MENU */
document.getElementById("menuBtn").addEventListener("click", () => {
  alert("Menu en préparation");
});

/* =====================
   PANNEAU LATERAL
   ===================== */

/* OUVERTURE / FERMETURE PANEL */
menuBtn.addEventListener("click", () => {
  const panel = document.getElementById("sidePanel");
  panel.classList.toggle("-translate-x-full");
});