# Plano de Redesign — Clínica Voe Alto

**Data:** 10/07/2026  
**Base:** `docs/reference-strategy.md` · `docs/design-audit.md` · `design-intelligence-library/`  
**Conceito:** *Acolhimento com estrutura* — humanização fotográfica e ritmo temático (BridgeBio) + organização de conteúdo (Acron), em azul e rosa Voe Alto  
**Escopo:** plano implementável — nenhum código alterado nesta etapa

---

## Direção criativa transversal

O redesign traduz a marca clínica em linguagem visual concreta:

| Tema | Tradução visual |
|------|-----------------|
| **Acolhimento** | Fotografia humana real; tipografia calma; rosa `#ef8cab` como calor de ação; espaços arejados (≥80px entre seções) |
| **Desenvolvimento / trajetória** | Processo em 3–4 passos como caminho (não cards de agência); especialidades agrupadas por eixo de cuidado |
| **Ritmo individual** | Accordion: cada família abre só o que precisa; sem marquee que esconde informação |
| **Conexão** | Deep links WhatsApp categorizados; CTA sempre acessível; copy de orientação ("nós guiamos") |
| **Confiança** | Azul `#1f3d71` em blocos de peso (proposta + CTA final); métricas display verificáveis; fotos reais do espaço e da equipe |
| **Cuidado multidisciplinar** | Lista de especialidades escaneável; equipe por área de cuidado (não grade de serviços) |
| **Apoio às famílias** | Público (criança/adolescente/adulto/família) como filtro nas especialidades, não seção de cards clonados |
| **Crescimento** | Arco narrativo 7 momentos: acolhida → promessa → orientação → confiança → clareza → decisão → base |
| **Formas orgânicas** | Cantos suaves (`rounded-3xl`); temas de superfície com curvas sutis (não blur orbs genéricos); linha conectora do processo em rosa claro |

**Temas de superfície (3, não 6):**

| Token | Uso | Fundo |
|-------|-----|-------|
| `theme-light` | Hero, Specialties, Process, FAQ, Structure | Branco / `#f8f8f8` |
| `theme-warm` | Equipe (calor humano) | Rosa suave `#f1cddb` / 12–18% |
| `theme-deep` | Proposta + CTA final | Azul `#1f3d71` |

**Consolidação de seções: 9 → 7**

| Antes | Depois |
|-------|--------|
| Hero | Hero |
| Trust | **Removida** → conteúdo em Proposta + métricas |
| Specialties | Specialties (lista expansível + filtro de público) |
| Structure | Structure (editorial enxuto) |
| Process | Process (3–4 passos verticais) |
| Team | Team (editorial) |
| Audience | **Fundida** em Specialties (filtros) + linha na Proposta |
| FAQ | FAQ (transição suave) |
| FinalCTA | FinalCTA (deep links, sem chat) |

**Nota sobre referências visuais:** os `analysis.md` descrevem screenshots e vídeos que não estão versionados no repositório da biblioteca. Este plano deriva dos textos de análise e dos padrões extraídos — não de cópia visual direta.

---

## Infraestrutura compartilhada (pré-requisito)

| Item | Descrição | Arquivos prováveis |
|------|-----------|-------------------|
| Hook `useScrollReveal` | IntersectionObserver; `opacity` + `translateY(16px)` → `0`; `once: true` | `src/hooks/useScrollReveal.js` |
| Componente `ScrollReveal` | Wrapper de reveal | `src/components/ui/ScrollReveal.jsx` |
| Tokens de tema | `.theme-light`, `.theme-warm`, `.theme-deep` substituem 6× `.section-atmosphere-*`; remover blur orbs | `src/styles/index.css` |
| Escala tipográfica | 4 níveis: display, title, body, label; 3 opacidades body (`/80`, `/70`, `/55`) | `src/styles/index.css` `@theme` |
| `ImageCard` unificado | Substitui image-top cards de Team/Audience | `src/components/ui/ImageCard.jsx` |
| Ícones compartilhados | Extrair `CheckIcon`, `PinIcon`, `ChatIcon` | `src/components/ui/icons/` |
| Dados de especialidades | Adicionar `group` (eixo) + `audiences[]` (criança/adolescente/adulto/família) | `src/data/specialties.js` |
| Fotografia real | Hero, estrutura, equipe — **bloqueante** para padrões BridgeBio | `public/imagens/` |
| Remover `_legacy/` + `lucide-react` | Código morto odontológico | `src/components/_legacy/`, `package.json` |
| Font single-load | Remover `@import` duplicado em CSS (manter só `index.html`) | `src/styles/index.css` |

---

## Header / Navegação

### Diagnóstico atual

