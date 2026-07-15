# Auditoria de Design — Clínica Voe Alto

**Data:** 10/07/2026  
**Referência:** `design-intelligence-library/rules/design-rules.md`  
**Stack:** React 19 + Vite 8 + Tailwind CSS v4 · landing page única  
**Escopo:** 9 seções ativas + layout global (Header, Footer, WhatsApp FAB, AssistantChat)

---

## Resumo executivo

A Clínica Voe Alto tem base sólida: paleta azul/rosa customizada, copy clínico empático em português e dados reais da clínica. Porém, a página excede 7 seções, repete extensivamente padrões de landing page (blur orbs, card lift, marquee, chat widget) e carrega resquícios de um template odontológico anterior. A tipografia usa tamanhos arbitrários, assets de imagem estão ausentes no repositório, e a navegação não cobre 4 das 9 seções.

---

## 1. Seções genéricas

| Seção | Arquivo | Problema |
|-------|---------|----------|
| **Trust** | `Trust.jsx` | 4 cards numerados (01–04) com ícone + título + texto — padrão startup/agência |
| **Specialties** | `Specialties.jsx` | Marquee horizontal infinito — tropo clássico de landing page |
| **Structure** | `Structure.jsx` | Bento gallery + 3 highlight cards — layout "premium SaaS" |
| **Process** | `Process.jsx` | Timeline numerada em 5 colunas — onboarding genérico |
| **Team** | `Team.jsx` | Split hero + grid image-top cards — template de equipe |
| **Audience** | `Audience.jsx` | Mesmo padrão image-top card de Team, com tag pills |
| **FAQ** | `FAQ.jsx` | Accordion + card CTA — padrão universal |
| **FinalCTA** | `FinalCTA.jsx` | Painel escuro + bullets + widget — bloco de conversão template |

**Hero** (`Hero.jsx`) é a seção mais customizada, mas ainda inclui trust pills flutuantes que duplicam conteúdo de Trust.

**Fórmula repetida em 8 de 9 seções:**

```
Atmosphere background → blur orbs → Container → SectionTitle → grid/cards → CTA WhatsApp
```

**Violações das regras de design:**

- **Seções §2:** **9 seções** na mesma página — acima do máximo recomendado (7); Trust, Process, Audience e FAQ poderiam ser sub-páginas ou consolidadas
- **Seções §1:** copy repetido ("Você não precisa saber qual especialista procurar", "3 anos", "Equipe multidisciplinar") indica falta de uma ideia distinta por bloco
- **Nav §1:** menu tem 5 itens, mas 4 seções ficam órfãs (Trust, Process, Audience, FAQ)

---

## 2. Cards repetitivos

### Primitivo base

`Card.jsx`: `rounded-3xl`, branco, `border-brand-light-gray`, `shadow-sm`, `hover:-translate-y-0.5`.

### Receita dominante: image-top card

```
Card (p-0) → imagem aspect-[16/10] → corpo (título + descrição + tags opcionais)
```

Usada em **Team** (×6) e **Audience** (×4) — 10 cards visualmente idênticos.

### Outros padrões de card

| Seção | Tipo | Usa `Card.jsx`? |
|-------|------|-----------------|
| Trust | `<article>` custom com `border-t-2 border-brand-blue` | ❌ |
| Specialties | `SpecialtyCard` inline (temas blue/white alternados) | ❌ |
| Structure | `GalleryImage` (figure + overlay) + `Card` highlights | Parcial |
| Process | `Card` + círculo numerado | ✅ |
| Team | `Card` image-top | ✅ |
| Audience | `Card` image-top + tag pills | ✅ |
| FAQ | `Card` accordion + `Card` CTA | ✅ |

**Problemas:**

- **Seções §4:** cards são consistentes no hover lift, mas **inconsistentes na implementação** (4 variantes: Card, article, SpecialtyCard, GalleryImage)
- Trust cards com numeração `01`–`04` e Process com círculos `1`–`5` — dois sistemas de "passo/confiança"
- SpecialtyCard alterna temas blue/white — estética de carrossel, não clínica

