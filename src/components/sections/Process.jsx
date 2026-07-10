import Container from '../ui/Container'
import Card from '../ui/Card'
import Button from '../ui/Button'
import SectionTitle from '../ui/SectionTitle'
import { whatsappUrl } from '../../data/clinic'

const processMessage =
  'Olá, gostaria de entender qual atendimento é mais indicado na Clínica Voe Alto.'

const steps = [
  {
    number: 1,
    title: 'Entre em contato',
    description: 'Chame pelo WhatsApp e conte, em poucas palavras, o que você procura.',
  },
  {
    number: 2,
    title: 'Conte sua necessidade',
    description: 'A equipe escuta com atenção, sem pressão e sem julgamento.',
  },
  {
    number: 3,
    title: 'Receba orientação inicial',
    description: 'Indicamos o caminho que faz mais sentido para o seu momento.',
  },
  {
    number: 4,
    title: 'Agende o atendimento',
    description: 'Combinamos o horário disponível para começar com tranquilidade.',
  },
  {
    number: 5,
    title: 'Acompanhe a evolução',
    description: 'O cuidado segue com orientação e atenção ao desenvolvimento.',
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
          title="Um caminho simples para começar o cuidado certo"
          description="Você não precisa saber exatamente qual atendimento procurar. Nossa equipe acolhe sua dúvida, entende sua necessidade e orienta o próximo passo."
          eyebrowVariant="blue"
        />

        <div className="relative">
          <div
            className="absolute left-6 top-0 hidden h-full w-px bg-brand-light-pink lg:hidden"
            aria-hidden="true"
          />
          <div
            className="absolute left-8 right-8 top-8 hidden h-px bg-brand-light-pink lg:block"
            aria-hidden="true"
          />

          <ol className="grid gap-5 lg:grid-cols-5 lg:gap-4 xl:gap-6">
            {steps.map((step, index) => (
              <li key={step.number} className="relative">
                <Card hover className="h-full p-5 sm:p-6 lg:pt-8">
                  <div className="flex gap-4 lg:flex-col lg:items-center lg:text-center">
                    <div
                      className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-blue text-sm font-bold text-brand-white shadow-sm shadow-brand-blue/20 lg:mx-auto"
                      aria-hidden="true"
                    >
                      {step.number}
                    </div>

                    <div className="flex-1 lg:mt-4">
                      <h3 className="text-base font-semibold leading-snug text-brand-dark sm:text-lg">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-brand-dark/70 sm:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className="absolute -bottom-3 left-6 h-5 w-px bg-brand-light-pink lg:hidden"
                      aria-hidden="true"
                    />
                  )}
                </Card>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 flex justify-center lg:mt-14">
          <Button
            href={whatsappUrl(processMessage)}
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
