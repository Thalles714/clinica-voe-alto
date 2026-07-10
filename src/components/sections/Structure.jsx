import Container from '../ui/Container'
import Card from '../ui/Card'
import Button from '../ui/Button'
import SectionTitle from '../ui/SectionTitle'
import { locationUrl } from '../../data/clinic'

const galleryItems = [
  {
    title: 'Fachada da clínica',
    description: 'Fácil de encontrar e pronta para receber você.',
    src: '/imagens/estrutura/fachada-clinica-voe-alto.jpg',
    alt: 'Fachada da Clínica Voe Alto no St. dos Afonsos, em Aparecida de Goiânia',
    featured: true,
    objectPosition: 'object-[center_top]',
  },
  {
    title: 'Recepção',
    description: 'Um primeiro contato mais calmo e organizado.',
    src: '/imagens/estrutura/recepcao-clinica-voe-alto.jpg',
    alt: 'Recepção da Clínica Voe Alto',
    featured: false,
    objectPosition: 'object-center',
  },
  {
    title: 'Sala infantil',
    description: 'Espaço pensado para o cuidado com crianças.',
    src: '/imagens/estrutura/sala-atendimento-infantil.jpg',
    alt: 'Sala de atendimento infantil da Clínica Voe Alto',
    featured: false,
    objectPosition: 'object-center',
  },
  {
    title: 'Sala multidisciplinar',
    description: 'Ambientes reservados para consultas e acompanhamento.',
    src: '/imagens/estrutura/sala-atendimento-multidisciplinar.jpg',
    alt: 'Sala de atendimento multidisciplinar da Clínica Voe Alto',
    featured: false,
    objectPosition: 'object-center',
  },
]

const highlights = [
  'Localização de fácil acesso em Aparecida de Goiânia',
  'Ambientes pensados para transmitir segurança',
  'Espaço organizado, humano e confortável para famílias',
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
  priority = false,
}) {
  return (
    <figure
      className={[
        'group relative overflow-hidden rounded-3xl border border-brand-light-pink/40 bg-brand-light-gray shadow-md shadow-brand-dark/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-dark/10',
        featured
          ? 'aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[28rem]'
          : 'aspect-[16/10] lg:aspect-[16/10]',
      ].join(' ')}
    >
      <img
        src={src}
        alt={alt}
        width={featured ? 900 : 700}
        height={featured ? 1125 : 440}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] ${objectPosition}`}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-brand-dark/55 via-brand-dark/10 to-transparent"
        aria-hidden="true"
      />
      <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
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
          title="Um ambiente preparado para acolher com segurança e tranquilidade"
          description="Cada espaço foi pensado para tornar a experiência mais leve, organizada e confortável para crianças, adolescentes, adultos e famílias."
          eyebrowVariant="blue"
        />

        <div className="grid gap-4 lg:grid-cols-2 lg:items-stretch lg:gap-5">
          <GalleryImage {...featured} priority />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {secondary.map((item) => (
              <GalleryImage key={item.title} {...item} />
            ))}
          </div>
        </div>

        <figure className="group relative mt-4 overflow-hidden rounded-3xl border border-brand-light-pink/40 bg-brand-light-gray shadow-md shadow-brand-dark/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-dark/10 sm:mt-5">
          <div className="relative aspect-[21/9] min-h-[11rem] sm:min-h-[13rem] lg:min-h-[15rem]">
            <img
              src="/imagens/estrutura/ambiente-acolhedor-clinica.jpg"
              alt="Ambiente acolhedor e organizado da Clínica Voe Alto"
              width={1400}
              height={600}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-brand-dark/50 via-brand-dark/20 to-transparent"
              aria-hidden="true"
            />
            <figcaption className="absolute inset-y-0 left-0 flex max-w-md flex-col justify-end p-5 sm:p-7">
              <p className="text-lg font-semibold text-brand-white sm:text-xl">
                Ambiente preparado
              </p>
              <p className="mt-1 text-sm leading-relaxed text-brand-white/85 sm:text-base">
                Um espaço pensado para transmitir segurança, tranquilidade e confiança.
              </p>
            </figcaption>
          </div>
        </figure>

        <div className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-5 lg:mt-10">
          {highlights.map((text) => (
            <Card key={text} hover className="flex h-full items-start gap-3 p-5 sm:p-6">
              <CheckIcon />
              <p className="text-sm leading-relaxed text-brand-dark/80 sm:text-base">{text}</p>
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
