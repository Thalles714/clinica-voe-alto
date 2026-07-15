export const specialties = [
  {
    title: 'Neuropsicopedagogia',
    category: 'Aprendizagem',
    description:
      'Atuação voltada à relação entre processos cognitivos, desenvolvimento e aprendizagem em contextos clínicos e escolares.',
    image: '/imagens/equipe/area-aprendizagem-neurodesenvolvimento.webp',
    imageWidth: 1448,
    imageHeight: 1086,
    alt: 'Mesa com materiais de aprendizagem em um ambiente de atendimento',
  },
  {
    title: 'Psicopedagogia',
    category: 'Aprendizagem',
    description:
      'Avaliação e acompanhamento de questões relacionadas à aprendizagem e ao percurso escolar.',
    image: '/imagens/estrutura/sala-atendimento-infantil.webp',
    imageWidth: 1448,
    imageHeight: 1086,
    alt: 'Sala com livros, brinquedos e materiais para atividades de aprendizagem',
  },
  {
    title: 'Terapia ABA',
    category: 'Intervenção',
    description:
      'Intervenção baseada na análise do comportamento, com objetivos definidos conforme as necessidades de cada pessoa.',
    image: '/imagens/equipe/area-autonomia-terapias-integradas.webp',
    imageWidth: 1448,
    imageHeight: 1086,
    alt: 'Ambiente com mesa, materiais lúdicos e espaço para atividades',
  },
  {
    title: 'Psicologia TCC',
    category: 'Psicologia',
    description:
      'Atendimento psicológico orientado pela Terapia Cognitivo-Comportamental para compreender emoções, pensamentos e comportamentos.',
    image: '/imagens/equipe/area-psicologia-comportamento.webp',
    imageWidth: 1448,
    imageHeight: 1086,
    alt: 'Poltronas em um ambiente reservado para conversa e acolhimento',
    ctaLabel: 'Falar sobre Psicologia',
  },
  {
    title: 'Acompanhamento Jurídico',
    category: 'Suporte',
    description:
      'Orientação sobre direitos, inclusão e questões jurídicas que envolvem pessoas e famílias.',
    image: '/imagens/equipe/area-orientacao-inclusao.webp',
    imageWidth: 1448,
    imageHeight: 1086,
    alt: 'Ambiente reservado com pessoas reunidas para uma conversa de orientação',
  },
  {
    title: 'Fonoaudiologia',
    category: 'Comunicação',
    description:
      'Cuidado com comunicação, linguagem, fala, voz, audição e deglutição.',
    image: '/imagens/equipe/area-comunicacao-linguagem.webp',
    imageWidth: 1448,
    imageHeight: 1086,
    alt: 'Sala com espelho, mesa e materiais para atividades de comunicação',
  },
  {
    title: 'Avaliação Neuropsicológica',
    category: 'Avaliação',
    description:
      'Processo de investigação de funções cognitivas, emocionais e comportamentais para apoiar a compreensão do perfil avaliado.',
    image: '/imagens/estrutura/sala-atendimento-multidisciplinar.webp',
    imageWidth: 1448,
    imageHeight: 1086,
    alt: 'Sala de atendimento com mesa, cadeiras e materiais organizados',
  },
  {
    title: 'Neurologia',
    category: 'Saúde',
    description:
      'Avaliação médica de questões relacionadas ao sistema nervoso, integrada quando necessário aos demais atendimentos.',
    image: '/imagens/estrutura/ambiente-acolhedor-clinica.webp',
    imageWidth: 1599,
    imageHeight: 900,
    alt: 'Ambiente de atendimento com poltronas e iluminação acolhedora',
  },
  {
    title: 'Pediatria do Comportamento Infantil',
    category: 'Infantil',
    description:
      'Avaliação pediátrica voltada ao desenvolvimento e ao comportamento na infância.',
    image: '/imagens/publico/atendimento-criancas.webp',
    imageWidth: 1448,
    imageHeight: 1086,
    alt: 'Criança acompanhada em um ambiente com materiais lúdicos',
    ctaLabel: 'Falar sobre Pediatria Infantil',
  },
  {
    title: 'Massagem Terapêutica',
    category: 'Bem-estar',
    description:
      'Técnicas manuais voltadas ao relaxamento e ao cuidado de tensões corporais no contexto terapêutico.',
    image: '/imagens/estrutura/recepcao-clinica-voe-alto.webp',
    imageWidth: 1448,
    imageHeight: 1086,
    alt: 'Ambiente tranquilo com poltronas e iluminação suave',
  },
  {
    title: 'Grupo de Apoio a Mães',
    category: 'Acolhimento',
    description:
      'Espaço coletivo de escuta e troca de experiências entre mães, com acolhimento às questões do cuidado.',
    image: '/imagens/equipe/area-acolhimento-familiar.webp',
    imageWidth: 1448,
    imageHeight: 1086,
    alt: 'Família reunida em um ambiente preparado para conversa e acolhimento',
    ctaLabel: 'Falar sobre o grupo de apoio',
  },
  {
    title: 'Atividades da Vida Diária para Adolescentes',
    category: 'Autonomia',
    description:
      'Atividades práticas relacionadas à rotina, ao autocuidado e à participação no cotidiano de adolescentes.',
    image: '/imagens/publico/atendimento-adolescentes.webp',
    imageWidth: 1448,
    imageHeight: 1086,
    alt: 'Adolescente em uma conversa individual em ambiente acolhedor',
    ctaLabel: 'Falar sobre atividades para adolescentes',
  },
  {
    title: 'Oficinas',
    category: 'Desenvolvimento',
    description:
      'Atividades individuais ou em grupo com propostas relacionadas a habilidades sociais, motoras, cognitivas e emocionais.',
    image: '/imagens/hero/hero-clinica-voe-alto.webp',
    imageWidth: 1672,
    imageHeight: 941,
    alt: 'Ambiente com mesas e materiais preparados para atividades',
  },
]

export function specialtyWhatsappMessage(title) {
  return `Olá! Gostaria de receber informações sobre atendimento de ${title} na Clínica Voe Alto.`
}
