import Container from '../ui/Container'
import Card from '../ui/Card'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'
import InteractiveImage from '../ui/InteractiveImage'
import { locationUrl } from '../../data/clinic'

const galleryItems = [
  {
    title: 'Receber',
    description:
      'Um ambiente acolhedor desde a chegada, pensado para receber crianças, adolescentes, adultos e famílias com tranquilidade.',
    src: '/imagens/estrutura/fachada-clinica-voe-alto.webp',
    alt: 'Ambiente ilustrativo de acolhimento da Clínica Voe Alto',
    featured: true,
    objectPosition: 'object-[center_top]',
    intensity: 'medium',
    reveal: 'mask',
    glow: true,
  },
  {
    title: 'Acolher',
    description: 'Ouvir com respeito e atenção para compreender cada necessidade.',
    src: '/imagens/estrutura/recepcao-clinica-voe-alto.webp',
    alt: 'Ambiente ilustrativo de recepção e cuidado da Clínica Voe Alto',
    featured: false,
    objectPosition: 'object-center',
    intensity: 'soft',
    reveal: 'wipe-left',
    glow: false,
  },
  {
    title: 'Desenvolver',
    description: 'Acompanhar cada etapa com estímulos adequados e respeito ao próprio ritmo.',
    src: '/imagens/estrutura/sala-atendimento-infantil.webp',
    alt: 'Ambiente ilustrativo de acompanhamento infantil da Clínica Voe Alto',
    featured: false,
    objectPosition: 'object-center',
    intensity: 'soft',
    reveal: 'wipe-up',
    glow: false,
  },
  {
    title: 'Capacitar',
    description: 'Fortalecer habilidades e ampliar possibilidades para o dia a dia.',
    src: '/imagens/estrutura/sala-atendimento-multidisciplinar.webp',
    alt: 'Ambiente ilustrativo de atendimento multidisciplinar da Clínica Voe Alto',
    featured: false,
    objectPosition: 'object-center',
    intensity: 'soft',
    reveal: 'fade-scale',
    glow: false,
  },
]

const highlights = [
  'Localização de fácil acesso em Aparecida de Goiânia',
  'Ambiente pensado para acolher crianças e famílias',
  'Cuidado presencial com orientação clara desde o primeiro contato',
]

function PinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 shrink-0"
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

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

function GalleryImage({
  title,
  description,
  src,
  alt,
  featured = false,
  objectPosition = 'object-center',
  intensity = 'soft',
  reveal = 'wipe-left',
  glow = false,
  priority = false,
}) {
  return (
    <figure
      className={[
        'structure-figure relative overflow-hidden rounded-3xl border border-line bg-surface-elevated shadow-md shadow-brand-dark/10',
        featured
          ? 'aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[28rem]'
          : 'aspect-[16/10] lg:aspect-[16/10]',
      ].join(' ')}
    >
      <InteractiveImage
        src={src}
        alt={alt}
        width={featured ? 900 : 700}
        height={featured ? 1125 : 440}
        priority={priority}
        intensity={intensity}
        reveal={reveal}
        glow={glow}
        objectPosition={objectPosition}
        className="absolute inset-0 h-full w-full"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-dark/45 via-brand-dark/10 to-transparent"
          aria-hidden="true"
        />
      </InteractiveImage>
      <figcaption className="structure-caption pointer-events-none absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
        <p className="text-base font-semibold text-brand-white sm:text-lg">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-brand-white/85">{description}</p>
      </figcaption>
    </figure>
  )
}

export default function Structure() {
  const featured = galleryItems.find((item) => item.featured)
  const secondary = galleryItems.filter((item) => !item.featured)

  return (
    <section
      id="estrutura"
      className="section-atmosphere-soft-gray relative overflow-hidden py-14 sm:py-20 lg:py-24"
      aria-label="Estrutura da clínica"
    >
      <Container className="relative z-10">
        <SectionTitle
          eyebrow="Nossa estrutura"
          title="Um ambiente preparado para acolher e acompanhar"
          description="Cada detalhe reflete os princípios que orientam o cuidado da Clínica Voe Alto."
          eyebrowVariant="blue"
        />

        <div className="grid gap-4 lg:grid-cols-2 lg:items-stretch lg:gap-5">
          <Reveal>
            <GalleryImage {...featured} priority />
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {secondary.map((item, index) => (
              <Reveal key={item.title} delay={(index + 1) * 90}>
                <GalleryImage {...item} />
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={160}>
          <figure className="structure-banner relative mt-4 overflow-hidden rounded-3xl border border-line bg-surface-elevated shadow-md shadow-brand-dark/10 sm:mt-5">
            <InteractiveImage
              src="/imagens/estrutura/ambiente-acolhedor-clinica.webp"
              alt="Ambiente ilustrativo de cuidado e convivência da Clínica Voe Alto"
              width={1400}
              height={600}
              intensity="soft"
              reveal="wipe-left"
              className="relative aspect-[21/9] min-h-[11rem] sm:min-h-[13rem] lg:min-h-[15rem]"
              objectPosition="object-center"
            >
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-dark/50 via-brand-dark/20 to-transparent"
                aria-hidden="true"
              />
            </InteractiveImage>
            <figcaption className="structure-caption pointer-events-none absolute inset-y-0 left-0 z-10 flex max-w-[15rem] flex-col justify-end p-4 sm:max-w-md sm:p-7">
              <p className="text-base font-semibold text-brand-white sm:text-xl">
                Envolver
              </p>
              <p className="mt-1 text-sm leading-snug text-brand-white/85 sm:text-base sm:leading-relaxed">
                Criar vínculos, favorecer a participação e construir caminhos em conjunto.
              </p>
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-5 lg:mt-10">
          {highlights.map((text) => (
            <Card key={text} hover className="flex h-full items-start gap-3 p-5 sm:p-6">
              <CheckIcon />
              <p className="text-sm leading-relaxed text-ink-muted sm:text-base">{text}</p>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-center lg:mt-10">
          <Button
            href={locationUrl()}
            variant="secondary"
            size="md"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver localização da Clínica Voe Alto no Google Maps"
          >
            <PinIcon />
            Ver localização
          </Button>
        </div>
      </Container>
    </section>
  )
}
