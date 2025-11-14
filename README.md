| DOCUMENT TECHNIQUE – CARNET D’AVENTURE (V.0.1) |
|-----------------------------------------------|
| **1. ARCHITECTURE GÉNÉRALE** |
| Le projet repose sur une structure très simple, adaptée à GitHub Pages et à un usage mobile (iPhone) : tout est servi en statique, sans backend. L’application est composée de 4 fichiers principaux à la racine et d’un sous-dossier pour la documentation. |
| **Arborescence actuelle :** |
| /  (racine du dépôt) |
| ├─ index.html  → structure du carnet + panneau latéral + modal préambule |
| ├─ style.css   → thème « carnet relié », couleurs, typographies, panneau, modal |
| ├─ script.js   → comportements UI (panneau latéral, préambule, reset, badge, full) |
| ├─ gemini.js   → logique d’appel à l’API Gemini + affichage des bulles chat |
| └─ /doc        → dossier documentation (contenus HTML externes) |
|    └─ preambule.html → texte du préambule d’intention, en mise en page HTML |
| **Tout le fonctionnement repose sur ces fichiers, aucune autre dépendance locale.** |
| **2. TECHNOLOGIES UTILISÉES** |
| • **HTML5** : structure de la page, composants (header, boutons, modal, etc.). |
| • **CSS3 + Tailwind CDN** : Tailwind pour les classes utilitaires (flex, spacing, couleurs, layout) et style.css pour tout le thème « carnet d’aventure » (reliure, papiers, typographies, panneau, modal). |
| • **JavaScript Vanilla (ES6+)** : aucune librairie externe côté JS. Tout est en pur JS : gestion du DOM, des événements, des classes CSS, fetch du préambule, etc. |
| • **Fetch API** : pour charger le fichier doc/preambule.html dans la modal. |
| • **API Google Gemini (v1beta / gemini-2.0-flash)** : appels HTTP POST, clé d’API en dur dans gemini.js (à protéger plus tard). |
| • **GitHub Pages** : hébergement statique, avec propagation parfois lente du cache (d’où le badge de version JS affiché en bas de page). |
| **3. RÔLE DE CHAQUE FICHIER** |
| **index.html** |
| • Contient : le panneau latéral (Menu), le carnet (chat + onglets), la modal Préambule, le footer, et les deux balises `<script>` qui importent gemini.js puis script.js. |
| • C’est le cœur de l’interface. Toute modification de structure (ajout de boutons, changement d’ID, ajout de blocs) doit être cohérente avec script.js et gemini.js. |
| **style.css** |
| • Gère tout le style « carnet papier » : fond texturé, reliure, bordures dorées, couleurs chaudes, typographies manuscrites (Shadows Into Light, Patrick Hand SC), etc. |
| • Ajoute les règles pour le panneau latéral (#sidePanel), les boutons .panel-btn, la modal du préambule (#preModalOverlay, #preModal), et éventuellement les styles du badge de version (#versionBadge, si défini). |
| **script.js** |
| • Script d’interface principal, exécuté au `DOMContentLoaded` pour garantir que tous les éléments HTML existent avant d’attacher les événements. |
| • Gère : le panneau latéral, le bouton Préambule, le chargement du préambule, le bouton Reset, le badge de version JS, et le pseudo plein écran (si utilisé). |
| **gemini.js** |
| • Contient la logique de chat IA : fonctions d’échappement (esc), création des bulles (appendBubble), appel API (callGeminiOfficial), extraction de texte (extractText), gestion du clic sur « send » et de la touche Enter, gestion du bouton Reset pour vider le chat. |
| • C’est le seul fichier qui parle directement à l’API Gemini. Il ne doit pas être modifié à la légère. |
| **doc/preambule.html** |
| • Contient la mise en page HTML du préambule (titres, paragraphes, gras, listes, etc.). |
| • Ce fichier est chargé dynamiquement par script.js via fetch, dans la `div#preContent` à l’intérieur de la modal. |
| **4. MÉCANIQUES UI – DÉTAIL PAR COMPOSANT** |
| **4.1. Panneau latéral (Menu)** |
| • HTML : `<div id="sidePanel" class="fixed ... -translate-x-full">` + boutons `.panel-btn` à l’intérieur, dont un libellé « Préambule ». |
| • CSS : `#sidePanel` a une transition sur transform, avec un `transform: translateX(-100%)` (ou classe Tailwind `-translate-x-full`) pour l’état caché, et transform nul pour l’état visible. |
| • JS (script.js) : |
|   – Récupération des éléments : `menuBtn` et `sidePanel`. |
|   – Au clic sur `menuBtn` : `sidePanel.classList.toggle("-translate-x-full")` pour ouvrir/fermer. |
|   – Sur `document.addEventListener("click")` : si clic en dehors du panel ET en dehors du bouton, on ajoute la classe `-translate-x-full` pour refermer. |
| • Effet utilisateur : tap sur « ≡ » → panneau glisse depuis la gauche ; tap à côté → panneau se referme. |
| **4.2. Modal Préambule** |
| • HTML : overlay `#preModalOverlay` qui couvre tout l’écran (`fixed inset-0`), avec un `div#preModal` centré contenant un bouton fermer (`#closePreModal`) et la `div#preContent` vide. |
| • CSS : fond semi-transparent noir + blur (`bg-black/40 backdrop-blur-sm`), modal blanche avec shadow, scroll interne limité via `max-h-[90vh]` + `overflow-y-auto`. |
| • JS (script.js) : |
|   – Recherche du bouton "Préambule" dans les .panel-btn par texte : `boutonPre = Array.from(...).find(btn => btn.textContent.trim() === "Préambule");` |
|   – Sur clic du bouton Préambule : |
|     1. Appel de `chargerPreambule()` (fetch du HTML dans /doc/preambule.html). |
|     2. `preOverlay.classList.remove("hidden")` pour afficher la modal. |
|   – Sur clic du bouton close (×) : `preOverlay.classList.add("hidden")`. |
|   – Sur clic dans l’overlay : si `e.target === preOverlay`, on referme aussi la modal. |
| • Effet utilisateur : Menu → Préambule → ouverture d’une grande fenêtre centrée, scrollable, avec un texte propre et lisible. Fermeture par la croix ou en tapant à l’extérieur. |
| **4.3. Chat IA (Gemini)** |
| • HTML : zone de chat `#chat`, textarea `#input`, bouton `#send`, bouton `#resetChat`. |
| • JS (gemini.js) : |
|   – `esc()` échappe les caractères dangereux (&, <, >) avant d’insérer le texte dans le DOM. |
|   – `appendBubble(text, who, loaderId)` : crée les bulles utilisateur (alignées à droite, fond sombre) ou IA (large, fond papier), remplace le loader si `loaderId` est fourni. |
|   – `callGeminiOfficial(prompt)` : envoie un POST à l’endpoint Gemini avec l’API key, récupère la réponse JSON. |
|   – `extractText(data)` : assemble les `parts[].text` en une chaîne lisible. |
|   – Handler `send.addEventListener("click", async () => { ... })` : |
|       1. Récupère le texte du textarea, l’affiche dans une bulle utilisateur. |
|       2. Ajoute une bulle loader `...` avec un id unique. |
|       3. Appelle `callGeminiOfficial`, extrait le texte, remplace le loader par la bulle IA. |
|       4. En cas d’erreur, affiche un message d’erreur IA. |
|   – Handler `input.addEventListener("keydown", ...)` : Enter sans Shift = envoi du message. |
|   – Handler `document.getElementById("resetChat").addEventListener("click", ...)` : vide le contenu `chat.innerHTML = ""`. |
| **4.4. Badge de version JS** |
| • Généré dans script.js à la fin du `DOMContentLoaded`. |
| • But : vérifier visualement que GitHub a bien propagé la dernière version du JS. |
| • Logique : |
|   – `const version = "bêta V.0.x";` dans script.js, modifiable à chaque mise à jour. |
|   – Si aucun élément #versionBadge n’existe, création d’un `<div id="versionBadge">JS bêta V.0.x</div>` et append dans `document.body`. |
| • En production, il peut être stylé via CSS (#versionBadge) pour apparaître dans un coin discret. |
| **4.5. Pseudo plein écran (fullscreenBtn)** |
| • HTML : bouton `#fullscreenBtn` en haut à droite (icône ⛶). |
| • JS (script.js) : (selon version actuelle) : |
|   – Récupère `fullscreenBtn` et éventuellement un conteneur racine `.app-root` (si mis en place). |
|   – Au clic : toggle d’une classe `fullscreen-active` sur le conteneur, changement de l’icône (⛶ ↔ ×). |
| • Ce mode est volontairement « soft » pour rester compatible iPhone (pas d’API Fullscreen). |
| **4.6. Onglets (tabs)** |
| • HTML : 4 onglets sous le header : Carnet (actif), Photo, Terrain, Reset. |
| • Carnet = chat principal ; Photo / Terrain serviront de modes futurs (upload photo, notes terrain…). |
| • Reset = même que le bouton Reset : vide le chat. Pour l’instant, la logique est simple et partagée. |
| **5. IDENTIFIANTS / CLASSES CRITIQUES – À NE PAS RENOMMER** |
| Pour que script.js et gemini.js continuent de fonctionner, les IDs et classes suivants doivent rester inchangés : |
| • `#sidePanel` – panneau latéral. |
| • `#menuBtn` – bouton burger. |
| • `.panel-btn` – boutons à l’intérieur du panneau (dont « Préambule »). |
| • `#preModalOverlay` – overlay de la modal préambule. |
| • `#preModal` – bloc modal central. |
| • `#closePreModal` – croix de fermeture. |
| • `#preContent` – zone où l’on injecte doc/preambule.html. |
| • `#chat` – conteneur des bulles du chat. |
| • `#input` – textarea de saisie. |
| • `#send` – bouton d’envoi. |
| • `#resetChat` – bouton de réinitialisation. |
| • `#fullscreenBtn` – bouton de pseudo plein écran. |
| • `#versionBadge` – badge version JS (injecté par script.js). |
| **6. FLUX DE CHARGEMENT – CE QUI SE PASSE AU RUNTIME** |
| 1) Le navigateur charge index.html (structure) + Tailwind CDN + style.css. |
| 2) Une fois le HTML parsé, gemini.js est chargé, puis script.js. |
| 3) Au `DOMContentLoaded`, script.js : |
|    – Récupère tous les éléments du DOM nécessaires (panel, boutons, overlay, etc.). |
|    – Connecte les événements (click, reset, préambule, etc.). |
|    – Crée le badge de version. |
| 4) À l’ouverture du menu → panneaux latéral glissant. |
| 5) Clic sur Préambule → script.js appelle chargerPreambule() puis affiche la modal avec le contenu HTML. |
| 6) Clic sur Envoyer → gemini.js gère tout le flux de chat avec Gemini et l’affichage des bulles. |
| **7. MISE À JOUR SANS CASSER (PROCÉDURE CONSEILLÉE)** |
| • Toujours travailler avec un **backup complet** (copie de index.html, style.css, script.js, gemini.js, doc/). |
| • Si modification structurelle (ajout/suppression d’éléments dans index.html) : |
|   – Vérifier les IDs / classes utilisés par script.js et gemini.js. |
|   – Ne jamais supprimer un ID sans adapter le JS correspondant. |
| • Si modification de style (style.css seulement) : |
|   – Éviter de toucher aux IDs critiques utilisés pour la logique (sidePanel, preModalOverlay, etc.). |
| • À chaque modification de script.js : |
|   – Incrémenter le numéro de version dans `const version = "bêta V.0.x";`. |
|   – Observer le badge pour s’assurer que GitHub a bien propagé la nouvelle version. |
| **8. POINTS DE VIGILANCE** |
| • **Cache GitHub Pages** : la propagation des nouvelles versions peut prendre du temps ; toujours vérifier avec le badge JS. |
| • **Clé API Gemini** : actuellement en clair dans gemini.js ; à sécuriser plus tard si besoin (proxy, variable d’environnement, etc.). |
| • **Mobile first** : toutes les mécaniques sont pensées pour iPhone ; attention à ne pas introduire de fonctionnalités non supportées (Fullscreen API classique, drag & drop lourd, etc.). |
| • **Erreurs réseau** : si l’API Gemini tombe ou la connexion est mauvaise, gemini.js affiche un message d’erreur simplifié dans le chat. |
| **9. RÉSUMÉ ULTRA COURT (POUR UN NOUVEL ÉCHO)** |
| • Site = **SPA statique** (index.html) + **CSS carnet** (style.css) + **UI JS** (script.js) + **chat Gemini** (gemini.js) + **préambule HTML externe** (doc/preambule.html). |
| • Les mécaniques clés : **panneau latéral**, **modal préambule**, **chat IA**, **reset**, **badge version**, **pseudo plein écran**, **onglets**. |
| • Ne pas renommer les IDs critiques. Toujours vérifier la **version JS** pour suivre les évolutions. |
