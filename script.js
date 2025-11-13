/* ================================
   CARNET D'AVENTURE — SCRIPT BASE
   ================================ */

window.addEventListener("DOMContentLoaded", () => {

  /* --- DOM ELEMENTS --- */
  const chat      = document.getElementById("chat");
  const input     = document.getElementById("input");
  const send      = document.getElementById("send");
  const resetBtn  = document.getElementById("resetChat");
  const menuBtn   = document.getElementById("menuBtn");
  const sidePanel = document.getElementById("sidePanel");

  console.log("script.js chargé — DOM prêt");

  /* =====================
     PANNEAU LATÉRAL
     ===================== */

  if (menuBtn && sidePanel) {
    // OUVERTURE / FERMETURE sur le burger
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      sidePanel.classList.toggle("-translate-x-full");  // on enlève / remet la classe Tailwind
    });

    // FERMETURE si clic en dehors
    document.addEventListener("click", (e) => {
      const clickDansPanel = sidePanel.contains(e.target);
      const clickSurMenu   = menuBtn.contains(e.target);

      if (!clickDansPanel && !clickSurMenu) {
        sidePanel.classList.add("-translate-x-full");   // on force caché
      }
    });
  } else {
    console.log("ERREUR : menuBtn ou sidePanel introuvable");
  }

  /* =====================
     RESET CHAT
     ===================== */
  if (resetBtn && chat) {
    resetBtn.addEventListener("click", () => {
      chat.innerHTML = "";
    });
  }

  /* =====================
     BADGE VERSION
     ===================== */
  const version = "bêta V.0.2";

  if (!document.getElementById("versionBadge")) {
    const badge = document.createElement("div");
    badge.id = "versionBadge";
    badge.textContent = "JS " + version;
    document.body.appendChild(badge);
  }
});