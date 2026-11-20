# Eduardo Lucas Web Development

Portfólio estático, responsivo e bilíngue (PT/EN), com três projetos demonstrativos completos. Sem build, sem dependências: HTML, CSS e JavaScript puros.

## Estrutura

```
index.html, styles.css, script.js   Página principal do portfólio
i18n.js                             Sistema de idiomas compartilhado (PT/EN, lembra a escolha entre páginas)
config.js                           E-mail e WhatsApp de contato
fonts/                              Fontes hospedadas no próprio site (Manrope, DM Sans, Cormorant Garamond — SIL OFL)
favicon.svg, og-image.png           Ícone e imagem de prévia para WhatsApp/redes sociais
projects/
  demo.css, demo.js                 Barra "projeto conceitual", botão "Quero um site assim", menu, formulários demo
  advocacia/                        01 · Landing Page (R$ 990) — página única
  clinica/                          02 · Site institucional (R$ 1.790) — 5 páginas
  consultoria/                      03 · Site personalizado (R$ 2.990) — 5 páginas + diagnóstico interativo
```

Cada projeto tem seu `i18n.js` com **todos os textos em PT e EN**. Para mudar um texto, edite esse arquivo (o HTML traz o português apenas como fallback para quem estiver sem JavaScript).

## Os três projetos

| Projeto | Pacote | Destaques técnicos |
|---|---|---|
| **Almeida Advocacia** | Landing Page | Âncoras com rolagem suave, FAQ com `<details>` (sem JS), mapa, conteúdo sem preços nem promessas de resultado (Provimento 205/2021 da OAB) |
| **Clínica Viva** | Site institucional | 5 páginas, filtro de especialidades, galeria com ampliação (`<dialog>`), formulário de agendamento, rodapé com responsável técnico (Resolução CFM 2.336/2023) |
| **Nexo Consultoria** | Site personalizado | Diagnóstico de maturidade em 6 perguntas com resultado e recomendação, abas acessíveis com link direto (`solucoes.html#gestao`), contadores e animações de entrada |

Comum a todos: PT/EN, menu mobile, `noindex` (para os negócios fictícios não aparecerem no Google), respeito a `prefers-reduced-motion` e o botão **"Quero um site assim"**, que abre o seu WhatsApp com a mensagem "Vi o modelo X no seu portfólio…". Os formulários dos projetos são demonstrativos e não enviam nada.

## Executar localmente

```bash
uv run python -m http.server 8000
```

Acesse `http://localhost:8000`.

## Formulário do portfólio

Usa **Netlify Forms**: ao publicar no Netlify, as mensagens aparecem no painel em *Forms → contact* (ative as notificações por e-mail lá). Fora do Netlify, incluindo o servidor local, o envio falha e o formulário abre o aplicativo de e-mail do visitante como alternativa. O campo oculto `bot-field` filtra spam.

## Publicação

Endereço: **https://web.eduardo-lucas-dev.com** (já configurado em `index.html`, `robots.txt` e `sitemap.xml`; para mudar, troque nesses três arquivos).

1. No Netlify: *Add new site → Import an existing project → GitHub* → este repositório. Não há comando de build; `netlify.toml` já define a pasta.
2. *Domain management → Add a domain* → `web.eduardo-lucas-dev.com`.
3. No DNS do domínio, crie um registro `CNAME` de `web` apontando para `<nome-do-site>.netlify.app`. O HTTPS é emitido automaticamente.
4. *Forms* → ative a detecção de formulários e a notificação por e-mail.
5. Teste o formulário e cole o link no WhatsApp para conferir a prévia.

## Observações

Os três projetos são conceitos fictícios: marcas, profissionais, registros (OAB, CRM, CRP, CRN), endereços, convênios e números são ilustrativos e estão identificados como tal nas páginas.
