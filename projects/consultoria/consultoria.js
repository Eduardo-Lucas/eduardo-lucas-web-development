/* Nexo Consultoria — contadores animados, abas de soluções e diagnóstico interativo */
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Contadores ---------- */
function animateCounter(el) {
  const target = Number(el.dataset.count);
  const { prefix = "", suffix = "" } = el.dataset;
  if (reduceMotion) return;
  const duration = 1400;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - (1 - progress) ** 3;
    el.textContent = `${prefix}${Math.round(target * eased)}${suffix}`;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const counters = document.querySelectorAll("[data-count]");
if (counters.length && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.6 });
  counters.forEach((el) => observer.observe(el));
}

/* ---------- Abas (padrão WAI-ARIA, com suporte a #âncora) ---------- */
const tabs = [...document.querySelectorAll("[data-tab]")];
if (tabs.length) {
  const select = (tab, focus = false) => {
    tabs.forEach((t) => {
      const active = t === tab;
      t.setAttribute("aria-selected", String(active));
      t.tabIndex = active ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !active;
    });
    if (focus) tab.focus();
    history.replaceState(null, "", `#${tab.dataset.tab}`);
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => select(tab));
    tab.addEventListener("keydown", (event) => {
      const moves = { ArrowRight: 1, ArrowLeft: -1 };
      if (event.key in moves) {
        select(tabs[(index + moves[event.key] + tabs.length) % tabs.length], true);
      } else if (event.key === "Home") {
        select(tabs[0], true);
      } else if (event.key === "End") {
        select(tabs[tabs.length - 1], true);
      } else {
        return;
      }
      event.preventDefault();
    });
  });
  const fromHash = tabs.find((t) => `#${t.dataset.tab}` === location.hash);
  if (fromHash) select(fromHash);
}

/* ---------- Diagnóstico ---------- */
const quiz = document.querySelector("[data-quiz]");
if (quiz) {
  const QUESTIONS = 6;
  const OPTIONS = ["a", "b", "c", "d"]; // a = 1 ponto … d = 4 pontos
  const LEVELS = [ // [pontuação máxima, nível, solução recomendada]
    [10, "lv1", { key: "s1", href: "solucoes.html#estrategia" }],
    [15, "lv2", { key: "s2", href: "solucoes.html#gestao" }],
    [20, "lv3", { key: "s3", href: "solucoes.html#processos" }],
    [24, "lv4", { key: "s2", href: "solucoes.html#gestao" }],
  ];
  const t = I18N.t;
  const state = { step: 0, answers: [] };

  const arrow = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  function renderQuestion() {
    const n = state.step + 1;
    const progress = (state.step / QUESTIONS) * 100;
    const options = OPTIONS.map((opt, i) => {
      const chosen = state.answers[state.step] === i + 1;
      return `<button type="button" class="nx-option${chosen ? " is-chosen" : ""}" data-score="${i + 1}">
        <span class="nx-option-key">${opt.toUpperCase()}</span><span>${t(`q${n}${opt}`)}</span></button>`;
    }).join("");
    quiz.innerHTML = `
      <div class="nx-progress" role="progressbar" aria-valuemin="0" aria-valuemax="${QUESTIONS}" aria-valuenow="${state.step}">
        <span style="width:${progress}%"></span></div>
      <div class="nx-quiz-meta"><span>${t("quizQuestion")} ${n} ${t("quizOf")} ${QUESTIONS}</span>
        ${state.step > 0 ? `<button type="button" class="nx-back" data-back>${t("quizBack")}</button>` : ""}</div>
      <h2 class="nx-question" tabindex="-1">${t(`q${n}`)}</h2>
      <div class="nx-options">${options}</div>`;
  }

  function renderResult() {
    const score = state.answers.reduce((sum, value) => sum + value, 0);
    const [, level, solution] = LEVELS.find(([max]) => score <= max);
    const percent = Math.round(((score - QUESTIONS) / (QUESTIONS * 3)) * 100);
    quiz.innerHTML = `
      <div class="nx-result">
        <div class="nx-gauge" style="--p:${percent}" aria-hidden="true"><span>${score}<small>/24</small></span></div>
        <div>
          <span class="nx-eyebrow">${t("resultEyebrow")}</span>
          <h2 class="nx-question" tabindex="-1">${t(level)}</h2>
          <p class="nx-score">${score} ${t("resultScore")} · ${percent}%</p>
          <p>${t(`${level}d`)}</p>
          <p class="nx-reco">${t("recommended")} <a href="${solution.href}">${t(solution.key)} →</a></p>
          <div class="nx-actions">
            <a class="nx-btn" href="contato.html">${t("quizTalk")} ${arrow}</a>
            <button type="button" class="nx-link nx-restart" data-restart>${t("quizRestart")}</button>
          </div>
        </div>
      </div>`;
  }

  function render(moveFocus = false) {
    if (state.step < QUESTIONS) renderQuestion();
    else renderResult();
    if (moveFocus) quiz.querySelector(".nx-question")?.focus();
  }

  quiz.addEventListener("click", (event) => {
    const option = event.target.closest("[data-score]");
    if (option) {
      state.answers[state.step] = Number(option.dataset.score);
      state.step += 1;
      render(true);
    } else if (event.target.closest("[data-back]")) {
      state.step -= 1;
      render(true);
    } else if (event.target.closest("[data-restart]")) {
      state.step = 0;
      state.answers = [];
      render(true);
    }
  });

  I18N.onChange(() => render());
  render();
}
