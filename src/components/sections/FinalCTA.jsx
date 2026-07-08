import Container from '../ui/Container'
import Button from '../ui/Button'
import { whatsappUrl } from '../../data/clinic'

const finalCtaMessage =
  'Olá, gostaria de agendar uma avaliação na Clínica Voe Alto.'

const supportItems = [
  'Atendimento infantil, adolescente e adulto',
  'Equipe multidisciplinar',
  'Localização em Goiânia',
]

const visualBadges = [
  'Acolhimento',
  'Orientação personalizada',
  'Cuidado integrado',
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

function CtaVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div
        className="pointer-events-none absolute -right-4 top-0 h-40 w-40 rounded-full bg-brand-pink/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-6 -left-6 h-36 w-36 rounded-full bg-brand-light-pink/20 blur-2xl"
        aria-hidden="true"
      />

      <div className="relative aspect-square overflow-hidden rounded-3xl border border-brand-white/10 bg-brand-white/5 p-6 sm:p-8">
        <div
          className="absolute inset-0 bg-gradient-to-br from-brand-pink/15 via-transparent to-brand-light-pink/10"
          aria-hidden="true"
        />

        <div className="relative flex h-full flex-col items-center justify-center gap-4">
          <div
            className="flex h-24 w-24 items-center justify-center rounded-full border border-brand-light-pink/30 bg-brand-light-pink/15"
            aria-hidden="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-10 w-10 text-brand-light-pink"
              aria-hidden="true"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>

          <p className="max-w-[12rem] text-center text-sm font-medium leading-relaxed text-brand-white/80">
            Estamos prontos para ouvir você
          </p>
        </div>

        {visualBadges.map((label, index) => (
          <div
            key={label}
            className={[
              'absolute rounded-2xl border border-brand-white/15 bg-brand-white/10 px-3 py-2 text-xs font-semibold text-brand-white backdrop-blur-sm sm:text-sm',
              index === 0 && 'left-4 top-6 sm:left-6',
              index === 1 && 'bottom-16 right-4 sm:right-6',
              index === 2 && 'bottom-6 left-6 sm:left-10',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-hidden="true"
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function FinalCTA() {
  return (
    <section id="contato" className="bg-brand-light-gray py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-brand-blue shadow-xl shadow-brand-blue/20">
          <div className="relative grid gap-10 p-8 sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-12 lg:p-14 xl:p-16">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-pink/15 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-brand-light-pink/10 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative">
              <span className="inline-flex rounded-full bg-brand-light-pink/20 px-4 py-1.5 text-sm font-semibold tracking-wide text-brand-light-pink ring-1 ring-brand-light-pink/25">
                Comece com acolhimento
              </span>

              <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-brand-white sm:text-4xl lg:text-[2.5rem]">
                Converse com a Clínica Voe Alto e entenda o melhor caminho para o
                seu cuidado
              </h2>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-white/80 sm:text-lg">
                Você não precisa tomar essa decisão sozinho. Nossa equipe pode ouvir
                sua necessidade, esclarecer suas dúvidas e orientar o próximo passo
                com atenção e respeito.
              </p>

              <ul className="mt-8 space-y-3" aria-label="Diferenciais da clínica">
                {supportItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-sm leading-relaxed text-brand-white/85 sm:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Button
                  href={whatsappUrl(finalCtaMessage)}
                  variant="primary"
                  size="lg"
                  className="w-full focus:ring-offset-brand-blue sm:w-auto"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Agendar pelo WhatsApp com a Clínica Voe Alto"
                >
                  Agendar pelo WhatsApp
                </Button>
              </div>
            </div>

            <CtaVisual />
          </div>
        </div>
      </Container>
    </section>
  )
}