---

## 3. Animações repetidas

**Sem biblioteca de animação.** CSS transitions + marquee JS customizado.

| Efeito | Onde | Padrão |
|--------|------|--------|
| Hover lift | `Card`, `GalleryImage`, `SpecialtyCard`, `WhatsAppButton` | `hover:-translate-y-0.5` + shadow |
| Image zoom | Structure, Team | `group-hover:scale-[1.02/1.03]` |
| Color transition | Links, botões, Trust | `transition-colors duration-200` |
| Arrow nudge | Specialties | `group-hover:translate-x-0.5` |
| Accordion chevron | FAQ | `rotate-180` |
| Marquee infinito | Specialties | `requestAnimationFrame`, duplica `SpecialtySet` |
| Smooth scroll | `index.css` | `scroll-behavior: smooth` |

**Problemas:**

- **Motion §1:** lift + zoom + marquee são decorativos, não orientadores
- **Motion §4:** marquee é sequência contínua sem fim — pode cansar; `prefers-reduced-motion` tratado apenas no marquee (bom)
- **Mesmo hover lift em 4 componentes** — sensação mecânica e previsível
- FAQ usa `hidden` attribute — abertura abrupta, sem transição de altura

**Blur orbs:** presentes em **todas** as 9 seções — não animados, mas repetidos como device visual estático.

---

## 4. Layouts previsíveis

### Padrões estruturais

| Padrão | Seções |
|--------|--------|
| **Split 50/50** | Hero, Team (hero card), Audience |
| **Grid 4 colunas** | Trust (`sm:2 lg:4`) |
| **Marquee full-bleed** | Specialties (escapa do Container) |
| **Bento gallery** | Structure (`lg:grid-cols-2` + destaque) |
| **Timeline horizontal** | Process (`lg:grid-cols-5`) |
| **Grid image-top** | Team (`sm:2 lg:3`), Audience (`lg:2`) |
| **Single column narrow** | FAQ (`max-w-3xl`) |
| **Painel escuro full-width** | FinalCTA |

### Atmospheres (fundos)

Seis classes em `index.css`: `.section-atmosphere-hero`, `-soft-white`, `-soft-gray`, `-process`, `-trust`, `-specialties` — gradientes radiais rosa/azul quase idênticos.

### Container e ritmo

- `Container`: `max-w-[1280px]` — ok (Layout §1)
- Seções: `py-14 sm:py-20 lg:py-24` — ok (Layout §3)
- `SectionTitle`: `mb-12 lg:mb-16` — consistente

**Violações:**

- **Layout §4:** alternância de fundo existe, mas estrutura interna é sempre título centrado + grid — previsível
- **Layout §5:** empilha bem, mas Process com 5 colunas em `lg` (1024px) comprime cards

---

## 5. Elementos sem identidade de marca

### O que é da marca (preservar)

- Paleta custom: blue `#1f3d71`, pink `#ef8cab`, light pink `#f1cddb`
- Copy clínico empático, foco familiar (infantil, adolescente, adulto)
- Dados reais: endereço, CNPJ, horários, WhatsApp, Instagram (`clinic.js`)
- Logos SVG: `public/imagens/brand/logo.svg`, `logo2.svg`

### O que é genérico (substituir ou adaptar)

| Elemento | Arquivo | Por quê |
|----------|---------|---------|
| **Plus Jakarta Sans** | `index.html` + `index.css` (duplo load) | Fonte SaaS padrão; viola Tipografia §5 |
| **Blur orbs** | Todas as seções | Device "premium landing" sem identidade clínica |
| **Marquee de especialidades** | `Specialties.jsx` | Carrossel infinito — comum demais para saúde |
| **AssistantChat** | `AssistantChat.jsx` | Widget de chatbot genérico |
| **Card hover lift** | `Card.jsx` + derivados | Padrão Tailwind universal |
| **Trust pills flutuantes no Hero** | `Hero.jsx` | Duplicam Trust section |
| **Numeração 01–04 em Trust** | `Trust.jsx` | Estética de agência, não clínica |
| **Temas alternados SpecialtyCard** | `Specialties.jsx` | Visual de carrossel e-commerce |
| **Template odontológico legado** | `src/components/_legacy/` | "Clínica Odontológica Premium", CRO, serviços dentais |
| **lucide-react** | `package.json` | Dependência usada só em `_legacy/` |

