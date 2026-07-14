import Container from '../ui/Container'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import SectionTitle from '../ui/SectionTitle'
import InteractiveImage from '../ui/InteractiveImage'
import { whatsappUrl } from '../../data/clinic'

const teamMessage = 'Olá, gostaria de falar com a equipe da Clínica Voe Alto.'

const teamAreas = [
  {
    area: 'Aprendizagem e Neurodesenvolvimento',
    description:
      'Apoio a dificuldades escolares, desenvolvimento cognitivo e processos de aprendizagem.',
    image: '/imagens/equipe/area-aprendizagem-neurodesenvolvimento.webp',
    alt: 'Área de aprendizagem e neurodesenvolvimento da Clínica Voe Alto',
  },
  {
    area: 'Psicologia e Comportamento',
    description:
      'Cuidado emocional e comportamental em diferentes fases da vida, com escuta individualizada.',
    image: '/imagens/equipe/area-psicologia-comportamento.webp',
    alt: 'Área de psicologia e comportamento da Clínica Voe Alto',
  },
  {
    area: 'Comunicação e Linguagem',
    description:
      'Acompanhamento da comunicação, linguagem e fala para favorecer a expressão e a interação.',
    image: '/imagens/equipe/area-comunicacao-linguagem.webp',
    alt: 'Área de comunicação e linguagem da Clínica Voe Alto',
  },
  {
    area: 'Autonomia e Terapias Integradas',
    description:
      'Fortalecimento de rotina, habilidades funcionais e participação nas atividades do dia a dia.',
    image: '/imagens/equipe/area-autonomia-terapias-integradas.webp',
    alt: 'Área de autonomia e terapias integradas da Clínica Voe Alto',
  },
  {
    area: 'Acolhimento Familiar',
    description:
      'Orientação para famílias que querem compreender melhor as necessidades de quem amam.',
    image: '/imagens/equipe/area-acolhimento-familiar.webp',
    alt: 'Área de acolhimento familiar da Clínica Voe Alto',
  },
  {
    area: 'Orientação e Inclusão',
    description:
      'Suporte para construir caminhos mais seguros de desenvolvimento, inclusão e convivência.',
    image: '/imagens/equipe/area-orientacao-inclusao.webp',
    alt: 'Área de orientação e inclusão da Clínica Voe Alto',
  },
]

export default function Team() {
  return (
    <section
      id="equipe"
      className="section-atmosphere-soft-gray relative overflow-hidden py-14 sm:py-20 lg:py-24"
      aria-label="Nossa equipe"
    >
      <div
        className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-brand-light-pink/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-56 w-56 rounded-full bg-brand-blue/[0.04] blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <SectionTitle
          eyebrow="Nossa equipe"
          title="Profissionais de diferentes áreas trabalhando pelo mesmo cuidado"
          description="A Clínica Voe Alto reúne uma equipe multidisciplinar preparada para acolher, orientar e acompanhar cada paciente de forma individualizada."
          eyebrowVariant="blue"
        />

        <div className="team-banner mb-8 overflow-hidden rounded-3xl border border-line bg-surface shadow-md shadow-brand-dark/10 lg:mb-10 lg:grid lg:grid-cols-2 lg:items-stretch">
          <InteractiveImage
            src="/imagens/equipe/equipe-multidisciplinar-voe-alto.webp"
            alt="Equipe multidisciplinar da Clínica Voe Alto"
            width={1000}
            height={625}
            intensity="soft"
            reveal="wipe-up"
            className="relative aspect-[16/10] h-full min-h-[14rem] lg:aspect-auto lg:min-h-[20rem]"
            objectPosition="object-center"
          >
            <div className="team-banner__edge" aria-hidden="true" />
          </InteractiveImage>
          <div className="team-banner__copy flex flex-col justify-center p-6 sm:p-8 lg:p-9">
            <Badge variant="blue" className="w-fit px-3 py-1 text-xs">
              Equipe multidisciplinar
            </Badge>
            <h3 className="mt-3 text-xl font-semibold leading-snug text-ink sm:text-2xl">
              Cuidado coordenado, com olhar individualizado
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted sm:text-base">
              Diferentes áreas atuam juntas para compreender cada necessidade e indicar
              o acompanhamento mais adequado, com clareza, respeito e segurança.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {teamAreas.map((item) => (
            <Card key={item.area} hover className="flex h-full flex-col overflow-hidden p-0">
              <InteractiveImage
                src={item.image}
                alt={item.alt}
                width={640}
                height={400}
                intensity="soft"
                reveal="fade-scale"
                className="relative aspect-[16/10] bg-surface-muted"
                objectPosition="object-center"
              />
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="text-lg font-semibold leading-snug text-ink">
                  {item.area}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-muted">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-ink-muted sm:mt-10 sm:text-base">
          Nomes e registros dos profissionais serão publicados assim que a clínica
          validar oficialmente cada informação.
        </p>

        <div className="mt-7 flex justify-center sm:mt-8">
          <Button
            href={whatsappUrl(teamMessage)}
            variant="primary"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Agendar pelo WhatsApp com a equipe da Clínica Voe Alto"
          >
            Agendar pelo WhatsApp
          </Button>
        </div>
      </Container>
    </section>
  )
}
