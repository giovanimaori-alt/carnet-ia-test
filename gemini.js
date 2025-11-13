/* SCRIPT Gemini */

const API_KEY = "AIzaSyAOSPp84UoD5V6ZkC6OWFZTRc4PnLkiOt4";

const chat = document.getElementById("chat");
const input = document.getElementById("input");
const send = document.getElementById("send");

function esc(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* BUBBLE (IA = full width) */
function appendBubble(text, who = "ia", loaderId = null) {
  const safe = esc(text);

  const html =
    who === "user"
      ? `<div class="flex justify-end">
           <div class="bg-blue-600 text-white px-4 py-2 rounded-xl max-w-[75%]">
             ${safe}
           </div>
         </div>`
      : `<div class="flex">
           <div class="bg-gray-200 text-gray-800 px-4 py-2 rounded-xl w-full mx-2">
             ${safe}
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

/* GEMINI */
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
    throw new Error(
      "HTTP " + res.status + " — " + (await res.text())
    );

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

/* SEND */
send.addEventListener("click", async () => {
  const text = input.value.trim();
  if (!text) return;
  input.value = "";

  appendBubble(text, "user");

  const loaderId = "ldr-" + Date.now();
  chat.innerHTML += `
    <div id="${loaderId}" class="flex items-start gap-2">
      <div class="w-8 h-8 bg-gray-300 rounded-full"></div>
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

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    send.click();
  }
});

document.getElementById("resetChat").addEventListener("click", () => {
  chat.innerHTML = "";
});