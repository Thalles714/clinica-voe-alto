import Container from '../ui/Container'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'
import { whatsappUrl } from '../../data/clinic'

const processMessage =
  'Olá, gostaria de entender qual atendimento é mais indicado na Clínica Voe Alto.'

const steps = [
  {
    number: 1,
    title: 'Conte o que você está buscando',
    description:
      'Chame pelo WhatsApp e diga, em poucas palavras, a dúvida ou a necessidade de atendimento.',
  },
  {
    number: 2,
    title: 'Receba uma orientação inicial',
    description:
      'A equipe ouve o contexto e indica o caminho ou a especialidade mais adequada para o momento.',
  },
  {
    number: 3,
    title: 'Combine o próximo passo com a equipe',
    description:
      'Juntos, vocês alinham o atendimento e o horário disponível para começar com clareza.',
  },
]

export default function Process() {
  return (
    <section
      id="como-funciona"
      className="section-atmosphere-process relative overflow-hidden py-16 sm:py-20 lg:py-28"
      aria-label="Como funciona o atendimento"
    >
      <div
        className="pointer-events-none absolute -left-20 top-24 h-64 w-64 rounded-full bg-brand-blue/[0.05] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-brand-light-pink/30 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <SectionTitle
          eyebrow="Como funciona"
          title="Três passos simples para começar"
          description="Você não precisa saber exatamente qual especialidade procurar. A equipe acolhe a dúvida, orienta e combina o próximo passo."
          eyebrowVariant="blue"
        />

        <div className="process-steps">
          <div className="process-steps__rail" aria-hidden="true">
            <span className="process-steps__rail-fill" />
          </div>

          <ol className="process-steps__list">
            {steps.map((step, index) => (
              <Reveal key={step.number} as="li" className="process-step" delay={index * 90}>
                <article className="process-step__card">
                  <span className="process-step__number" aria-hidden="true">
                    {step.number}
                  </span>
                  <div className="process-step__copy">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal
          delay={180}
          className="mx-auto mt-8 max-w-3xl rounded-3xl border border-line bg-surface-elevated p-6 shadow-sm shadow-brand-dark/5 sm:mt-10 sm:p-8"
        >
          <p className="text-base font-semibold text-ink sm:text-lg">
            Para começar, você pode informar:
          </p>
          <p className="mt-1 text-sm leading-relaxed text-ink-muted">
            Não é um formulário obrigatório. Essas informações só ajudam a equipe a orientar
            melhor.
          </p>
          <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-ink-muted sm:grid-cols-2 sm:text-base">
            {[
              'Idade de quem precisa de atendimento',
              'Principal dificuldade percebida',
              'Se já existe diagnóstico ou encaminhamento',
              'Melhor horário para retorno',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-pink"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-12 flex justify-center lg:mt-14">
          <Button
            href={whatsappUrl(processMessage)}
            variant="primary"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Agendar pelo WhatsApp com a Clínica Voe Alto"
          >
            Agendar pelo WhatsApp
          </Button>
        </div>
      </Container>
    </section>
  )
}
