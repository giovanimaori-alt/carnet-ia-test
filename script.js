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

/* =====================
   RESET CHAT
   ===================== */
resetBtn.addEventListener("click", () => {
  chat.innerHTML = "";
});