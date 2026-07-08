import Container from '../ui/Container'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import SectionTitle from '../ui/SectionTitle'
import { whatsappUrl } from '../../data/clinic'

const teamMessage = 'Olá, gostaria de falar com a equipe da Clínica Voe Alto.'

const teamAreas = [
  {
    area: 'Psicologia',
    description:
      'Atendimento voltado ao desenvolvimento emocional, comportamental e à saúde mental.',
    icon: PsychologyIcon,
    accent: 'from-brand-light-pink/70 to-brand-blue/10',
  },
  {
    area: 'Psicopedagogia e Neuropsicopedagogia',
    description:
      'Apoio às dificuldades de aprendizagem, desenvolvimento cognitivo e processos educacionais.',
    icon: LearningIcon,
    accent: 'from-brand-blue/10 to-brand-light-pink/60',
  },
  {
    area: 'Neurologia',
    description:
      'Avaliação e acompanhamento especializado em demandas relacionadas ao neurodesenvolvimento.',
    icon: NeurologyIcon,
    accent: 'from-brand-light-pink/50 to-brand-white',
  },
  {
    area: 'Fonoaudiologia',
    description:
      'Cuidado relacionado à comunicação, linguagem, fala e desenvolvimento funcional.',
    icon: SpeechIcon,
    accent: 'from-brand-white to-brand-light-pink/55',
  },
  {
    area: 'Terapia Ocupacional',
    description:
      'Apoio à autonomia, rotina, habilidades funcionais e participação nas atividades do dia a dia.',
    icon: OccupationalIcon,
    accent: 'from-brand-blue/8 to-brand-light-pink/45',
  },
  {
    area: 'Musicoterapia e Psicomotricidade',
    description:
      'Recursos terapêuticos que favorecem expressão, movimento, interação e desenvolvimento.',
    icon: MovementIcon,
    accent: 'from-brand-light-pink/60 to-brand-blue/12',
  },
]

function PsychologyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
      <path d="M12 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
      <path d="M12 11v3" />
      <path d="M9 20h6" />
      <path d="M10 14a4 4 0 0 0-4 4" />
      <path d="M14 14a4 4 0 0 1 4 4" />
    </svg>
  )
}

function LearningIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      <path d="M8 7h6" />
      <path d="M8 11h8" />
    </svg>
  )
}

function NeurologyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M12 5v13" />
    </svg>
  )
}

function SpeechIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
      <path d="M12 6a3 3 0 1 0 0 6" />
      <path d="M12 9v9" />
      <path d="M8 18h8" />
      <path d="M9 6c0-2 1.5-3 3-3s3 1 3 3" />
    </svg>
  )
}

function OccupationalIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
      <path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2" />
      <path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v6" />
      <path d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2a8 8 0 0 1-8-8V8a2 2 0 1 1 4 0" />
    </svg>
  )
}

function MovementIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  )
}

function AreaPlaceholder({ icon: Icon, accent }) {
  return (
    <div
      className={`flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br text-brand-blue shadow-sm shadow-brand-dark/5 ${accent}`}
      aria-hidden="true"
    >
      <Icon />
    </div>
  )
}

export default function Team() {
  return (
    <section
      id="equipe"
      className="bg-brand-light-gray py-16 sm:py-20 lg:py-28"
      aria-label="Nossa equipe"
    >
      <Container>
        <SectionTitle
          eyebrow="Nossa equipe"
          title="Profissionais de diferentes especialidades trabalhando pelo mesmo cuidado"
          description="A Clínica Voe Alto reúne uma equipe multidisciplinar preparada para acolher, orientar e acompanhar cada paciente de forma individualizada."
          eyebrowVariant="blue"
        />

        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6">
          {teamAreas.map((item) => (
            <Card key={item.area} hover className="flex h-full flex-col p-6 sm:p-7">
              <AreaPlaceholder icon={item.icon} accent={item.accent} />

              <Badge variant="blue" className="mt-5 w-fit px-3 py-1 text-xs">
                Área de atuação
              </Badge>

              <h3 className="mt-3 text-lg font-semibold leading-snug text-brand-dark">
                {item.area}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-dark/70 sm:text-base">
                {item.description}
              </p>
            </Card>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-brand-dark/60 sm:text-base">
          As informações individuais dos profissionais serão adicionadas após validação
          oficial da clínica.
        </p>

        <div className="mt-8 flex justify-center sm:mt-10">
          <Button
            href={whatsappUrl(teamMessage)}
            variant="primary"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar com a equipe da Clínica Voe Alto pelo WhatsApp"
          >
            Falar com a equipe
          </Button>
        </div>
      </Container>
    </section>
  )
}
