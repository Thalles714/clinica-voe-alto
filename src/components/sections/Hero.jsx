import Container from '../ui/Container'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import { clinic, whatsappUrl, locationUrl } from '../../data/clinic'

const benefits = [
  'Atendimento infantil, adolescente e adulto',
  'Equipe multidisciplinar',
  'Mais de 10 anos de atuação',
  'Agendamento pelo WhatsApp',
]

const trustCards = [
  { label: '+10 anos', position: 'top-6 right-4 sm:right-6' },
  { label: 'Equipe multidisciplinar', position: 'bottom-20 left-4 sm:left-6' },
  { label: 'Atendimento humanizado', position: 'bottom-6 right-4 sm:right-8' },
]

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="mt-0.5 h-5 w-5 shrink-0 text-brand-pink"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      <div
        className="pointer-events-none absolute -right-8 top-10 h-48 w-48 rounded-full bg-brand-light-pink/50 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-6 bottom-8 h-40 w-40 rounded-full bg-brand-blue/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-brand-light-pink/60 bg-gradient-to-br from-brand-light-pink/50 via-brand-white to-brand-blue/5 shadow-xl shadow-brand-dark/5 sm:aspect-square lg:aspect-[4/5]">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(241,205,219,0.45),transparent_55%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(31,61,113,0.08),transparent_50%)]"
          aria-hidden="true"
        />

        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="rounded-3xl border border-brand-white/80 bg-brand-white/70 p-6 shadow-lg shadow-brand-dark/5 backdrop-blur-sm">
              <img
                src={clinic.logo}
                alt=""
                aria-hidden="true"
                className="mx-auto h-16 w-auto opacity-90 sm:h-20"
              />
            </div>
            <p className="max-w-[14rem] text-sm font-medium leading-relaxed text-brand-dark/60">
              Espaço acolhedor para o desenvolvimento integral
            </p>
          </div>
        </div>

        {trustCards.map((card) => (
          <div
            key={card.label}
            className={`absolute ${card.position} rounded-2xl border border-brand-white/90 bg-brand-white/90 px-4 py-2.5 text-xs font-semibold text-brand-blue shadow-lg shadow-brand-dark/5 backdrop-blur-sm sm:text-sm`}
          >
            {card.label}
          </div>
        ))}

        <div
          className="absolute left-1/2 top-1/4 h-24 w-24 -translate-x-1/2 rounded-full border border-brand-light-pink/40 bg-brand-light-pink/20"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-1/3 right-1/4 h-16 w-16 rounded-2xl border border-brand-blue/10 bg-brand-blue/5"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-brand-white pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pb-28"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-brand-light-pink/25 to-transparent"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="max-w-xl">
            <Badge variant="blue">Clínica multidisciplinar em Goiânia</Badge>

            <h1 className="mt-6 text-4xl font-bold leading-[1.12] tracking-tight text-brand-dark sm:text-5xl lg:text-[3.25rem]">
              Cuidado especializado para o desenvolvimento de crianças, adolescentes e
              adultos
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-brand-dark/70">
              Atendimento acolhedor e multidisciplinar para apoiar cada etapa do
              desenvolvimento emocional, cognitivo, comportamental e educacional.
            </p>

            <ul className="mt-8 space-y-3.5" aria-label="Diferenciais da clínica">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-base leading-relaxed text-brand-dark/80">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                href={whatsappUrl()}
                variant="primary"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Agendar pelo WhatsApp"
              >
                Agendar pelo WhatsApp
              </Button>
              <Button
                href={locationUrl()}
                variant="secondary"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ver localização da clínica no Google Maps"
              >
                Ver localização
              </Button>
            </div>
          </div>

          <HeroVisual />
        </div>
      </Container>
    </section>
  )
}
