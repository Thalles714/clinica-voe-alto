# Estratégia de Referências — Clínica Voe Alto

**Data:** 10/07/2026  
**Base:** `docs/design-audit.md` · `design-intelligence-library/` (references, patterns, rules)  
**Escopo:** estratégia de redesign — nenhum código alterado nesta etapa

---

## 1. Diagnóstico atual

Landing única em React + Tailwind com fundamentos corretos (paleta azul `#1f3d71` + rosa `#ef8cab`, copy clínico empático, dados reais da clínica), mas com execução que mistura excesso de seções, padrões de template SaaS e ausência crítica de fotografia real.

### Problemas visuais e de experiência

| Categoria | Problema |
|-----------|----------|
| **Seções genéricas** | 9 seções (acima do máximo de 7 das regras); 8 delas seguem atmosphere → blur orbs → SectionTitle → grid → CTA. Trust (cards numerados 01–04), Process (timeline 5 colunas) e FAQ são intercambiáveis com qualquer landing |
| **Cards repetitivos** | Image-top card idêntico ×10 (Team + Audience); 4 implementações paralelas (Card, article custom em Trust, SpecialtyCard, GalleryImage); ícones duplicados inline (CheckIcon ×3, PinIcon ×2, ChatIcon ×2) |
| **Animações repetidas** | O mesmo `hover:-translate-y-0.5` em Card, GalleryImage, SpecialtyCard e FAB; marquee infinito; FAQ abre sem transição; zero scroll reveal |
| **Layouts previsíveis** | Título centralizado + grid em todas as seções; 6 classes de atmosphere quase idênticas; blur orbs em 9 de 9 seções |
| **Falta de identidade** | Plus Jakarta Sans (duplo load), marquee de carrossel, AssistantChat genérico, trust pills que duplicam a seção Trust, template odontológico inteiro em `_legacy/` |
| **Hierarquia** | Três tamanhos de H2 (`2.75rem`, `2.5rem` + Hero `3.15rem` a só 0.4rem do H2); H3 de `text-base` a `text-2xl`; nove valores de opacidade no body text (risco de contraste AA) |
| **Ritmo visual** | Todas as seções com a mesma densidade média e o mesmo fundo claro suave — sem momento de contraste, sem respiro, sem clímax; conteúdo repetido ("3 anos", "equipe multidisciplinar") em 3+ seções |
| **Mobile** | Imagens JPG referenciadas mas ausentes do repositório; Process em 5 colunas espremido a 1024px; FAB só em mobile (desktop sem acesso rápido); CTA do header some em telas pequenas; 4 seções órfãs da navegação |

---

## 2. Direção da marca

A Voe Alto é uma **clínica multidisciplinar de desenvolvimento infantil, adolescente e adulto** — o público é a família (majoritariamente mães) buscando acolhimento e orientação, muitas vezes sem saber qual especialista procurar. A linguagem visual adequada é:

- **Acolhedora com autoridade** — o calor humano precisa vir primeiro (fotografia de pessoas, tom suave), mas sustentado por sinais de competência clínica (estrutura, método, equipe). Este é exatamente o equilíbrio da referência BridgeBio: "ciência e empatia".
- **Calma, nunca frenética** — famílias chegam ansiosas; marquees infinitos, orbs por toda parte e 9 seções de scroll transmitem o oposto de acolhimento. Menos blocos, mais respiro, motion lento e único.
- **Humana antes de institucional** — rostos e ambientes reais valem mais que qualquer padrão visual; a maior dívida do projeto é fotográfica, não de layout.
- **Rosa e azul com papéis claros** — azul `#1f3d71` como âncora de confiança (títulos, blocos de peso), rosa `#ef8cab` como acento de calor (CTAs, destaques) — hoje ambos se diluem em gradientes de fundo.
- **Orientação como serviço** — a promessa central ("você não precisa saber qual especialista procurar") deve virar o eixo da página: o site guia, como a clínica guia.