Header sticky com blur funciona bem. Problema: **5 links desalinhados** com 9 seções — Trust, Process, Audience e FAQ são órfãos. CTA "Agendar pelo WhatsApp" some em `< sm`. Logo aponta para `logo-sem-fundo.png` ausente (só SVGs no repo).

### Decisão

**Ajustar**

### Referência selecionada

| Campo | Valor |
|-------|-------|
| **Nome** | BridgeBio + regras da biblioteca |
| **Parte utilizada** | Top bar sóbria; CTA sempre visível; máximo 6 itens |
| **Padrão relacionado** | `navigation.md` → Top bar fixa / princípios |
| **Motivo** | Nav já é limpa; o redesign consolida conteúdo e realinha âncoras — não exige header em zonas |

### Princípio adaptado

- **Navegação:** 5–6 âncoras alinhadas à página consolidada
- **Interação:** CTA WhatsApp visível em todas as larguras (pill compacta em xs)
- **Tratamento visual:** manter sticky + blur; indicador de seção ativa (cor azul + peso)

### Adaptação para a Voe Alto

Nav como **porta de entrada calma** — sem divisores arquitetônicos BridgeBio. Links: Início · Especialidades · Estrutura · Equipe · Contato. "Como funciona" e FAQ acessíveis via scroll (ou link no footer). CTA rosa/azul da marca, não verde WhatsApp.

### Estrutura desktop

```
┌──────────────────────────────────────────────────────────────┐
│ [Logo]     Início · Especialidades · Estrutura · Equipe · Contato   [Agendar] │
└──────────────────────────────────────────────────────────────┘
  h-16 / lg:h-[4.5rem] · max-w 1280px · sticky white/85 blur
```

### Estrutura mobile

- CTA pill "Agendar" **sempre** à esquerda do hamburger (não `hidden sm:`)
- Drawer fullscreen mantido; alvos ≥ 48px
- Logo: usar `logo.svg` / `logo2.svg` até PNG existir

### Movimento

| Campo | Valor |
|-------|-------|
| **Gatilho** | hover links; abertura drawer |
| **Propriedades** | `color` 200ms; drawer `opacity` + `translateX` 280ms |
| **Easing** | `ease-out` |
| **prefers-reduced-motion** | Trocas instantâneas |

### Conteúdo necessário

- **Alterar:** `navLinks` em `clinic.js` (alinhar labels/hrefs)
- **Substituir:** path do logo para SVG existente
- **Manter:** WhatsApp CTA, estrutura sticky

### Arquivos afetados

- `src/components/layout/Header.jsx`
- `src/components/layout/MobileMenu.jsx`
- `src/data/clinic.js`

---

## Hero (`#inicio`)

### Diagnóstico atual

Split texto + imagem com checklist de 4 benefícios e 2 CTAs. Trust pills flutuantes na foto **duplicam** Trust. Blur orbs. Imagem `hero-clinica-voe-alto.jpg` referenciada mas ausente. Headline longa; H1 quase do tamanho do H2 das seções.

### Decisão

**Redesenhar**

### Referência selecionada

| Campo | Valor |
|-------|-------|
| **Nome** | BridgeBio |
| **Parte utilizada** | Hero full-bleed / split assimétrico com mídia humana; motion primário pela mídia |
| **Padrão relacionado** | `heroes.md` → Full-bleed com overlay / Split assimétrico · `motion.md` → Motion primário por mídia de fundo |
| **Motivo** | Humanizar saúde com fotografia de pessoas; uma proposta, um CTA |

### Princípio adaptado

- **Composição:** split ~45/55 texto|foto OU full-bleed com overlay suave (decidir conforme asset)
- **Tipografia:** H1 curto (5–10 palavras); sub carrega contexto; sem checklist longo
- **Ritmo:** above the fold com CTA; padding generoso
- **Movimento:** foto estática (sem vídeo); entrada mínima do texto; sem pills animadas
- **Organização:** 1 CTA primário WhatsApp; secundário "Ver especialidades" (âncora) — Maps migra para Structure/Footer

### Adaptação para a Voe Alto

Foto de **acolhimento real** (criança/família/ambiente da clínica, com direitos). Sem grid exposto BridgeBio (fria demais). Sem trust pills. Headline fala de **cuidado e orientação**, não de lista de features. Rosa no CTA = calor; azul no texto = confiança.

**Copy sugerido:**

- H1: "Cuidado que acompanha cada fase do desenvolvimento"
- Sub: "Atendimento multidisciplinar para crianças, adolescentes, adultos e famílias em Goiânia. Você não precisa saber qual especialista procurar — nós orientamos."
- CTA: "Agendar pelo WhatsApp"

### Estrutura desktop

