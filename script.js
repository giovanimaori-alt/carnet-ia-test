/* ================================
   CARNET D'AVENTURE — SCRIPT BASE
   ================================ */

window.addEventListener("DOMContentLoaded", () => {

  /* --- DOM ELEMENTS --- */
  const chat = document.getElementById("chat");
  const input = document.getElementById("input");
  const send = document.getElementById("send");
  const resetBtn = document.getElementById("resetChat");
  const menuBtn = document.getElementById("menuBtn");
  const sidePanel = document.getElementById("sidePanel");

  console.log("JS chargé + DOM prêt");

  /* =====================
     PANNEAU LATERAL
     ===================== */

  if (menuBtn && sidePanel) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      sidePanel.classList.toggle("open");
    });

    document.addEventListener("click", (e) => {
      const clickDansPanel = sidePanel.contains(e.target);
      const clickSurMenu   = menuBtn.contains(e.target);

      if (!clickDansPanel && !clickSurMenu) {
        sidePanel.classList.remove("open");
      }
    });
  } else {
    console.log("ERREUR : menuBtn OU sidePanel introuvable");
  }

  /* =====================
     RESET CHAT
     ===================== */
  resetBtn?.addEventListener("click", () => {
    chat.innerHTML = "";
  });

  /* =====================
     DEBUG
     ===================== */
  document.body.insertAdjacentHTML(
    "beforeend",
    `<div style="
      position:fixed;
      bottom:5px;
      left:5px;
      background:#000;
      color:#fff;
      padding:4px 8px;
      font-size:10px;
      z-index:9999;">
      JS OK (DOM READY)
    </div>`
  );
});