export const specialties = [
  {
    title: 'Neuropsicopedagogia',
    category: 'Aprendizagem',
    description:
      'Une neurociência e aprendizagem para apoiar o desenvolvimento cognitivo e escolar.',
  },
  {
    title: 'Psicopedagogia',
    category: 'Aprendizagem',
    description:
      'Avaliação e acompanhamento das dificuldades de aprendizagem com olhar individualizado.',
  },
  {
    title: 'Terapia ABA',
    category: 'Intervenção',
    description:
      'Intervenção estruturada para desenvolver habilidades, autonomia e participação no dia a dia.',
  },
  {
    title: 'Psicologia TCC',
    category: 'Psicologia',
    description:
      'Acompanhamento baseado na Terapia Cognitivo-Comportamental para equilíbrio emocional.',
  },
  {
    title: 'Acompanhamento Jurídico',
    category: 'Suporte',
    description:
      'Orientação para famílias que precisam de suporte em direitos e inclusão.',
  },
  {
    title: 'Fonoaudiologia',
    category: 'Comunicação',
    description:
      'Cuidado com comunicação, linguagem, fala, voz, audição e deglutição.',
  },
  {
    title: 'Avaliação Neuropsicológica',
    category: 'Avaliação',
    description:
      'Avalia funções cognitivas, emocionais e comportamentais para orientar o acompanhamento.',
  },
  {
    title: 'Neurologia',
    category: 'Saúde',
    description:
      'Avaliação e acompanhamento neurológico integrado ao cuidado multidisciplinar.',
  },
  {
    title: 'Pediatria do Comportamento Infantil',
    category: 'Infantil',
    description:
      'Olhar pediátrico para o desenvolvimento e o comportamento na infância.',
  },
  {
    title: 'Massagem Terapêutica',
    category: 'Bem-estar',
    description:
      'Técnicas que favorecem relaxamento, alívio de tensões e bem-estar.',
  },
  {
    title: 'Grupo de Apoio a Mães',
    category: 'Acolhimento',
    description:
      'Espaço de escuta e troca para quem cuida e precisa de suporte no dia a dia.',
  },
  {
    title: 'Atividades da Vida Diária para Adolescentes',
    category: 'Autonomia',
    description:
      'Práticas que fortalecem autonomia, rotina e habilidades do cotidiano.',
  },
  {
    title: 'Oficinas',
    category: 'Desenvolvimento',
    description:
      'Atividades que estimulam habilidades sociais, motoras, cognitivas e emocionais.',
  },
]

export function specialtyWhatsappMessage(title) {
  return `Olá, gostaria de saber mais sobre ${title} na Clínica Voe Alto.`
}