```
┌──────────────────────────────────────────────────────────────┐
│  Badge: Goiânia                                              │
│  H1 display (max ~10 palavras)                               │
│  Sub (max 34rem)                                             │
│  [CTA WhatsApp rosa/azul]  [link: Ver especialidades ↓]      │
│                                    ┌─────────────────────┐   │
│                                    │  foto humana real   │   │
│                                    │  rounded-3xl        │   │
│                                    │  sem pills          │   │
│                                    └─────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
  grid 2 col · gap 3–4rem · min-h ~70vh · theme-light
```

### Estrutura mobile

- **Ordem:** foto primeiro (40% viewport, aspect 4/5) → texto → CTA full-width
- Motivo: acolhimento visual antes do texto (famílias no celular)
- Remover checklist; Maps fora do hero
- Sem orbs

### Movimento

| Campo | Valor |
|-------|-------|
| **Gatilho** | mount |
| **Estado inicial** | texto `opacity: 0, translateY(20px)` |
| **Estado final** | `opacity: 1, translateY(0)` |
| **Duração** | 500ms total (headline → sub → CTA, stagger 80ms) |
| **Easing** | `ease-out` |
| **prefers-reduced-motion** | Visível imediatamente |

### Conteúdo necessário

- **Alterar copy:** enxugar H1/sub; remover benefits list do hero
- **Criar/substituir mídia:** foto real hero (bloqueante)
- **Remover:** trust pills, blur orbs, segundo CTA Maps
- **Manter:** WhatsApp como conversão principal

### Arquivos afetados

- `src/components/sections/Hero.jsx` (rewrite)
- `src/styles/index.css` (theme-light, remover orbs do hero)
- `public/imagens/hero/` (asset real)
- `src/data/clinic.js` (logo path se afetar)

---

## Proposta (`#proposta`) — nova (absorve Trust)

### Diagnóstico atual

Trust (`#confianca`) = 4 cards numerados 01–04 com ícones — padrão agência, corporativo demais para acolhimento infantil. Copy de confiança pulverizado em Hero + Trust + FinalCTA.

### Decisão

**Substituir** (Trust removida; Proposta criada)

### Referência selecionada

| Campo | Valor |
|-------|-------|
| **Nome** | Acron (bloco editorial) + BridgeBio (métricas) |
| **Parte utilizada** | Parágrafo display full-bleed + faixa de métricas alto contraste |
| **Padrão relacionado** | `sections.md` → Bloco editorial de proposta · Bloco de métricas em alto contraste |
| **Motivo** | Concentra a promessa "nós orientamos"; cria primeiro contraste temático (`theme-deep`) |

### Princípio adaptado

- **Composição:** bloco azul profundo; parágrafo display; métricas em linha abaixo
- **Tipografia:** display 28–40px, texto claro; métricas display + label
- **Ritmo:** padding 80–112px; contraste máximo com hero claro
- **Organização:** 1 ideia + 3 métricas (3 anos · multidisciplinar · infantil/adolescente/adulto)

### Adaptação para a Voe Alto

Azul profundo = **confiança e proteção**. Texto: "Você não precisa saber qual atendimento procurar. Nós ouvimos, orientamos e acompanhamos — no ritmo de cada família." Sem números 01–04. Métricas sem count-up. Sem cards.

### Estrutura desktop

```
┌─ theme-deep ─────────────────────────────────────────────────┐
│  [label: Nossa promessa]                                     │
│  "Você não precisa saber qual atendimento procurar…"         │
│  (display, max-width 40rem)                                  │
│                                                              │
│   3 anos          13+ áreas         Infantil → Adulto        │
│   de cuidado      multidisciplinares  e famílias             │
└──────────────────────────────────────────────────────────────┘
```

### Estrutura mobile

- Display `text-[1.5rem]`; métricas empilhadas com separador rosa suave
- Padding 64px; texto left-aligned

### Movimento

| Campo | Valor |
|-------|-------|
| **Gatilho** | IntersectionObserver 0.2 |
| **Estado inicial** | `opacity: 0, translateY(20px)` |
| **Estado final** | `opacity: 1, translateY(0)` |
| **Duração** | 600–700ms |
| **Easing** | `ease-out` |
| **prefers-reduced-motion** | Estático |

### Conteúdo necessário

- **Alterar copy:** manifesto único a partir de Trust + Hero
- **Incluir dados:** métricas verificáveis
- **Remover seção:** `Trust.jsx` do `App.jsx`
- **Manter:** essência dos 4 pilares (experiência, equipe, humanização, ambiente) no parágrafo

### Arquivos afetados

- `src/components/sections/Proposal.jsx` (novo)
- `src/components/sections/Trust.jsx` (remover do App; depois deletar)
- `src/components/ui/MetricsStrip.jsx` (novo)
- `src/App.jsx`
- `src/styles/index.css` (`.theme-deep`)

