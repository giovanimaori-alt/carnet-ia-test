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
menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();               // IMPORTANT
  sidePanel.classList.toggle("open");
});

/* FERMETURE AU TOUCH EN DEHORS DU PANNEAU */
document.addEventListener("click", (e) => {
  const clickDansPanel = sidePanel.contains(e.target);
  const clickSurMenu   = menuBtn.contains(e.target);

  if (!clickDansPanel && !clickSurMenu) {
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
   DEBUG
   ===================== */
console.log("TEST-PANEL OK");
