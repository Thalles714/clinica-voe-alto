import Container from '../ui/Container'
import Card from '../ui/Card'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'
import InteractiveImage from '../ui/InteractiveImage'
import { whatsappUrl } from '../../data/clinic'

const audienceMessage =
  'Olá, gostaria de saber se a Clínica Voe Alto atende a minha necessidade.'

const audiences = [
  {
    title: 'Crianças',
    label: 'Primeiros passos',
    description:
      'Apoio ao desenvolvimento, à aprendizagem e ao comportamento, com orientação também para a família.',
    tags: ['Desenvolvimento', 'Aprendizagem', 'Comportamento'],
    image: '/imagens/publico/atendimento-criancas.webp',
    alt: 'Atendimento para crianças na Clínica Voe Alto',
    tone: 'pink',
  },
  {
    title: 'Adolescentes',
    label: 'Novas fases',
    description:
      'Acompanhamento nas mudanças emocionais, na escola, na socialização e na construção da autoestima.',
    tags: ['Saúde emocional', 'Escola', 'Socialização'],
    image: '/imagens/publico/atendimento-adolescentes.webp',
    alt: 'Atendimento para adolescentes na Clínica Voe Alto',
    tone: 'blue',
  },
  {
    title: 'Adultos',
    label: 'Cuidado contínuo',
    description:
      'Cuidado com saúde emocional, bem-estar, autoconhecimento e qualidade de vida.',
    tags: ['Saúde emocional', 'Bem-estar', 'Autoconhecimento'],
    image: '/imagens/publico/atendimento-adultos.webp',
    alt: 'Atendimento para adultos na Clínica Voe Alto',
    tone: 'blue',
  },
  {
    title: 'Famílias',
    label: 'Orientação conjunta',
    description:
      'Orientação para quem tem dúvidas, precisa de suporte e quer compreender melhor as necessidades dos filhos.',
    tags: ['Orientação', 'Suporte', 'Cuidado integrado'],
    image: '/imagens/publico/orientacao-familias.webp',
    alt: 'Orientação para famílias na Clínica Voe Alto',
    tone: 'pink',
  },
]

export default function Audience() {
  return (
    <section
      id="publico"
      className="section-atmosphere-soft-white relative overflow-hidden py-14 sm:py-20 lg:py-24"
      aria-label="Quem atendemos"
    >
      <div
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-brand-light-pink/35 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-8 h-64 w-64 rounded-full bg-brand-blue/[0.06] blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <SectionTitle
          eyebrow="Quem atendemos"
          title="Acompanhamento para diferentes fases da vida"
          description="Cada fase tem suas próprias necessidades. Oferecemos orientação e cuidado especializado para crianças, adolescentes, adultos e famílias."
          eyebrowVariant="blue"
        />

        <div className="grid gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-6">
          {audiences.map((item, index) => (
            <Reveal key={item.title} delay={index * 100}>
              <Card hover className="audience-card flex h-full flex-col overflow-hidden p-0">
                <InteractiveImage
                  src={item.image}
                  alt={item.alt}
                  width={800}
                  height={500}
                  intensity="medium"
                  reveal="mask"
                  objectPosition="object-center"
                  className={`audience-card__media relative aspect-[16/10] bg-surface-muted audience-card__media--${item.tone}`}
                >
                  <div
                    className={`audience-card__overlay audience-card__overlay--${item.tone}`}
                    aria-hidden="true"
                  />
                  <p className="audience-card__label" aria-hidden="true">
                    {item.label}
                  </p>
                </InteractiveImage>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-xl font-semibold leading-snug text-ink sm:text-2xl">
                    {item.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted sm:text-base">
                    {item.description}
                  </p>

                  <ul
                    className="mt-5 flex flex-wrap gap-2"
                    aria-label={`Áreas de atendimento para ${item.title}`}
                  >
                    {item.tags.map((tag) => (
                      <li key={tag}>
                        <span className="audience-tag inline-flex rounded-full px-3 py-1 text-xs font-medium">
                          {tag}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex justify-center lg:mt-12">
          <Button
            href={whatsappUrl(audienceMessage)}
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