---

## Especialidades (`#especialidades`)

### Diagnóstico atual

Marquee infinito de 13 cards com temas azul/branco alternados — esconde informação, cansa, parece e-commerce. Quem procura "fono" ou "ABA" precisa esperar o card passar. JS `requestAnimationFrame` complexo. Única seção com reduced-motion hoje.

### Decisão

**Redesenhar** *(prioridade 2 — maior ganho de experiência)*

### Referência selecionada

| Campo | Valor |
|-------|-------|
| **Nome** | Acron Energy Upgrades |
| **Parte utilizada** | Accordion técnico (sem números monumentais) + hover com expansão de gap |
| **Padrão relacionado** | `sections.md` → Accordion técnico numerado (adaptado) · `motion.md` → Hover com expansão de gap |
| **Motivo** | Informação escaneável; orientação sob demanda; microinteração distintiva sem frieza B2B |

### Princípio adaptado

- **Organização:** lista vertical agrupada por eixo (Aprendizagem · Intervenção · Comunicação · Saúde · Acolhimento · Autonomia…) **ou** filtro por público (Crianças / Adolescentes / Adultos / Famílias) — absorve Audience
- **Interação:** expandir item → descrição + CTA WhatsApp "Falar sobre [especialidade]"
- **Composição:** bordas horizontais; inicial ou ícone suave (não círculo tracejado Acron)
- **Movimento:** gap hover desktop; height transition 250ms

### Adaptação para a Voe Alto

Lista = **orientação clínica** — a seção trabalha como a clínica: escuta a dúvida, abre o caminho. Filtros de público respondem "é para o meu filho?". Sem marquee. Sem cards coloridos alternados. Rosa no CTA do item expandido.

**Agrupamento sugerido (eixos):**

1. Aprendizagem e neurodesenvolvimento  
2. Psicologia e comportamento  
3. Comunicação e linguagem  
4. Saúde e avaliação  
5. Acolhimento familiar e autonomia  

### Estrutura desktop

```
┌─ Especialidades ─────────────────────────────────────────────┐
│  SectionTitle                                                │
│  [Filtros: Todos | Crianças | Adolescentes | Adultos | Famílias] │
│                                                              │
│  Aprendizagem ─────────────────────────────────────────────  │
│  ○ Neuropsicopedagogia                              +        │
│  ○ Psicopedagogia                                   +        │
│  Intervenção ─────────────────────────────────────────────  │
│  ○ Terapia ABA                                      +        │
│  …                                                           │
│  [expandido: descrição + "Falar sobre este atendimento →"]   │
└──────────────────────────────────────────────────────────────┘
  max-width editorial ~720–800px centrado OU full container
```

### Estrutura mobile

- Filtros em scroll horizontal (chips), sticky sob o header
- Accordion full-width; alvos 48px; **sem** gap hover (só tap)
- Um item aberto por vez
- Remover todo o código de marquee

### Movimento

| Campo | Valor |
|-------|-------|
| **Gatilho** | click/tap expand; hover desktop |
| **Expand** | `grid-template-rows: 0fr → 1fr`, 250ms `ease-in-out` |
| **Hover gap** | `gap` 0.75rem → 1.5rem, 200ms (desktop only) |
| **prefers-reduced-motion** | Toggle instantâneo; sem gap |

### Conteúdo necessário

- **Reorganizar especialidades:** adicionar `group` + `audiences[]` em `specialties.js`
- **Manter:** títulos, descriptions, mensagens WhatsApp existentes
- **Fundir Audience:** tags de público viram filtros
- **Remover:** marquee CSS/JS, SpecialtyCard themes

### Arquivos afetados

- `src/components/sections/Specialties.jsx` (rewrite completo)
- `src/components/ui/SpecialtyAccordion.jsx` (novo)
- `src/components/ui/AudienceFilter.jsx` (novo)
- `src/data/specialties.js`
- `src/styles/index.css` (remover `.specialties-marquee*`)
- `src/App.jsx` (remover Audience)

---

## Processo (`#como-funciona`)

### Diagnóstico atual

5 cards em `lg:grid-cols-5` — espremidos em laptop, genéricos. Copy bom, mas layout de "onboarding SaaS". Duplica a promessa de orientação já presente em outras seções.

### Decisão

**Ajustar** *(prioridade 3)*

### Referência selecionada

| Campo | Valor |
|-------|-------|
| **Nome** | Regras da biblioteca |
| **Parte utilizada** | Sequência de passos com conectores |
| **Padrão relacionado** | `sections.md` → Como funciona / passos |
| **Motivo** | Fluxo real cabe em 3–4 passos; vertical resolve mobile e desktop |