---

## 3. Avaliação das três referências

### 3.1 BridgeBio

- **Nome:** BridgeBio (`references/bridgebio.com`)
- **Elementos relevantes:**
  - Humanizar setor técnico: fotografia de pessoas reais em close + paleta quente, contra o visual clínico frio
  - Hero full-bleed com mídia humana + CTA integrado ao layout
  - Alternância temática de seções (claro / tom médio / escuro) criando ritmo narrativo — o antídoto direto para as 6 atmospheres idênticas
  - Bloco de métricas em alto contraste (fundo escuro, números display) para credibilidade instantânea
  - Serif light em display + sans em UI — autoridade com calor, quebrando o padrão sans-bold do setor saúde
  - Scroll reveal institucional (0.8s, uma vez, com fallback) — calma codificada em motion
  - Espaçamento fluido com `clamp()`
- **Elementos inadequados:**
  - Vídeo de fundo em produção cinematográfica — fora do orçamento; fotografia estática de qualidade cumpre o papel
  - Nav de três zonas com subnavs e links utilitários — a Voe Alto tem uma página com ~6 âncoras
  - Wordmark gigante no footer; gradiente sunrise; tabela de pipeline — proprietários ou sem equivalente de conteúdo
  - Hero de 166vw no mobile
- **Decisão:** **UTILIZAR** (referência principal)
- **Motivo:** é a única das três no mesmo eixo setorial (saúde) e resolve o problema central da marca: equilibrar empatia e credibilidade. Seus padrões dependem de fotografia humana — que é justamente o investimento prioritário já identificado na auditoria.
- **Seções em que pode contribuir:** Hero, Trust (métricas), Team, Structure, ritmo temático global, motion global, tipografia.

### 3.2 Acron Solutions — Energy Upgrades

- **Nome:** Acron Energy Upgrades (`references/sacron.noenergyupgrades`)
- **Elementos relevantes:**
  - Accordion técnico numerado — organiza as 13 especialidades sem marquee e melhora o FAQ (que hoje abre sem transição)
  - Bloco editorial de proposta — parágrafo display para a promessa "você não precisa saber qual especialista procurar"
  - Hover com expansão de gap — microinteração distintiva para listas
  - Duas cores de bloco com função (acento = decisão) — aplicável ao rosa nos momentos de conversão
- **Elementos inadequados:**
  - Números monumentais 01–06 e estética técnica B2B — frieza de engenharia num contexto de acolhimento infantil; a numeração já é um problema no site atual (Trust 01–04)
  - Loader de 15s, hero de 200vh, renders 3D, índice lateral de capítulos — produção e tom incompatíveis
  - Amarelo-limão de alto impacto — agressivo para o público
  - `noindex` — a clínica depende de busca local
- **Decisão:** **UTILIZAR PARCIALMENTE** (referência de apoio, escopo restrito)
- **Motivo:** o vocabulário estrutural (accordion, bloco de proposta, cor com função) resolve problemas específicos de organização de conteúdo — especialidades e FAQ. O tom geral da referência (técnico, monumental, premiado) não deve contaminar a identidade acolhedora; entra a gramática, não o sotaque.
- **Seções em que pode contribuir:** Specialties (accordion no lugar do marquee), FAQ (transição e microinterações), bloco de proposta pós-hero.

### 3.3 Persepolis Reimagined (Getty)

- **Nome:** Persepolis Reimagined (`references/persepolis.getty.edu`)
- **Elementos relevantes (em tese):** "um conceito por viewport" como disciplina de foco; reduced-motion como classe global; max-width de texto em `em` para leitura calma.
- **Elementos inadequados:**
  - Scroll hijacking, preloader shader, WebGL, botão "Enter" — barreiras de acesso impensáveis para mães buscando atendimento no celular
  - Paleta escura 90% — oposta à leveza necessária para saúde infantil
  - SPA sem fallback e SEO comprometido — fatal para captação local
  - Fontes licenciadas (Maghfirea, Graphik); overlay de créditos denso
