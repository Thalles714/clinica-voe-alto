import Container from '../ui/Container'
import Button from '../ui/Button'
import AssistantChat from '../ui/AssistantChat'
import { whatsappUrl } from '../../data/clinic'

const finalMessage =
  'Olá! Gostaria de receber orientação sobre o atendimento da Clínica Voe Alto.'

const supportItems = [
  'Atendimento infantil, adolescente e adulto',
  'Equipe multidisciplinar',
  'Localização em Goiânia',
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

export default function FinalCTA() {
  return (
    <section
      id="contato"
      className="bg-surface-muted py-16 pb-24 sm:py-20 sm:pb-24 lg:py-28 lg:pb-28"
    >
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-brand-blue shadow-xl shadow-brand-blue/25">
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-blue via-brand-blue to-brand-blue/90"
            aria-hidden="true"
          />
          <div className="relative grid gap-8 p-6 sm:gap-10 sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-12 lg:p-14 xl:p-16">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-pink/20 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-brand-light-pink/15 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative z-10">
              <span className="inline-flex rounded-full bg-brand-light-pink/20 px-4 py-1.5 text-sm font-semibold tracking-wide text-brand-light-pink ring-1 ring-brand-light-pink/25">
                Vamos conversar
              </span>

              <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-brand-white sm:text-4xl lg:text-[2.5rem]">
                Fale com a Clínica Voe Alto e entenda o melhor caminho de cuidado
              </h2>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-white/80 sm:text-lg">
                Se já sabe o que precisa, fale direto com a equipe. Se ainda estiver em dúvida,
                use o assistente para escolher o tema antes de seguir no WhatsApp.
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

              <div className="mt-8">
                <Button
                  href={whatsappUrl(finalMessage)}
                  variant="primary"
                  size="lg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="final-cta__direct"
                  aria-label="Falar com a equipe da Clínica Voe Alto pelo WhatsApp"
                >
                  Falar com a equipe
                </Button>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-brand-white/70">
                  Caminho direto para orientação. O assistente ao lado ajuda quem prefere
                  escolher uma opção primeiro.
                </p>
              </div>
            </div>

            <div className="relative z-10">
              <AssistantChat />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