### Princípio adaptado

- **Composição:** timeline vertical com linha rosa e nós azuis (desktop = mobile)
- **Organização:** 4 passos: Contato → Escuta → Orientação → Acompanhamento (fundir "Agende" + "Acompanhe" se necessário)
- **Ritmo:** seção compacta; CTA único ao final

### Adaptação para a Voe Alto

Timeline = **trajetória de cuidado**, não funil de vendas. Linha orgânica (rosa claro) conecta passos. Copy curto, tom de acolhimento. Sem cards elevated com hover lift.

**Passos sugeridos (4):**

1. Entre em contato  
2. Conte sua necessidade  
3. Receba orientação  
4. Comece o acompanhamento  

### Estrutura desktop

```
  ●── Contato
  │
  ●── Escuta
  │
  ●── Orientação
  │
  ●── Acompanhamento

  [Falar com a equipe]
```

Max-width ~36rem centrado; linha à esquerda.

### Estrutura mobile

- Mesma estrutura vertical (não forçar horizontal)
- Nós 44×44px; texto à direita
- CTA full-width

### Movimento

| Campo | Valor |
|-------|-------|
| **Gatilho** | scroll reveal |
| **Estado inicial** | passos `opacity: 0, translateY(12px)` |
| **Stagger** | 80ms |
| **Duração** | 400ms cada |
| **prefers-reduced-motion** | Estático |

### Conteúdo necessário

- **Alterar copy:** reduzir de 5 para 4 passos; enxugar descriptions
- **Manter:** mensagem WhatsApp de processo
- **Remover:** grid 5 colunas, Card hover

### Arquivos afetados

- `src/components/sections/Process.jsx` (rewrite)
- `src/data/process.js` (novo, opcional)
- `src/styles/index.css` (`.process-timeline`)

---

## Estrutura (`#estrutura`)

### Diagnóstico atual

Bento gallery + banner + 3 highlight cards. Imagens ausentes (alts dizem "ilustrativo"). Complexidade visual alta para pouco conteúdo real. Highlights genéricos.

### Decisão

**Ajustar** *(prioridade 4a)*

### Referência selecionada

| Campo | Valor |
|-------|-------|
| **Nome** | BridgeBio |
| **Parte utilizada** | Feature alternada lateral — pares imagem/texto |
| **Padrão relacionado** | `sections.md` → Feature alternada lateral |
| **Motivo** | Menos moldura, mais ambiente; fotos reais bem legendadas > bento genérico |

### Princípio adaptado

- **Composição:** 1 foto hero do espaço + 1–2 pares imagem/texto alternados
- **Organização:** legendas carregam "Acolher / Envolver / Capacitar" (conteúdo atual das gallery items)
- **Remover:** 3 highlight cards (virar legendas ou bullets sob a foto)

### Adaptação para a Voe Alto

Fotos do **espaço físico** transmitem segurança às famílias. Tema `theme-light`. CTA Maps aqui (saiu do hero). Formas orgânicas: `rounded-3xl`, sem bento assimétrico forçado.

### Estrutura desktop

```
┌─ Estrutura ──────────────────────────────────────────────────┐
│  SectionTitle                                                │
│  [foto hero fachada/recepção — full width, aspect 21/9]      │
│                                                              │
│  [foto sala]  |  texto: espaços pensados para…               │
│  texto: …     |  [foto multidisciplinar]   (alternado)       │
│                                                              │
│  [Ver no Google Maps]                                        │
└──────────────────────────────────────────────────────────────┘
```

### Estrutura mobile

- Foto hero aspect 4/3
- Pares: foto → texto (sempre nessa ordem — ambiente antes da descrição)
- Maps CTA full-width

### Movimento

| Campo | Valor |
|-------|-------|
| **Gatilho** | scroll reveal |
| **Estado inicial** | imagens `opacity: 0, translateY(16px)` |
| **Duração** | 600ms |
| **prefers-reduced-motion** | Estático |

### Conteúdo necessário

- **Criar/substituir mídia:** fotos reais da clínica (bloqueante)
- **Alterar copy:** legendas a partir de galleryItems + highlights
- **Manter:** link Maps, localização Goiânia

### Arquivos afetados

- `src/components/sections/Structure.jsx` (rewrite)
- `public/imagens/estrutura/`
- `src/components/ui/icons/PinIcon.jsx` (extrair)

---

## Equipe (`#equipe`)

### Diagnóstico atual

Split hero + 6 image-top cards idênticos aos de Audience. Disclaimer placeholder mina credibilidade. Imagens ausentes. Tom de "grade de serviços", não de pessoas.

### Decisão

**Redesenhar** *(prioridade 4b)*

### Referência selecionada

