/*
  Recursos compartilhados pelos projetos demonstrativos:
  barra "projeto conceitual", botão "Quero um site assim" (WhatsApp do Eduardo),
  menu mobile, formulários demonstrativos, animações de entrada e ano no rodapé.
  Cada página define <body data-demo="Nome do projeto">.
*/
(() => {
  const demoName = document.body.dataset.demo || "";

  I18N.add({
    pt: {
      demoBar: "Projeto conceitual fictício · <b>Eduardo Lucas Web Development</b>",
      demoBack: "← Voltar ao portfólio",
      demoWant: "Quero um site assim",
      demoFormMsg: "Formulário demonstrativo: nenhum dado foi enviado ou armazenado.",
      demoMenu: "Abrir menu",
      demoFictional: "Dados ilustrativos",
      demoClose: "Fechar",
    },
    en: {
      demoBar: "Fictional concept project · <b>Eduardo Lucas Web Development</b>",
      demoBack: "← Back to portfolio",
      demoWant: "I want a site like this",
      demoFormMsg: "Demo form: no data was sent or stored.",
      demoMenu: "Open menu",
      demoFictional: "Illustrative data",
      demoClose: "Close",
    },
  });

  /* Ícone do WhatsApp (sprite inline, funciona também via file://) */
  document.body.insertAdjacentHTML("beforeend", `
    <svg width="0" height="0" style="position:absolute" aria-hidden="true"><symbol id="icon-whatsapp" viewBox="0 0 24 24"><path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.24 8.24 0 1 1 7 3.86Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06a6.7 6.7 0 0 1-1.99-1.23 7.5 7.5 0 0 1-1.38-1.72c-.14-.25 0-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48a.92.92 0 0 0-.67.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z"/></symbol></svg>
    <a class="demo-float" data-demo-whatsapp href="#" target="_blank" rel="noopener">
      <svg aria-hidden="true" viewBox="0 0 24 24"><use href="#icon-whatsapp"/></svg>
      <span data-i18n="demoWant">Quero um site assim</span>
    </a>`);

  const whatsappMessage = () => I18N.lang === "pt"
    ? `Olá, Eduardo! Vi o modelo "${demoName}" no seu portfólio e quero um site parecido.`
    : `Hi Eduardo! I saw the "${demoName}" concept in your portfolio and would like a similar website.`;

  const refreshWhatsapp = () => document.querySelectorAll("[data-demo-whatsapp]")
    .forEach((a) => { a.href = window.whatsappLink(whatsappMessage()); });

  I18N.onChange(refreshWhatsapp);
  I18N.add({}); // reaplica traduções após inserir o botão
  refreshWhatsapp();

  /* Menu mobile */
  const toggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }));
  }

  /* Formulários demonstrativos: não enviam nada */
  document.querySelectorAll("[data-demo-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      form.reset();
      const msg = form.querySelector("[data-demo-form-msg]");
      if (msg) msg.textContent = I18N.t("demoFormMsg");
    });
  });

  /* Animações de entrada (respeita prefers-reduced-motion) */
  const revealItems = document.querySelectorAll("[data-reveal]");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((el) => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15 });
    revealItems.forEach((el) => observer.observe(el));
  }

  document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
