import Container from '../ui/Container'
import AssistantChat from '../ui/AssistantChat'

const supportItems = [
  'Atendimento infantil, adolescente e adulto',
  'Equipe multidisciplinar',
  'Localização em Aparecida de Goiânia',
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
      className="bg-brand-light-gray py-16 pb-24 sm:py-20 sm:pb-24 lg:py-28 lg:pb-28"
    >
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-brand-blue shadow-xl shadow-brand-blue/25">
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-blue via-brand-blue to-[#18325c]"
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
                Pronto para o próximo passo
              </span>

              <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-brand-white sm:text-4xl lg:text-[2.5rem]">
                Converse com a Clínica Voe Alto e entenda o melhor caminho de cuidado
              </h2>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-white/80 sm:text-lg">
                Você não precisa decidir tudo sozinho. Use o assistente para iniciar o
                contato. A equipe humana ouve sua necessidade e orienta o próximo passo
                pelo WhatsApp.
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

              <p className="mt-8 max-w-md text-sm leading-relaxed text-brand-white/70 sm:text-base">
                <span className="lg:hidden">
                  Escolha uma opção no assistente para iniciar o contato pelo WhatsApp.
                </span>
                <span className="hidden lg:inline">
                  Escolha uma opção no assistente ao lado para iniciar o contato pelo
                  WhatsApp.
                </span>
              </p>
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