| Campo | Valor |
|-------|-------|
| **Nome** | BridgeBio |
| **Parte utilizada** | Feature editorial / patient stories — tratamento humano |
| **Padrão relacionado** | `sections.md` → Feature alternada lateral |
| **Motivo** | Em saúde, a equipe é a decisão de compra |

### Princípio adaptado

- **Composição:** foto coletiva ou ambiente de equipe em destaque + 4–6 áreas em `ImageCard` unificado
- **Tema:** `theme-warm` (rosa suave) — calor humano
- **Organização:** por área de cuidado (já existe em `teamAreas`); remover disclaimer
- **Tipografia:** H3 consistente (`text-lg`)

### Adaptação para a Voe Alto

"Pessoas que cuidam" — foto real da equipe. Cards com foto de área (ou ícone orgânico se foto individual indisponível). Sem disclaimer de placeholder. CTA "Falar com a equipe".

### Estrutura desktop

```
┌─ theme-warm ─────────────────────────────────────────────────┐
│  SectionTitle                                                │
│  [foto equipe — split 50/50 com intro]                       │
│  ┌────┐ ┌────┐ ┌────┐                                        │
│  │area│ │area│ │area│  grid 2–3 col ImageCard                │
│  └────┘ └────┘ └────┘                                        │
│  [Falar com a equipe]                                        │
└──────────────────────────────────────────────────────────────┘
```

### Estrutura mobile

- Intro + foto empilhados
- Cards 1 col; aspect 16/10
- CTA full-width

### Movimento

| Campo | Valor |
|-------|-------|
| **Gatilho** | scroll reveal |
| **Estado inicial** | cards `opacity: 0, translateY(16px)` |
| **Stagger** | 60ms (máx 4 visíveis) |
| **Duração** | 500ms |
| **Hover** | lift **apenas** se card for link; senão nenhum |
| **prefers-reduced-motion** | Estático |

### Conteúdo necessário

- **Criar mídia:** fotos reais equipe/áreas
- **Remover:** disclaimer placeholder
- **Manter:** 6 áreas e descriptions
- **Alterar copy:** tom mais humano no SectionTitle

### Arquivos afetados

- `src/components/sections/Team.jsx` (rewrite)
- `src/components/ui/ImageCard.jsx` (novo)
- `public/imagens/equipe/`

---

## Público (`#publico`)

### Diagnóstico atual

4 image-top cards clonados de Team. Responde "é para mim?" mas com layout genérico e imagens ausentes.

### Decisão

**Substituir / Remover** (fundir em Specialties + linha na Proposta)

### Referência selecionada

Regras da biblioteca — "cada seção responde a uma pergunta".

### Princípio adaptado

- Filtros de público na lista de especialidades
- Uma linha na Proposta: "Atendemos crianças, adolescentes, adultos e famílias"

### Conteúdo necessário

- Migrar `audiences` tags para `specialties.js`
- Remover seção do `App.jsx`

### Arquivos afetados

- `src/components/sections/Audience.jsx` (remover do App; depois deletar)
- `src/data/specialties.js`
- `src/App.jsx`

---

## FAQ (`#faq`)

### Diagnóstico atual

Accordion funcional com ARIA, mas abre via `hidden` (sem transição). Visual alinhável à nova lista de especialidades.

### Decisão

**Ajustar**

### Referência selecionada

| Campo | Valor |
|-------|-------|
| **Nome** | Acron |
| **Parte utilizada** | Comportamento de accordion (height + ícone) |
| **Padrão relacionado** | `sections.md` / `motion.md` → accordion 200–300ms |
| **Motivo** | Reduz fricção pré-conversão; só precisa de polimento |

### Princípio adaptado

- Transição de altura suave; chevron rotate; visual coerente com SpecialtyAccordion
- Manter CTA WhatsApp abaixo

### Adaptação para a Voe Alto

FAQ = **dúvidas de famílias** com a mesma linguagem de escuta. Sem cards elevated agressivos.

### Estrutura desktop / mobile

- Max-width `max-w-3xl` centrado (já existe)
- Mobile: alvos 48px; mesma transição

### Movimento

| Campo | Valor |
|-------|-------|
| **Gatilho** | click |
| **Propriedades** | `grid-template-rows` 0fr→1fr; chevron `rotate` |
| **Duração** | 250ms |
| **prefers-reduced-motion** | Instantâneo |

### Conteúdo necessário

- **Manter:** `faq.js` existente
- **Alterar:** só comportamento visual

### Arquivos afetados

- `src/components/sections/FAQ.jsx`
- Possível compartilhar primitivo com `SpecialtyAccordion`

---

## CTA final (`#contato`)

### Diagnóstico atual

Painel azul bom como clímax, mas **AssistantChat** simula chatbot genérico. Copy repete diferenciais do hero. Eyebrow custom bypassa `Badge`.

