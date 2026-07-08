import Container from '../ui/Container'
import Card from '../ui/Card'
import Button from '../ui/Button'
import SectionTitle from '../ui/SectionTitle'
import { locationUrl } from '../../data/clinic'

const galleryItems = [
  {
    title: 'Fachada da clínica',
    description: 'Entrada acolhedora e de fácil identificação.',
    variant: 'facade',
    featured: true,
  },
  {
    title: 'Recepção acolhedora',
    description: 'Ambiente leve para receber famílias com tranquilidade.',
    variant: 'reception',
    featured: false,
  },
  {
    title: 'Salas de atendimento',
    description: 'Espaços reservados para consultas e acompanhamentos.',
    variant: 'rooms',
    featured: false,
  },
  {
    title: 'Espaços preparados para diferentes fases do desenvolvimento',
    description: 'Áreas adaptadas para crianças, adolescentes e adultos.',
    variant: 'spaces',
    featured: false,
  },
]

const highlights = [
  'Localização de fácil acesso em Goiânia',
  'Ambientes pensados para transmitir segurança',
  'Atendimento em um espaço humano, organizado e acolhedor',
]

const placeholderStyles = {
  facade:
    'from-brand-blue/15 via-brand-light-pink/40 to-brand-white',
  reception:
    'from-brand-light-pink/60 via-brand-white to-brand-blue/5',
  rooms:
    'from-brand-white via-brand-light-pink/35 to-brand-blue/10',
  spaces:
    'from-brand-blue/8 via-brand-light-pink/45 to-brand-white',
}

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

function GalleryPlaceholder({ title, description, variant, featured = false }) {
  return (
    <figure
      className={[
        'group relative overflow-hidden rounded-3xl border border-brand-light-pink/50 bg-gradient-to-br shadow-md shadow-brand-dark/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-dark/8',
        placeholderStyles[variant],
        featured ? 'aspect-[4/5] min-h-[22rem] lg:aspect-auto lg:min-h-[32rem]' : 'aspect-[5/4] min-h-[10rem]',
      ].join(' ')}
    >
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-brand-white/40 blur-2xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-brand-blue/10 blur-xl"
        aria-hidden="true"
      />

      <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
        <figcaption>
          <p className="text-base font-semibold text-brand-dark sm:text-lg">{title}</p>
          <p className="mt-1 text-sm leading-relaxed text-brand-dark/65">{description}</p>
          <p className="mt-3 text-xs font-medium uppercase tracking-wider text-brand-blue/70">
            Foto em breve
          </p>
        </figcaption>
      </div>

      <span className="sr-only">{title}</span>
    </figure>
  )
}

export default function Structure() {
  const featured = galleryItems.find((item) => item.featured)
  const secondary = galleryItems.filter((item) => !item.featured)

  return (
    <section
      id="estrutura"
      className="bg-brand-light-gray py-16 sm:py-20 lg:py-28"
      aria-label="Estrutura da clínica"
    >
      <Container>
        <SectionTitle
          eyebrow="Estrutura acolhedora"
          title="Um ambiente preparado para acolher com segurança e tranquilidade"
          description="Cada detalhe da Clínica Voe Alto foi pensado para oferecer uma experiência mais leve, humana e confortável para crianças, adolescentes, adultos e famílias."
          eyebrowVariant="blue"
        />

        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          <GalleryPlaceholder
            title={featured.title}
            description={featured.description}
            variant={featured.variant}
            featured
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 lg:gap-4">
            {secondary.map((item) => (
              <GalleryPlaceholder
                key={item.title}
                title={item.title}
                description={item.description}
                variant={item.variant}
              />
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3 sm:gap-5 lg:mt-12">
          {highlights.map((text) => (
            <Card key={text} hover className="flex items-start gap-3 p-5 sm:p-6">
              <CheckIcon />
              <p className="text-sm leading-relaxed text-brand-dark/80 sm:text-base">{text}</p>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex justify-center lg:mt-12">
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
