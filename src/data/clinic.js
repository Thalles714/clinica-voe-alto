export const clinic = {
  name: 'Clínica Voe Alto',
  legalEntity: 'Associação Goiana de Apoio aos Autistas e Famílias',
  whatsapp: '62981518882',
  phone: '62981518882',
  instagram: 'https://www.instagram.com/espaco.voealto/',
  instagramHandle: '@espaco.voealto',
  address:
    'Rua 101, nº 387, Quadra F-17, Lote 43, Setor Sul, Goiânia - GO',
  logo: '/imagens/brand/logo.svg',
  cnpj: '18.697.023/0001-62',
  tagline:
    'Atendimento multidisciplinar, acolhedor e especializado para crianças, adolescentes, adultos e famílias em Goiânia.',
  schedule: [
    { label: 'Segunda a sexta', value: '08h às 11h e 13h às 18h' },
    { label: 'Sábado', value: '08h às 11h' },
    { label: 'Domingo', value: 'Fechado' },
  ],
}

export const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Especialidades', href: '#especialidades' },
  { label: 'Estrutura', href: '#estrutura' },
  { label: 'Sobre', href: '#equipe' },
  { label: 'Contato', href: '#contato' },
]

export const whatsappBookingMessage =
  'Olá, gostaria de agendar uma avaliação na Clínica Voe Alto.'

export function formatPhone(phone) {
  return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7)}`
}

export function whatsappUrl(message = whatsappBookingMessage) {
  return `https://wa.me/55${clinic.whatsapp}?text=${encodeURIComponent(message)}`
}

export function locationUrl() {
  const query = encodeURIComponent(clinic.address)
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}