### Decisão

**Redesenhar** *(prioridade 5 — conversão)*

### Referência selecionada

| Campo | Valor |
|-------|-------|
| **Nome** | BridgeBio (tema escuro) + Acron (acento = decisão) |
| **Parte utilizada** | CTA final + alternância temática; rosa como ação |
| **Padrão relacionado** | `sections.md` → CTA final · Alternância temática |
| **Motivo** | Orientação como conversão — coerente com a promessa da marca |

### Princípio adaptado

- **Composição:** painel `theme-deep` (eco da Proposta); 2–3 deep links WhatsApp categorizados
- **Organização:** "Primeira consulta" · "Já sou paciente / retorno" · "Ainda não sei qual atendimento"
- **Remover:** AssistantChat
- **Interação:** botões rosa (`brand-pink`) sobre azul

### Adaptação para a Voe Alto

Deep links = **orientação em um toque** — o site guia como a clínica guia. Sem simular chat. Badge padrão. Bullets mínimos ou nenhum (já ditos na Proposta).

**Mensagens WhatsApp sugeridas (reusar lógica do AssistantChat):**

1. Agendar avaliação  
2. Dúvida sobre especialidade / orientação  
3. Atendimento infantil / adolescente / adulto (ou um único "orientação geral")

### Estrutura desktop

```
┌─ theme-deep rounded-3xl ─────────────────────────────────────┐
│  Badge · H2 · sub curto                                      │
│                                                              │
│  [Primeira consulta →]                                       │
│  [Preciso de orientação →]                                   │
│  [Já sou paciente →]                                         │
│                                                              │
│  endereço resumido · horário                                 │
└──────────────────────────────────────────────────────────────┘
  max-width container · padding 64–80px · botões empilhados ou row
```

### Estrutura mobile

- Botões full-width, gap 12px, min-height 48px
- Padding bottom extra para FAB clearance
- Sem grid 2 col

### Movimento

| Campo | Valor |
|-------|-------|
| **Gatilho** | scroll reveal painel |
| **Estado inicial** | `opacity: 0, translateY(24px)` |
| **Duração** | 500ms |
| **Hover botões** | ícone `translateX(2px)`, 150ms |
| **prefers-reduced-motion** | Estático |

### Conteúdo necessário

- **Alterar copy:** headline/sub sem menção a "assistente"
- **Remover:** `AssistantChat.jsx` do fluxo (deletar após)
- **Manter:** deep link messages (migrar de AssistantChat options)
- **Adicionar:** dados de contato resumidos

### Arquivos afetados

- `src/components/sections/FinalCTA.jsx` (rewrite)
- `src/components/ui/AssistantChat.jsx` (remover)
- `src/data/clinic.js` (mensagens categorizadas)
- `src/components/ui/Badge.jsx` (usar no CTA)

---

## Footer

### Diagnóstico atual

Funcional. Aviso de imagens IA prejudica confiança. Favicon mismatch (`favicon.png` vs `favicon.svg`). Logo PNG ausente.

### Decisão

**Manter** (ajustes menores) *(prioridade 5)*

### Referência selecionada

Nenhuma externa — correção técnica + regras.

### Princípio adaptado

- Remover aviso IA após fotos reais
- Corrigir favicon e logo SVG
- Links alinhados à nav consolidada
- `pb-20` mobile para FAB

### Adaptação para a Voe Alto

Footer = **base de confiança**: endereço, CNPJ, horários, Instagram. Sem wordmark monumental.

### Movimento

Sem animação. Links: color 150ms.

### Conteúdo necessário

- **Manter:** dados `clinic.js`
- **Remover:** disclaimer IA (quando assets reais entrarem)
- **Corrigir:** paths de logo/favicon

### Arquivos afetados

- `src/components/layout/Footer.jsx`
- `index.html`
- `src/data/clinic.js`

---

## WhatsApp FAB

### Diagnóstico atual

`lg:hidden` — desktop sem FAB. Ícone chat genérico. Hover lift padrão.

### Decisão

**Ajustar**

### Princípio adaptado

- Visível também em desktop **ou** garantir CTA header sempre presente (preferir header + CTAs inline; FAB só mobile se header cobrir desktop)
- Cores de marca (azul/rosa), ícone WhatsApp reconhecível
- Microanimação de ícone (150ms), não scale do botão

### Arquivos afetados

- `src/components/layout/WhatsAppButton.jsx`

---

## Motion global + temas (transversal)

### Diagnóstico atual

Hover lift ×4; marquee; zero reveal; 6 atmospheres + orbs em 9 seções; reduced-motion só no marquee.

### Decisão

**Redesenhar**

### Referência selecionada

