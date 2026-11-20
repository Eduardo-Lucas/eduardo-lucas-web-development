/* Clínica Viva — filtro de especialidades e galeria com ampliação */

/* Filtro de especialidades */
const grid = document.querySelector("[data-spec-grid]");
if (grid) {
  const chips = document.querySelectorAll("[data-filter]");
  const counter = document.querySelector("[data-spec-count]");
  chips.forEach((chip) => chip.addEventListener("click", () => {
    const filter = chip.dataset.filter;
    chips.forEach((c) => {
      const active = c === chip;
      c.classList.toggle("is-active", active);
      c.setAttribute("aria-pressed", String(active));
    });
    let visible = 0;
    grid.querySelectorAll("[data-category]").forEach((card) => {
      const show = filter === "all" || card.dataset.category === filter;
      card.hidden = !show;
      if (show) visible += 1;
    });
    counter.textContent = visible;
  }));
}

/* Galeria: abre o ambiente ampliado em um <dialog> */
const dialog = document.querySelector("[data-lightbox-dialog]");
if (dialog) {
  const body = dialog.querySelector("[data-lightbox-body]");
  document.querySelectorAll("[data-lightbox]").forEach((button) => {
    button.addEventListener("click", () => {
      const figure = button.closest("figure");
      body.innerHTML = "";
      const art = button.cloneNode(true);
      art.removeAttribute("data-lightbox");
      art.removeAttribute("aria-label");
      art.removeAttribute("data-i18n-attr");
      art.tabIndex = -1;
      art.className = `${figure.className.replace("is-visible", "")} cv-lightbox-art`;
      body.append(art, figure.querySelector("figcaption").cloneNode(true));
      dialog.showModal();
    });
  });
  dialog.querySelector("[data-lightbox-close]").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
}
