export const clinic = {
  name: 'Clínica Voe Alto',
  legalEntity: 'Associação Goiana de Apoio aos Autistas e Famílias',
  whatsapp: '62981518882',
  phone: '62981518882',
  instagram: 'https://www.instagram.com/espaco.voealto/',
  instagramHandle: '@espaco.voealto',
  address:
    'Rua 101, nº 387, Quadra F-17, Lote 43, Setor Sul, Goiânia - GO',
  addressShort: 'Rua 101, nº 387, Setor Sul, Goiânia - GO',
  logo: '/imagens/brand/logo-sem-fundo.png',
  cnpj: '18.697.023/0001-62',
  yearsOfExperience: 3,
  tagline:
    'Atendimento multidisciplinar e especializado para crianças, adolescentes, adultos e famílias.',
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
  { label: 'Equipe', href: '#equipe' },
  { label: 'Dúvidas', href: '#faq' },
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
  return 'https://www.google.com/maps/place/Voe+Alto+Espa%C3%A7o+multidisciplinar/@-16.7427039,-49.2794693,15.5z/data=!4m6!3m5!1s0x935ef100465ec6cb:0x1fb50ec400621750!8m2!3d-16.7419444!4d-49.2731056!16s%2Fg%2F11y5yk9pmq?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D'
}