BridgeBio (scroll reveal institucional) + Acron (gap hover pontual).

### Princípio adaptado

| Antes | Depois |
|-------|--------|
| 6 atmospheres + orbs | 3 themes (`light` / `warm` / `deep`) |
| Lift em tudo | Lift só em links/cards clicáveis |
| Marquee | Accordion |
| Sem reveal | Reveal 0.6–0.8s, once |
| Reduced motion parcial | Global |

### Arquivos afetados

- `src/styles/index.css`
- `src/hooks/useScrollReveal.js`
- `src/components/ui/ScrollReveal.jsx`
- Todas as seções

---

## `_legacy/` e dependências

### Decisão

**Remover**

- `src/components/_legacy/*` (8 arquivos odontológicos)
- `lucide-react` do `package.json` (se só usado no legacy)

---

## Ordem de implementação

### Fase 1 — Header e Hero *(prioridade 1)*

1. Infraestrutura: tokens de tema, tipografia 4 níveis, `ScrollReveal`, font single-load  
2. Remover `_legacy/` e limpar `lucide-react`  
3. Header: nav alinhada, CTA sempre visível, logo SVG  
4. Hero: redesign sem pills/orbs; copy enxuto; **foto real** (ou placeholder de qualidade até asset chegar)  
5. Criar `Proposal.jsx` + métricas; remover Trust do App  

**Entregável:** primeira impressão acolhedora; contraste temático iniciado; nav coerente.

---

### Fase 2 — Especialidades *(prioridade 2)*

1. Estender `specialties.js` com `group` + `audiences`  
2. Rewrite Specialties → accordion + filtros  
3. Remover marquee CSS/JS  
4. Remover Audience do App  
5. Extrair ícones compartilhados  

**Entregável:** orientação escaneável; fim do carrossel; 9→7 seções.

---

### Fase 3 — Processo *(prioridade 3)*

1. Rewrite Process → timeline vertical 4 passos  
2. Remover grid 5 colunas e Card hover  
3. CTA WhatsApp mantido  

**Entregável:** trajetória clara em qualquer viewport.

---

### Fase 4 — Estrutura e Equipe *(prioridade 4)*

1. Structure editorial com fotos reais + Maps CTA  
2. Team em `theme-warm` + `ImageCard`; remover disclaimer  
3. Otimizar/adicionar assets em `public/imagens/`  

**Entregável:** confiança visual (espaço + pessoas).

---

### Fase 5 — CTA final, FAQ, Footer *(prioridade 5)*

1. FinalCTA com deep links; remover AssistantChat  
2. FAQ com transição de altura  
3. Footer: logo, favicon, sem aviso IA  
4. FAB ajustado  
5. Audit WCAG, reduced-motion, alvos 44px  
6. Atualizar `docs/design-audit.md` pós-implementação  

**Entregável:** conversão orientada; site merge-ready.

---

## Checklist de conformidade (`design-rules.md`)

| Regra | Como o plano atende |
|-------|---------------------|
| Tipografia §1 — 4 níveis | Tokens display/title/body/label |
| Cores §2 — acento com função | Rosa em CTAs; azul em blocos de peso |
| Layout §3 — ≥80px | `py-20 lg:py-24` |
| Layout §4 — alternância | 3 themes |
| Nav §1–2 | ≤6 itens; CTA sempre visível |
| Hero §1 | Uma proposta, um CTA |
| Seções §2 — ≤7 | Consolidação 9→7 |
| Motion §1–5 | Reveal funcional + reduced-motion global |
| A11y §2 | Alvos 44–48px |

---

## Riscos e mitigações

| Risco | Mitigação |
|-------|-----------|
| Fotos reais indisponíveis | Bloquear Fases 1/4 visuais com assets provisórios de qualidade; não lançar com alts "ilustrativo" + disclaimer IA |
| Filtros de público mal mapeados | Validar `audiences[]` com a clínica antes do go-live |
| Accordion longo (13 itens) | Agrupar por eixo com headings sticky leves; filtros reduzem lista |
| Remoção do AssistantChat | Migrar options para deep links — zero perda de intenção |
| Logo PNG ausente | Usar SVG imediatamente |

---

## O que não será copiado das referências

- BridgeBio: vídeo cinematográfico, grid exposto, Suisse, sunrise, wordmark gigante, nav em 3 zonas  
- Acron: amarelo-limão, números monumentais, loader, nuvens, Polymath, índice lateral  
- Persepolis: descartada integralmente  

Paleta, copy, fotos e composição permanecem Voe Alto.

---

*Documento gerado a partir de `reference-strategy.md`, código em `src/` e análises em `design-intelligence-library/references/*/analysis.md`. Nenhum código alterado nesta etapa.*