- **Decisão:** **DESCARTAR**
- **Motivo:** incompatível com marca (escuro/monumental vs. claro/acolhedor), público (famílias em mobile), conversão (barreira de entrada vs. WhatsApp em um toque), acessibilidade e performance. Os princípios residuais úteis (foco, reduced-motion, largura de leitura) já constam das regras gerais da biblioteca e não exigem esta referência.
- **Seções em que pode contribuir:** nenhuma.

---

## 4. Mapa de referências por seção

### Header / Navegação

- **Estado atual:** sticky com backdrop blur; 5 links, mas Trust, Process, Audience e FAQ órfãos; CTA some em telas pequenas
- **Decisão:** **Ajustar**
- **Referência:** BridgeBio (princípio de nav sóbria) + regras da biblioteca
- **Padrão reutilizável:** `navigation.md` → Top bar fixa / princípios (máximo 6 itens, CTA sempre visível)
- **Princípio adaptado:** manter a nav limpa atual; realinhar âncoras à página consolidada (ver abaixo); garantir CTA WhatsApp compacto visível em todas as larguras
- **Motivo:** a nav em si é adequada — o problema é o desalinhamento com o conteúdo; a solução vem da consolidação de seções, não de um padrão novo

### Hero (`#inicio`)

- **Estado atual:** split texto + imagem (ausente) com trust pills flutuantes que duplicam a seção Trust
- **Decisão:** **Redesenhar**
- **Referência:** BridgeBio
- **Padrões reutilizáveis:** `heroes.md` → Full-bleed com overlay / Split assimétrico · `motion.md` → Motion primário por mídia de fundo
- **Princípio adaptado:** fotografia humana real (criança/família em atendimento, com direitos de uso) como protagonista; headline curta de acolhimento; um CTA primário WhatsApp; remover trust pills; a mídia é o movimento — sem stagger nem pills animadas
- **Motivo:** humanizar é a alavanca nº 1 da marca; o padrão exige a fotografia que já é o investimento prioritário. Composição própria — não replicar grid exposto nem vídeo da referência

### Bloco de proposta (novo, substitui a abertura de Trust)

- **Estado atual:** inexistente — a promessa central está pulverizada em 3 seções
- **Decisão:** **Substituir** (Trust é absorvida)
- **Referência:** Acron
- **Padrão reutilizável:** `sections.md` → Bloco editorial de proposta
- **Princípio adaptado:** parágrafo display único ("Você não precisa saber qual atendimento procurar — nós orientamos") sobre fundo azul profundo com texto claro, seguido dos 4 pilares de Trust em linha compacta (sem cards numerados 01–04)
- **Motivo:** concentra a promessa num momento de peso, elimina a repetição de copy e cria o primeiro contraste temático da página

### Trust (`#confianca`)

- **Estado atual:** 4 cards numerados com borda superior azul — padrão agência
- **Decisão:** **Remover** (conteúdo migra para o bloco de proposta e para a faixa de métricas)
- **Referência:** BridgeBio
- **Padrão reutilizável:** `sections.md` → Bloco de métricas em alto contraste
- **Princípio adaptado:** os dados verificáveis (3 anos, nº de especialidades, faixas etárias atendidas) viram faixa de métricas display dentro do bloco de proposta escuro
- **Motivo:** reduz a contagem de seções (regra: máximo 7), elimina a numeração de agência e dá às métricas o tratamento de credibilidade que cards genéricos não dão

### Specialties (`#especialidades`)