### Gap crítico de assets

`public/imagens/README.md` lista ~20 JPGs; repositório tem apenas 2 SVGs + favicon. Referenciados mas **ausentes:**

- `hero-clinica-voe-alto.jpg`
- Todas as imagens de `estrutura/`, `equipe/`, `publico/`
- `logo-sem-fundo.png`, `favicon.png`, `og-image.jpg`

Footer admite que imagens podem ser geradas por IA — prejudica credibilidade clínica.

---

## 6. Problemas de hierarquia

### Escala tipográfica fragmentada

| Nível | Onde | Classes | Problema |
|-------|------|---------|----------|
| H1 | Hero | `text-[2rem] sm:text-5xl lg:text-[3.15rem]` | OK como display |
| H2 | `SectionTitle` | `lg:text-[2.75rem]` | — |
| H2 | `FinalCTA` | `lg:text-[2.5rem]` | **3 tamanhos diferentes para H2** |
| H3 cards | Vários | `text-base` a `text-2xl` | Audience > Team > Trust > Process |
| Body | Vários | `text-sm sm:text-base` com opacidade `/50`–`/85` | **9 valores de opacidade** sem escala |
| Micro | FAQ, chat | `text-xs`, `text-[11px]` | Quarto estilo meta-texto |

**Violações:**

- **Tipografia §1:** mais de 4 níveis (H1, H2, H3, body, badge, eyebrow numerado, tags, micro)
- **Tipografia §4:** H1 (`3.15rem`) e H2 (`2.75rem`) separados por apenas ~0.4rem — hierarquia sutil demais
- **Tipografia §3:** corpo ok em `text-base`, mas opacidades baixas (`/50`, `/55`) podem falhar contraste AA

### Hierarquia de conteúdo

- Hero trust pills competem com headline
- WhatsApp como CTA em 8+ pontos — dilui urgência
- FinalCTA usa eyebrow custom (`<span>`) em vez de `Badge` — inconsistência de componente

---

## 7. Problemas de responsividade

| Problema | Local | Detalhe |
|----------|-------|---------|
| **Imagens ausentes** | Hero, Structure, Team, Audience | Layout quebra visualmente; alt diz "ilustrativo" |
| **Process 5 colunas em lg** | `Process.jsx` | Cards estreitos com `text-sm` em 1024px |
| **Marquee overflow** | `Specialties.jsx` | Gradientes de borda hardcoded `#faf7f8` — pode não combinar com todos os fundos |
| **WhatsApp FAB só mobile** | `WhatsAppButton.jsx` | `lg:hidden` — desktop depende de CTAs inline |
| **CTA header oculto em xs** | `Header.jsx` | `hidden sm:inline-flex` |
| **Structure gallery** | `Structure.jsx` | `lg:min-h-[28rem]` + grid assimétrico — alturas desiguais |
| **FAQ accordion** | `FAQ.jsx` | Toggle abrupto (`hidden`), sem animação |
| **Team disclaimer** | `Team.jsx` | Copy placeholder prejudica credibilidade em qualquer viewport |
| **Favicon mismatch** | `index.html` | Referencia `/favicon.png`; repo tem `favicon.svg` |
| **Font double-load** | `index.html` + `index.css` | Performance desnecessária |

**Violações:**

- **Acessibilidade §2:** ícones inline e botões compactos podem ficar abaixo de 44×44px
- **Nav §4:** mobile menu funcional, mas seções órfãs exigem scroll longo para descoberta

---

## 8. Componentes que podem ser substituídos

### Alta prioridade

