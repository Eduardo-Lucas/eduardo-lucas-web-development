/*
  CONFIGURAÇÃO DO PORTFÓLIO
  Contatos usados no formulário (fallback por e-mail) e nos botões de WhatsApp.
*/
window.SITE_CONFIG = {
  contactEmail: "eduardolucas40@gmail.com",
  whatsappNumber: "5571991182592", // código do país + DDD + número, somente dígitos
};

/* Monta um link do WhatsApp com mensagem pré-preenchida. */
window.whatsappLink = (message) =>
  `https://wa.me/${window.SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