- **Estado atual:** marquee infinito de 13 cards com temas alternados azul/branco
- **Decisão:** **Redesenhar**
- **Referência:** Acron
- **Padrões reutilizáveis:** `sections.md` → Accordion técnico numerado (adaptado sem números) · `motion.md` → Hover com expansão de gap
- **Princípio adaptado:** lista vertical com bordas horizontais, agrupada por eixo (desenvolvimento, terapias, saúde emocional...) ou faixa etária; cada item expande com descrição e CTA "falar sobre esta especialidade"; hover com gap expandindo suavemente; sem círculos numerados — ícone ou inicial da especialidade no lugar
- **Motivo:** o marquee esconde informação de quem mais precisa dela (a mãe procurando "fono" ou "TEA"); a lista expansível é escaneável, acessível, funciona sem JS pesado e ainda ganha a única microinteração distintiva da página

### Structure (`#estrutura`)

- **Estado atual:** bento gallery + banner + 3 highlight cards (imagens ausentes)
- **Decisão:** **Ajustar**
- **Referência:** BridgeBio
- **Padrão reutilizável:** `sections.md` → Feature alternada lateral
- **Princípio adaptado:** com as fotos reais, reduzir para 1 imagem hero do espaço + 2 apoios em par imagem/texto alternado; cortar os 3 highlight cards (conteúdo vira legenda das fotos)
- **Motivo:** a bento gallery com 5+ fotos genéricas vale menos que 3 fotos reais bem legendadas; menos moldura, mais ambiente

### Process (`#como-funciona`)

- **Estado atual:** timeline de 5 cards em 5 colunas — espremida em laptop, genérica
- **Decisão:** **Ajustar**
- **Referência:** regras da biblioteca (nenhuma referência externa necessária)
- **Padrão reutilizável:** `sections.md` → Como funciona / passos (sequência vertical com conectores)
- **Princípio adaptado:** reduzir a 3–4 passos em lista vertical com conectores (desktop e mobile iguais), copy mais curta, um CTA ao final
- **Motivo:** o fluxo real (contato → acolhimento → plano → acompanhamento) cabe em menos passos; vertical resolve o aperto de 1024px sem inventar layout novo

### Team (`#equipe`)

- **Estado atual:** split hero card + 6 image-top cards por área (imagens ausentes) + disclaimer que mina a credibilidade
- **Decisão:** **Redesenhar**
- **Referência:** BridgeBio
- **Padrão reutilizável:** `sections.md` → Feature alternada lateral (tratamento editorial de pessoas)
- **Princípio adaptado:** fotografia real da equipe em destaque + apresentação por área em cards unificados (um único primitivo `ImageCard`); remover o disclaimer placeholder; tom de "pessoas que cuidam", não de grade de serviços
- **Motivo:** em saúde, a equipe é a decisão de compra; merece o tratamento humano-editorial que a BridgeBio dá a patient stories — com assets próprios

### Audience (`#publico`)

- **Estado atual:** 4 image-top cards idênticos aos de Team, com tag pills
- **Decisão:** **Substituir** (fundir com Team ou com a lista de especialidades)
- **Referência:** regras da biblioteca
- **Padrão reutilizável:** `sections.md` → princípio "cada seção responde a uma pergunta"
- **Princípio adaptado:** a pergunta "é para o meu filho/para mim?" é respondida com um agrupamento por faixa etária dentro de Specialties (filtro/agrupador) ou uma linha compacta no bloco de proposta — não uma seção inteira de cards repetidos
- **Motivo:** reduz a contagem para ≤7 seções e elimina 4 dos 10 cards clonados; o conteúdo sobrevive em forma mais útil

### FAQ (`#faq`)

- **Estado atual:** accordion com `hidden` (abre sem transição) + card CTA
- **Decisão:** **Ajustar**
- **Referência:** Acron
- **Padrão reutilizável:** `sections.md` → Accordion técnico (comportamento) · `motion.md` → princípios de accordion (height com ease 200–300ms)
- **Princípio adaptado:** transição de altura suave, ícone rotacionando, hover discreto; visual alinhado à lista de Specialties para coerência; respeitar `prefers-reduced-motion`
- **Motivo:** o FAQ reduz fricção pré-conversão — só precisa de polimento de comportamento, não de reinvenção

