export const specialties = [
  {
    title: 'Psicologia Infantil',
    category: 'Psicologia',
    description:
      'Apoio emocional e comportamental para crianças em diferentes fases do desenvolvimento.',
    audience: 'Crianças',
    tags: ['Emoções', 'Comportamento', 'Desenvolvimento'],
  },
  {
    title: 'Psicologia para Adolescentes',
    category: 'Psicologia',
    description:
      'Acompanhamento para adolescentes em momentos de mudanças emocionais, sociais e escolares.',
    audience: 'Adolescentes',
    tags: ['Autoestima', 'Ansiedade', 'Relações'],
  },
  {
    title: 'Psicologia para Adultos',
    category: 'Psicologia',
    description:
      'Suporte psicológico para adultos que buscam equilíbrio emocional, clareza e bem-estar.',
    audience: 'Adultos',
    tags: ['Saúde mental', 'Autoconhecimento', 'Bem-estar'],
  },
  {
    title: 'Psicopedagogia',
    category: 'Aprendizagem',
    description:
      'Intervenção nas dificuldades de aprendizagem com foco no processo educacional da criança.',
    audience: 'Crianças e adolescentes',
    tags: ['Aprendizagem', 'Escola', 'Desenvolvimento'],
  },
  {
    title: 'Neuropsicopedagogia',
    category: 'Aprendizagem',
    description:
      'Integração entre neurociência e pedagogia para compreender e apoiar o aprendizado.',
    audience: 'Crianças e adolescentes',
    tags: ['Cognição', 'Aprendizagem', 'Neurodesenvolvimento'],
  },
  {
    title: 'Avaliação Neuropsicológica',
    category: 'Neuropsicologia',
    description:
      'Investigação detalhada das funções cognitivas para orientar diagnóstico e intervenção.',
    audience: 'Todas as idades',
    tags: ['Avaliação', 'Cognição', 'Diagnóstico'],
  },
  {
    title: 'Reabilitação Neuropsicológica',
    category: 'Neuropsicologia',
    description:
      'Programas de estimulação e reabilitação cognitiva adaptados às necessidades de cada paciente.',
    audience: 'Todas as idades',
    tags: ['Reabilitação', 'Cognição', 'Intervenção'],
  },
  {
    title: 'Neurologia',
    category: 'Neurologia',
    description:
      'Avaliação e acompanhamento neurológico para identificar e tratar alterações do sistema nervoso.',
    audience: 'Todas as idades',
    tags: ['Neurologia', 'Diagnóstico', 'Acompanhamento'],
  },
  {
    title: 'Fonoaudiologia',
    category: 'Comunicação',
    description:
      'Desenvolvimento da fala, linguagem, audição e funções relacionadas à comunicação.',
    audience: 'Crianças e adultos',
    tags: ['Fala', 'Linguagem', 'Comunicação'],
  },
  {
    title: 'Terapia Ocupacional',
    category: 'Desenvolvimento',
    description:
      'Promoção da autonomia e independência nas atividades do dia a dia e no desenvolvimento motor.',
    audience: 'Crianças e adultos',
    tags: ['Autonomia', 'Motricidade', 'Rotina'],
  },
  {
    title: 'Musicoterapia',
    category: 'Terapias integrativas',
    description:
      'Uso da música como recurso terapêutico para expressão, regulação emocional e desenvolvimento.',
    audience: 'Todas as idades',
    tags: ['Música', 'Expressão', 'Regulação'],
  },
  {
    title: 'Psicomotricidade',
    category: 'Desenvolvimento',
    description:
      'Integração entre corpo, movimento e emoção para favorecer o desenvolvimento global.',
    audience: 'Crianças',
    tags: ['Movimento', 'Corpo', 'Desenvolvimento'],
  },
]

export function specialtyWhatsappMessage(title) {
  return `Olá, gostaria de saber mais sobre ${title} na Clínica Voe Alto.`
}
