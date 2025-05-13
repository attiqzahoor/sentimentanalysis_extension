let selectedText = '';
let selectedLanguage = '';
let languageMenu = null;

// Jab user text select kare
document.addEventListener('mouseup', (e) => {
  const text = window.getSelection().toString().trim();
  if (text.length > 2) {
    selectedText = text;
    showLanguageMenu(e);
  }
});

function showLanguageMenu(e) {
  removeOldMenu();

  languageMenu = document.createElement('div');
  languageMenu.id = 'translator-menu';
  languageMenu.innerHTML = `
    <select id="translator-lang">
      <option value="">Select Language</option>
      <option value="ur">اردو</option>
      <option value="hi">हिन्दी</option>
      <option value="ar">العربية</option>
      <option value="en">English</option>
      <option value="es">Español</option>
      <option value="fr">Français</option>
    </select>
    <button id="translate-btn">Translate</button>
  `;

  positionElement(languageMenu, e);
  document.body.appendChild(languageMenu);

  // Menu ya elements par koi bhi event ho to bubble na ho
  ['mousedown', 'mouseup', 'click'].forEach(eventName => {
    languageMenu.addEventListener(eventName, e => e.stopPropagation());
    document.getElementById('translator-lang').addEventListener(eventName, e => e.stopPropagation());
    document.getElementById('translate-btn').addEventListener(eventName, e => e.stopPropagation());
  });

  document.getElementById('translate-btn').addEventListener('click', async () => {
    const lang = document.getElementById('translator-lang').value;
    if (lang) {
      selectedLanguage = lang;
      const translatedText = await translateWithLibre(selectedText, lang);
      showTranslationPopup(translatedText, languageMenu.getBoundingClientRect());
      removeOldMenu();
    }
  });

  // Thodi der baad outside click close enable karo
  setTimeout(() => {
    document.addEventListener('click', closeMenuOnClickOutside);
  }, 100);
}

function closeMenuOnClickOutside(e) {
  if (languageMenu && !languageMenu.contains(e.target)) {
    removeOldMenu();
    document.removeEventListener('click', closeMenuOnClickOutside);
  }
}

async function translateWithLibre(text, lang) {
  try {
    const response = await fetch('https://libretranslate.de/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text,
        source: 'auto',
        target: lang
      })
    });
    const data = await response.json();
    return data.translatedText || "Translation failed!";
  } catch (error) {
    return "Error: Could not connect to translator.";
  }
}

function showTranslationPopup(text, pos) {
  removeOldMenu();

  const popup = document.createElement('div');
  popup.id = 'translation-result';
  popup.textContent = text;

  popup.style.position = 'absolute';
  popup.style.top = `${pos.bottom + 5}px`;
  popup.style.left = `${pos.left}px`;
  popup.style.zIndex = '999999';
  popup.style.background = '#fff';
  popup.style.padding = '8px 12px';
  popup.style.border = '1px solid #ddd';
  popup.style.borderRadius = '6px';
  popup.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
  popup.style.maxWidth = '300px';

  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 5000);
}

function positionElement(el, e) {
  el.style.position = 'absolute';
  el.style.top = `${e.pageY + 10}px`;
  el.style.left = `${e.pageX + 10}px`;
  el.style.zIndex = '999999';
  el.style.background = '#fff';
  el.style.padding = '8px';
  el.style.borderRadius = '6px';
  el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
  el.style.display = 'flex';
  el.style.gap = '8px';
  el.style.alignItems = 'center';
}

function removeOldMenu() {
  if (languageMenu) {
    languageMenu.remove();
    languageMenu = null;
  }

  const oldPopup = document.getElementById('translation-result');
  if (oldPopup) oldPopup.remove();

  document.removeEventListener('click', closeMenuOnClickOutside);
}