### FinalCTA (`#contato`)

- **Estado atual:** painel azul escuro + bullets + AssistantChat genérico
- **Decisão:** **Redesenhar**
- **Referência:** BridgeBio (alternância temática) + Acron (acento como decisão)
- **Padrões reutilizáveis:** `sections.md` → CTA final · Alternância temática de seções
- **Princípio adaptado:** manter o painel escuro como clímax temático da página (eco do bloco de proposta), substituir o AssistantChat por 2–3 deep links WhatsApp categorizados ("primeira consulta", "já sou paciente", "dúvidas") com o rosa como cor de ação; eyebrow via `Badge` padrão
- **Motivo:** o chat genérico simula um atendimento que o WhatsApp real já faz melhor; links categorizados orientam — coerente com a promessa da marca

### Footer

- **Estado atual:** funcional, com aviso de imagens IA
- **Decisão:** **Manter** (ajustes menores)
- **Referência:** —
- **Princípio adaptado:** remover o aviso de imagens geradas por IA quando as fotos reais entrarem; corrigir favicon (`favicon.png` referenciado vs. `favicon.svg` existente)
- **Motivo:** estrutura adequada; pendências são de conteúdo e correção técnica

### Blur orbs + atmospheres (transversal)

- **Estado atual:** orbs em 9 seções; 6 classes de atmosphere quase idênticas
- **Decisão:** **Substituir**
- **Referência:** BridgeBio
- **Padrão reutilizável:** `sections.md` → Alternância temática de seções
- **Princípio adaptado:** 3 temas nomeados — claro (base), rosa suave (calor, 1–2 seções), azul profundo (proposta e CTA final) — com tokens herdados pelos componentes; orbs eliminados
- **Motivo:** ritmo narrativo por tema substitui decoração repetida; de 6 gradientes para 3 superfícies com significado

### Motion global (transversal)

- **Estado atual:** hover lift clonado em 4 componentes; marquee; zero reveal
- **Decisão:** **Redesenhar**
- **Referência:** BridgeBio (base) + Acron (detalhe pontual)
- **Padrões reutilizáveis:** `motion.md` → Scroll reveal institucional · Hover com expansão de gap
- **Princípio adaptado:** reveal único e lento (0.6–0.8s) por seção — calma codificada; hover lift restrito a cards clicáveis; gap expansivo exclusivo da lista de especialidades; `prefers-reduced-motion` global (hoje só o marquee trata)
- **Motivo:** o motion passa a comunicar tranquilidade — o atributo central da marca — em vez de repetir o tique de template

### `_legacy/` (código morto)

- **Estado atual:** 8 arquivos de template odontológico + dependência `lucide-react` usada só ali
- **Decisão:** **Remover**
- **Motivo:** risco de vazamento de identidade alheia (CRO, "Clínica Odontológica Premium") e peso morto no bundle

---

## 5. Elementos que devem ser preservados

| Elemento | Onde | Por quê |
|----------|------|---------|
| Paleta azul + rosa (tokens `@theme`) | `src/styles/index.css` | Identidade correta; o redesign dá papéis claros às cores, não as troca |
| Logos SVG | `public/imagens/brand/logo.svg`, `logo2.svg` | Únicos ativos de marca em repositório |
| Copy clínico empático e a promessa de orientação | Todas as seções + `faq.js` | É o diferencial verbal da marca — vira o eixo do bloco de proposta |
| Dados reais (endereço, CNPJ, horários, Instagram, WhatsApp) | `src/data/clinic.js` | Credibilidade e conversão local |
| Dados estruturados de especialidades e FAQ | `specialties.js`, `faq.js` | Conteúdo pronto — muda só a apresentação |
| Funil WhatsApp | CTAs + `WhatsAppButton.jsx` | Canal real de conversão; categorizar, nunca remover |
| Acessibilidade existente | ARIA labels, HTML semântico, reduced-motion do marquee | Base a expandir para o site todo |
| Header sticky com blur e mobile drawer | `Header.jsx`, `MobileMenu.jsx` | Funcionam bem; só realinhar âncoras |
| `Container`, `SectionTitle`, `Badge`, `Button` | `src/components/ui/` | Primitivos sólidos — consolidar, não descartar |

