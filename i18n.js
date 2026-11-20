/*
  i18n compartilhado — portfólio e projetos demonstrativos.

  Uso:
    I18N.add({ pt: { chave: "texto" }, en: { chave: "text" } });

  Marcação:
    data-i18n="chave"                         -> innerHTML
    data-i18n-attr="placeholder:chave;aria-label:outra"  -> atributos
    data-lang-toggle                          -> botão que alterna PT/EN

  O idioma vem de ?lang=pt|en, depois do localStorage e, por fim, PT.
  A escolha é mantida ao navegar entre as páginas.
*/
(() => {
  const STORAGE_KEY = "el-lang";
  const SUPPORTED = ["pt", "en"];
  const dict = { pt: {}, en: {} };
  const listeners = [];

  const readStored = () => {
    try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
  };
  const store = (lang) => {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* modo privado */ }
  };

  const fromQuery = new URLSearchParams(location.search).get("lang");
  let current = [fromQuery, readStored()].find((l) => SUPPORTED.includes(l)) || "pt";
  if (fromQuery === current) store(current);

  const t = (key) => dict[current][key] ?? dict.pt[key] ?? key;

  function apply() {
    document.documentElement.lang = current === "pt" ? "pt-BR" : "en";
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const value = dict[current][el.dataset.i18n];
      if (value != null) el.innerHTML = value;
    });
    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      el.dataset.i18nAttr.split(";").forEach((pair) => {
        const [attr, key] = pair.split(":").map((s) => s.trim());
        const value = dict[current][key];
        if (attr && value != null) el.setAttribute(attr, value);
      });
    });
    document.querySelectorAll("[data-lang-toggle]").forEach((btn) => {
      btn.textContent = current === "pt" ? "EN" : "PT";
      btn.setAttribute("aria-label", current === "pt" ? "Switch to English" : "Mudar para português");
    });
    listeners.forEach((fn) => fn(current));
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-lang-toggle]")) I18N.set(current === "pt" ? "en" : "pt");
  });

  window.I18N = {
    add(extra) {
      SUPPORTED.forEach((lang) => Object.assign(dict[lang], extra[lang] || {}));
      apply();
    },
    set(lang) {
      if (!SUPPORTED.includes(lang)) return;
      current = lang;
      store(lang);
      apply();
    },
    t,
    get lang() { return current; },
    onChange(fn) { listeners.push(fn); },
  };
})();
