import Container from '../ui/Container'
import Card from '../ui/Card'
import Button from '../ui/Button'
import SectionTitle from '../ui/SectionTitle'
import { whatsappUrl } from '../../data/clinic'

const audienceMessage =
  'Olá, gostaria de saber se a Clínica Voe Alto atende a minha necessidade.'

const audiences = [
  {
    title: 'Crianças',
    description:
      'Apoio ao desenvolvimento emocional, cognitivo, comportamental, social e escolar, com uma abordagem acolhedora para a criança e sua família.',
    tags: ['Desenvolvimento infantil', 'Aprendizagem', 'Comportamento'],
    icon: ChildrenIcon,
    accent: 'from-brand-light-pink/70 to-brand-blue/8',
  },
  {
    title: 'Adolescentes',
    description:
      'Acompanhamento para lidar com desafios emocionais, dificuldades escolares, socialização, autoestima e mudanças próprias dessa fase.',
    tags: ['Saúde emocional', 'Autoconhecimento', 'Orientação'],
    icon: TeensIcon,
    accent: 'from-brand-blue/10 to-brand-light-pink/55',
  },
  {
    title: 'Adultos',
    description:
      'Atendimento voltado ao cuidado emocional, qualidade de vida, ansiedade, estresse, autoconhecimento e desenvolvimento pessoal.',
    tags: ['Ansiedade', 'Bem-estar', 'Saúde mental'],
    icon: AdultsIcon,
    accent: 'from-brand-light-pink/50 to-brand-white',
  },
  {
    title: 'Famílias',
    description:
      'Orientação para responsáveis que buscam compreender melhor as necessidades dos filhos e encontrar o caminho mais adequado de cuidado.',
    tags: ['Acolhimento', 'Orientação', 'Cuidado integrado'],
    icon: FamiliesIcon,
    accent: 'from-brand-white to-brand-light-pink/60',
  },
]

function ChildrenIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
      <circle cx="12" cy="7" r="3" />
      <path d="M8 20v-2a4 4 0 0 1 8 0v2" />
      <path d="M6 12h2" />
      <path d="M16 12h2" />
    </svg>
  )
}

function TeensIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
      <circle cx="12" cy="6" r="3" />
      <path d="M12 9v4" />
      <path d="M9 20h6" />
      <path d="M10 13h4" />
    </svg>
  )
}

function AdultsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
      <circle cx="12" cy="7" r="4" />
      <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
    </svg>
  )
}

function FamiliesIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
      <circle cx="9" cy="7" r="2.5" />
      <circle cx="15" cy="7" r="2.5" />
      <path d="M4 20v-1a4 4 0 0 1 4-4h1" />
      <path d="M20 20v-1a4 4 0 0 0-3-3.87" />
      <circle cx="12" cy="11" r="2" />
      <path d="M10 20v-1a2 2 0 0 1 4 0v1" />
    </svg>
  )
}

function AudienceIcon({ icon: Icon, accent }) {
  return (
    <div
      className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-brand-blue shadow-sm shadow-brand-dark/5 ${accent}`}
      aria-hidden="true"
    >
      <Icon />
    </div>
  )
}

export default function Audience() {
  return (
    <section
      id="publico"
      className="relative overflow-hidden bg-brand-white py-16 sm:py-20 lg:py-28"
      aria-label="Quem atendemos"
    >
      <div
        className="pointer-events-none absolute -right-24 top-16 h-64 w-64 rounded-full bg-brand-light-pink/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-12 h-56 w-56 rounded-full bg-brand-blue/5 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <SectionTitle
          eyebrow="Quem atendemos"
          title="Acompanhamento para diferentes fases da vida"
          description="Cada fase tem suas próprias necessidades. A Clínica Voe Alto oferece acolhimento e orientação para crianças, adolescentes, adultos e famílias que buscam cuidado especializado."
          eyebrowVariant="blue"
        />

        <div className="grid gap-5 sm:gap-6 lg:grid-cols-2">
          {audiences.map((item) => (
            <Card key={item.title} hover className="flex h-full flex-col p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <AudienceIcon icon={item.icon} accent={item.accent} />
                <h3 className="text-xl font-semibold leading-snug text-brand-dark sm:text-2xl">
                  {item.title}
                </h3>
              </div>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-brand-dark/70 sm:text-base">
                {item.description}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Áreas de atendimento para ${item.title}`}>
                {item.tags.map((tag) => (
                  <li key={tag}>
                    <span className="inline-flex rounded-full bg-brand-light-pink/45 px-3 py-1 text-xs font-medium text-brand-blue">
                      {tag}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex justify-center lg:mt-14">
          <Button
            href={whatsappUrl(audienceMessage)}
            variant="primary"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Conversar com a Clínica Voe Alto pelo WhatsApp"
          >
            Conversar com a Clínica Voe Alto
          </Button>
        </div>
      </Container>
    </section>
  )
}
