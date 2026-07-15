import Container from '../ui/Container'
import InteractiveImage from '../ui/InteractiveImage'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'
import { specialties, specialtyWhatsappMessage } from '../../data/specialties'
import { whatsappUrl } from '../../data/clinic'

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="specialty-card__arrow h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function SpecialtyCard({ specialty, index }) {
  const ctaText = specialty.ctaLabel ?? `Falar sobre ${specialty.title}`

  return (
    <Reveal
      as="li"
      delay={(index % 3) * 70}
      className="specialties-grid__item h-full"
    >
      <article className="specialty-card group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-sm shadow-brand-dark/5">
        <InteractiveImage
          src={specialty.image}
          alt={specialty.alt}
          width={specialty.imageWidth}
          height={specialty.imageHeight}
          intensity="soft"
          reveal="fade-scale"
          className="specialty-card__media relative aspect-[16/10] bg-surface-muted"
          objectPosition={specialty.objectPosition ?? 'object-center'}
        />

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <span className="specialty-card__category">{specialty.category}</span>
          <h3 className="mt-3 text-lg font-semibold leading-snug text-ink sm:text-xl">
            {specialty.title}
          </h3>
          <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-muted sm:text-[0.95rem]">
            {specialty.description}
          </p>
          <a
            href={whatsappUrl(specialtyWhatsappMessage(specialty.title))}
            target="_blank"
            rel="noopener noreferrer"
            className="ui-button specialty-card__cta mt-5 inline-flex min-h-14 w-full items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-semibold leading-snug focus:outline-none"
            aria-label={`${ctaText} pelo WhatsApp`}
          >
            <span>{ctaText}</span>
            <ArrowIcon />
          </a>
        </div>
      </article>
    </Reveal>
  )
}

export default function Specialties() {
  return (
    <section
      id="especialidades"
      className="section-atmosphere-specialties relative overflow-hidden py-14 sm:py-20 lg:py-24"
      aria-label="Especialidades da clínica"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-56 w-[36rem] -translate-x-1/2 rounded-full bg-brand-light-pink/20 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <SectionTitle
          eyebrow="Especialidades"
          title="Diferentes especialidades para cada fase e necessidade"
          description="Psicologia, Psicopedagogia, Fonoaudiologia, Terapia ABA, Neurologia e outros atendimentos em um só lugar. Se houver dúvida, a equipe orienta qual especialidade procurar."
          eyebrowVariant="blue"
        />

        <ul
          className="specialties-grid grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          aria-label="Lista de especialidades"
        >
          {specialties.map((specialty, index) => (
            <SpecialtyCard key={specialty.title} specialty={specialty} index={index} />
          ))}
        </ul>
      </Container>
    </section>
  )
}
