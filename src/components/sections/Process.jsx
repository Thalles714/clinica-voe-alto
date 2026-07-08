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
    description:
      'Fale com a Clínica Voe Alto pelo WhatsApp e conte brevemente o que você procura.',
  },
  {
    number: 2,
    title: 'Entendemos sua necessidade',
    description:
      'Nossa equipe acolhe sua demanda com escuta e atenção, sem julgamentos.',
  },
  {
    number: 3,
    title: 'Indicamos o melhor caminho',
    description:
      'A partir das informações iniciais, orientamos qual atendimento pode fazer mais sentido.',
  },
  {
    number: 4,
    title: 'Agendamos o atendimento',
    description:
      'Combinamos o melhor horário disponível para iniciar o processo com tranquilidade.',
  },
  {
    number: 5,
    title: 'Acompanhamos cada etapa',
    description:
      'O cuidado continua com orientação, acompanhamento e atenção ao desenvolvimento do paciente.',
  },
]

export default function Process() {
  return (
    <section
      id="como-funciona"
      className="bg-brand-white py-16 sm:py-20 lg:py-28"
      aria-label="Como funciona o atendimento"
    >
      <Container>
        <SectionTitle
          eyebrow="Como funciona"
          title="Um caminho simples para começar o cuidado certo"
          description="Você não precisa saber exatamente qual atendimento procurar. Nossa equipe acolhe sua dúvida, entende sua necessidade e orienta o melhor próximo passo."
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
