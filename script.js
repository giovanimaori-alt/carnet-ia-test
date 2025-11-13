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

  const boutonPre    = document.querySelector(".panel-btn:nth-child(6)");
  const preOverlay   = document.getElementById("preModalOverlay");
  const closePre     = document.getElementById("closePreModal");

  console.log("script.js chargé — DOM prêt");

  /* =====================
     PANNEAU LATÉRAL
     ===================== */

  if (menuBtn && sidePanel) {

    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      sidePanel.classList.toggle("-translate-x-full");
    });

    document.addEventListener("click", (e) => {
      const clickDansPanel = sidePanel.contains(e.target);
      const clickSurMenu   = menuBtn.contains(e.target);

      if (!clickDansPanel && !clickSurMenu) {
        sidePanel.classList.add("-translate-x-full");
      }
    });
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
     MODAL PREAMBULE
     ===================== */

  if (boutonPre && preOverlay && closePre) {

    boutonPre.addEventListener("click", () => {
      preOverlay.classList.remove("hidden");
    });

    closePre.addEventListener("click", () => {
      preOverlay.classList.add("hidden");
    });

    preOverlay.addEventListener("click", (e) => {
      if (e.target === preOverlay) {
        preOverlay.classList.add("hidden");
      }
    });
  } else {
    console.log("Préambule : éléments introuvables");
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

}); // FIN DOMContentLoaded