---

## 6. Prioridades de redesign

### Maior impacto visual
1. **Fotografia real** (hero, equipe, estrutura) — pré-requisito de todos os padrões BridgeBio; nada supera isso
2. **Alternância temática em 3 temas** com eliminação dos blur orbs — ritmo narrativo no lugar de decoração
3. **Bloco de proposta escuro com métricas** — o primeiro momento de peso da página
4. **Specialties como lista expansível** — fim do marquee, informação acessível

### Maior impacto na conversão
1. **FinalCTA com deep links WhatsApp categorizados** — orientação como conversão
2. **Hero com um CTA primário e promessa clara** — sem pills competindo
3. **Consolidação de 9 → 7 seções** — menos scroll até a decisão
4. **CTA WhatsApp visível em todas as larguras** (header + desktop)

### Maior impacto na experiência
1. **Nav alinhada ao conteúdo** — fim das seções órfãs
2. **Process vertical em 3–4 passos** — legível em qualquer viewport
3. **FAQ com transição suave** e motion global calmo com `prefers-reduced-motion`
4. **Correções técnicas:** favicon, font double-load, assets referenciados vs. existentes

### Refinamentos secundários
1. Remover `_legacy/` e `lucide-react`
2. Unificar cards num primitivo `ImageCard` + extrair ícones duplicados
3. Escala tipográfica: um tamanho de H2, H3 consistente, opacidades documentadas (máx. 3 valores)
4. Estudar par tipográfico (serif humanista para display) inspirado no princípio BridgeBio — sem usar Suisse
5. Remover disclaimer placeholder de Team e aviso de imagens IA do footer (após fotos reais)

---

## 7. Direção recomendada

**Conceito: "acolhimento com estrutura" — a humanização fotográfica e o ritmo temático da BridgeBio, com a organização de conteúdo da Acron, em azul e rosa Voe Alto.**

A página se consolida de 9 para 7 momentos, em arco narrativo:

1. **Acolhida** — hero fotográfico humano (tema claro) com headline empática e um CTA WhatsApp (BridgeBio).
2. **Promessa** — bloco azul profundo com a proposta em parágrafo display e faixa de métricas: o "nós orientamos" como manifesto (Acron + BridgeBio).
3. **Orientação** — especialidades em lista expansível agrupada por eixo/idade, com hover de gap — a seção que trabalha como a clínica trabalha (Acron).
4. **Confiança** — estrutura e equipe em pares editoriais imagem/texto com fotos reais (BridgeBio), tema rosa suave no bloco de equipe.
5. **Clareza** — como funciona em 3–4 passos verticais + FAQ com transições suaves.
6. **Decisão** — CTA final azul profundo (eco da promessa) com deep links WhatsApp categorizados e rosa como cor de ação.
7. **Base** — footer enxuto com dados reais.

Motion transversal: reveal único e lento por seção, lift apenas em cards clicáveis, `prefers-reduced-motion` global — o site inteiro comunica calma.

**O que explicitamente não será copiado:** o vídeo cinematográfico, o gradiente sunrise, a paleta sandstone, a tipografia Suisse, o grid exposto e o wordmark monumental da BridgeBio; o amarelo-limão, os números monumentais, o loader, as nuvens e a Polymath da Acron; Persepolis foi descartada integralmente. Nenhum texto, imagem, composição integral ou código das referências será reproduzido. A paleta permanece azul + rosa Voe Alto, o copy permanece próprio, e cada seção é uma recombinação de princípios adaptados ao público de famílias — não uma réplica.
