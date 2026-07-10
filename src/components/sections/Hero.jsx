import Container from '../ui/Container'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import { whatsappUrl, locationUrl } from '../../data/clinic'

const benefits = [
  'Atendimento infantil, adolescente e adulto',
  'Equipe multidisciplinar',
  '3 anos de atuação',
  'Orientação pelo WhatsApp',
]

const trustCards = [
  { label: '3 anos de cuidado', position: 'left-4 top-4 sm:left-5 sm:top-5' },
  { label: 'Equipe multidisciplinar', position: 'bottom-4 left-4 sm:bottom-5 sm:left-5' },
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
        className="pointer-events-none absolute -right-8 top-10 h-40 w-40 rounded-full bg-brand-light-pink/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-6 bottom-8 h-32 w-32 rounded-full bg-brand-blue/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative overflow-hidden rounded-[1.75rem] border border-brand-light-pink/40 bg-brand-light-gray shadow-xl shadow-brand-dark/10 sm:rounded-[2rem]">
        <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]">
          <img
            src="/imagens/hero/hero-clinica-voe-alto.jpg"
            alt="Ambiente acolhedor da Clínica Voe Alto em Aparecida de Goiânia"
            width={800}
            height={1000}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-brand-blue/40 via-brand-dark/10 to-brand-dark/5"
            aria-hidden="true"
          />
        </div>

        {trustCards.map((card) => (
          <div
            key={card.label}
            className={`absolute ${card.position} rounded-2xl border border-brand-white/90 bg-brand-white/95 px-3 py-2 text-xs font-semibold text-brand-blue shadow-md shadow-brand-dark/10 backdrop-blur-sm sm:px-3.5 sm:text-sm`}
          >
            {card.label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section
      id="inicio"
      className="section-atmosphere-hero relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pb-20"
    >
      <div
        className="pointer-events-none absolute -right-16 top-24 h-72 w-72 rounded-full bg-brand-blue/[0.06] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-brand-light-pink/30 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="max-w-xl">
            <Badge variant="blue">Clínica multidisciplinar em Aparecida de Goiânia</Badge>

            <h1 className="mt-5 text-[2rem] font-bold leading-[1.15] tracking-tight text-brand-dark sm:mt-6 sm:text-5xl lg:text-[3.15rem]">
              Cuidado multidisciplinar para cada fase do desenvolvimento
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-brand-dark/70 sm:mt-6 sm:text-lg">
              Atendimento para compreender necessidades emocionais, cognitivas,
              comportamentais, educacionais e familiares, e orientar o melhor caminho
              de acompanhamento para crianças, adolescentes, adultos e famílias.
            </p>

            <ul className="mt-6 space-y-3 sm:mt-7" aria-label="Diferenciais da clínica">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-sm leading-relaxed text-brand-dark/80 sm:text-base">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center sm:gap-4">
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
