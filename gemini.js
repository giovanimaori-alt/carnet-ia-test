/* SCRIPT Gemini — Markdown complet + safe + style carnet */

const API_KEY = "AIzaSyAOSPp84UoD5V6ZkC6OWFZTRc4PnLkiOt4";

const chat  = document.getElementById("chat");
const input = document.getElementById("input");
const send  = document.getElementById("send");

/* ---------------------------------------------------------
   SANITIZE + RENDER MARKDOWN → HTML
--------------------------------------------------------- */
function renderMarkdown(text) {

  // 1. Neutralise le HTML
  let safe = String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // 2. Titres (ordre décroissant)
  safe = safe.replace(/^### (.*)$/gm, "<h3 class='font-semibold text-lg my-2'>$1</h3>");
  safe = safe.replace(/^## (.*)$/gm, "<h2 class='font-semibold text-xl my-3'>$1</h2>");
  safe = safe.replace(/^# (.*)$/gm, "<h1 class='font-bold text-2xl my-4'>$1</h1>");

  // 3. Citations
  safe = safe.replace(/^> (.*)$/gm,
    "<div class='border-l-4 border-amber-600 pl-3 italic text-gray-700 my-2'>$1</div>"
  );

  // 4. Listes
  safe = safe.replace(/^[-*] (.*)$/gm,
    "<li class='ml-4 list-disc'>$1</li>"
  );

  // entoure les <li> d’un <ul> (détection simple)
  safe = safe.replace(/(<li[\s\S]*?<\/li>)/gm,
    "<ul class='my-2'>$1</ul>"
  );

  // 5. Gras
  safe = safe.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // 6. Italique
  safe = safe.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // 7. Sauts de ligne
  safe = safe.replace(/\n/g, "<br>");

  return safe;
}

/* ---------------------------------------------------------
   AFFICHAGE DES BULLES
--------------------------------------------------------- */
function appendBubble(text, who = "ia", loaderId = null) {
  const htmlText = renderMarkdown(text);

  const html =
    who === "user"
      ? `<div class="flex justify-end">
           <div class="px-4 py-2 rounded-xl max-w-[75%] text-white bg-blue-600">
             ${htmlText}
           </div>
         </div>`
      : `<div class="flex">
           <div class="px-4 py-2 rounded-xl w-full mx-2 bg-gray-200 text-gray-800">
             ${htmlText}
           </div>
         </div>`;

  if (loaderId) {
    const el = document.getElementById(loaderId);
    if (el) el.outerHTML = html;
    else chat.innerHTML += html;
  } else {
    chat.innerHTML += html;
  }

  chat.scrollTop = chat.scrollHeight;
}

/* ---------------------------------------------------------
   GEMINI API
--------------------------------------------------------- */
async function callGeminiOfficial(prompt) {
  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

  const payload = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ]
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-goog-api-key": API_KEY
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok)
    throw new Error("HTTP " + res.status + " — " + (await res.text()));

  return res.json();
}

function extractText(data) {
  try {
    const parts = data.candidates?.[0]?.content?.parts;
    if (Array.isArray(parts) && parts.length > 0) {
      return parts.map((p) => p.text).join("\n").trim();
    }
    return "(pas de texte)";
  } catch {
    return "(erreur d’extraction)";
  }
}

/* ---------------------------------------------------------
   ENVOI MESSAGE
--------------------------------------------------------- */
send.addEventListener("click", async () => {
  const text = input.value.trim();
  if (!text) return;
  input.value = "";

  appendBubble(text, "user");

  const loaderId = "ldr-" + Date.now();
  chat.innerHTML += `
    <div id="${loaderId}" class="flex items-start gap-2">
      <div class="w-8 h-8 rounded-full" style="background:#d8cfc2;"></div>
      <div class="bg-gray-200 text-gray-800 px-4 py-2 rounded-xl max-w-[75%]">...</div>
    </div>`;
  chat.scrollTop = chat.scrollHeight;

  try {
    const data = await callGeminiOfficial(text);
    appendBubble(extractText(data), "ia", loaderId);
  } catch (err) {
    appendBubble("Erreur : " + (err.message || "échec"), "ia", loaderId);
  }
});

/* Entrée = envoyer */
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    send.click();
  }
});

/* RESET */
document.getElementById("resetChat").addEventListener("click", () => {
  chat.innerHTML = "";
});