| Componente | Substituir por | Motivo |
|------------|----------------|--------|
| `src/components/_legacy/` (8 arquivos) | Remover | Template odontológico morto com tokens inexistentes |
| `AssistantChat` | Formulário estruturado ou deep links WhatsApp categorizados | Widget genérico; tom clínico pede humanização |
| Marquee Specialties | Grid categorizado ou tabs por faixa etária | Mais confiável para saúde |
| Blur orbs (×9 seções) | 2–3 superfícies semânticas + fotos reais | Reduzir ruído decorativo |
| Trust pills no Hero | Remover (já existe Trust section) | Duplicação de conteúdo |
| `lucide-react` | Remover do package.json | Não usado no código ativo |

### Média prioridade

| Componente | Substituir por | Motivo |
|------------|----------------|--------|
| `CheckIcon` (3 cópias) | Componente único `icons/CheckIcon.jsx` | DRY |
| `PinIcon` (2 cópias) | Idem | DRY |
| `ChatIcon` (2 cópias) | Idem | DRY |
| Image-top Card (Team + Audience) | `ImageCard` compartilhado | 10 instâncias idênticas |
| `GalleryImage` | `MediaCard` generalizado | Overlap com Team/Audience |
| Trust `<article>` | `FeatureCard` ou variante de `Card` | Unificar sistema |
| 6 atmosphere classes | 2–3 tokens de superfície | Gradientes quase idênticos |
| `Button` variants (`ghost`, `outline`, `whatsapp`) | Remover variantes não usadas | Código morto |
| SpecialtyCard themes alternados | Tema único + borda accent | Coerência clínica |

### Baixa prioridade

| Componente | Ação |
|------------|------|
| Plus Jakarta Sans | Par tipográfico (serif humanista para headings) |
| Numeração Trust 01–04 | Ícones clínicos ou fotos reais |
| FinalCTA eyebrow | Usar `Badge` consistente |
| FAQ accordion | Transição de altura com `prefers-reduced-motion` |

---

## Mapa de arquivos relevantes

```
src/App.jsx
src/styles/index.css          ← theme, atmospheres, marquee CSS
src/data/clinic.js, specialties.js, faq.js
src/components/layout/        ← Header, Footer, MobileMenu, WhatsAppButton
src/components/sections/      ← Hero, Trust, Specialties, Structure, Process, Team, Audience, FAQ, FinalCTA
src/components/ui/            ← Container, SectionTitle, Card, Button, Badge, AssistantChat
src/components/_legacy/       ← 8 arquivos odontológicos (MORTO)
public/imagens/brand/         ← logo.svg, logo2.svg (JPGs ausentes)
```

---

## Prioridades recomendadas

1. **Adicionar fotografias reais** da clínica, equipe e estrutura — maior impacto na credibilidade
2. **Remover `_legacy/`** e dependência `lucide-react`
3. **Consolidar seções** de 9 para ≤7 (mesclar Trust→Hero, Audience→Team, ou FAQ→FinalCTA)
4. **Unificar cards e ícones** — um primitivo, um CheckIcon
5. **Substituir marquee** por apresentação estática categorizada
6. **Tighten type scale** — 4 níveis, opacidades documentadas
7. **Alinhar navegação** com todas as seções ou consolidar conteúdo
8. **Reduzir blur orbs** a 2–3 seções estratégicas

---

## Conformidade com design-rules.md

| Regra | Status |
|-------|--------|
| Tipografia: escala limitada | ❌ Fragmentada (tamanhos arbitrários) |
| Tipografia: máximo 2 famílias | ⚠️ 1 família (ok, sem contraste display) |
| Cores: acento com função | ✅ Pink para destaque, blue para confiança |
| Layout: container 1080–1280px | ✅ 1280px |
| Layout: ritmo de seção ≥80px | ✅ py-20–24 |
| Seções: máximo 7 | ❌ 9 seções |
| Hero: uma proposta | ⚠️ Trust pills competem |
| Motion: função antes de forma | ❌ Lift/zoom/marquee decorativos |
| Nav: máximo 6 itens | ✅ 5 itens (mas seções órfãs) |
| Cards consistentes | ⚠️ Visualmente sim, implementação fragmentada |
| Acessibilidade: contraste AA | ⚠️ Opacidades baixas em body text |
