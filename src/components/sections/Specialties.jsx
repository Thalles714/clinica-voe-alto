import Container from '../ui/Container'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import SectionTitle from '../ui/SectionTitle'
import { specialties, specialtyWhatsappMessage } from '../../data/specialties'
import { whatsappUrl } from '../../data/clinic'

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
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

function SpecialtyCard({ specialty, decorative = false }) {
  return (
    <Card
      hover={!decorative}
      className="flex h-full w-[340px] shrink-0 flex-col p-5 sm:p-6"
    >
      <Badge variant="blue" className="w-fit px-3 py-1 text-xs">
        {specialty.category}
      </Badge>

      <h3 className="mt-3 text-lg font-semibold leading-snug text-brand-dark">
        {specialty.title}
      </h3>

      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-brand-dark/70">
        {specialty.description}
      </p>

      {decorative ? (
        <span
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue"
          aria-hidden="true"
        >
          Falar sobre este atendimento
          <ArrowIcon />
        </span>
      ) : (
        <a
          href={whatsappUrl(specialtyWhatsappMessage(specialty.title))}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition-colors duration-200 hover:text-brand-pink focus:outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-brand-blue/30 focus-visible:ring-offset-2"
          aria-label={`Falar sobre ${specialty.title} pelo WhatsApp`}
        >
          Falar sobre este atendimento
          <ArrowIcon />
        </a>
      )}
    </Card>
  )
}

function SpecialtySet({ decorative = false }) {
  return (
    <div
      className="specialties-marquee-set"
      role={decorative ? undefined : 'list'}
      aria-label={decorative ? undefined : 'Lista de especialidades'}
      aria-hidden={decorative ? true : undefined}
    >
      {specialties.map((specialty) => (
        <div
          key={`${decorative ? 'dup-' : ''}${specialty.title}`}
          className="shrink-0"
          role={decorative ? undefined : 'listitem'}
        >
          <SpecialtyCard specialty={specialty} decorative={decorative} />
        </div>
      ))}
    </div>
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
          title="Cuidado multidisciplinar para desenvolvimento, autonomia e bem-estar"
          description="Da aprendizagem ao comportamento, da comunicação ao suporte familiar, reunimos especialidades que ajudam a compreender necessidades e orientar o cuidado mais adequado. Você não precisa saber exatamente qual atendimento procurar antes de entrar em contato."
          eyebrowVariant="blue"
        />
      </Container>

      {/* Mobile: manual horizontal snap scroll */}
      <div className="relative z-10 md:hidden">
        <Container>
          <div
            className="specialties-scrollbar-hide -mx-1 flex gap-4 overflow-x-auto px-1 pb-2 snap-x snap-mandatory"
            role="list"
            aria-label="Lista de especialidades"
          >
            {specialties.map((specialty) => (
              <div key={specialty.title} className="snap-start shrink-0" role="listitem">
                <SpecialtyCard specialty={specialty} />
              </div>
            ))}
          </div>
          <p className="mt-5 text-center text-sm text-brand-dark/55">
            Arraste para ver mais especialidades.
          </p>
        </Container>
      </div>

      {/* Desktop / tablet+: calm continuous marquee */}
      <div className="relative z-10 hidden md:block">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#faf7f8] via-brand-white/90 to-transparent xl:w-24"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#faf7f8] via-brand-white/90 to-transparent xl:w-24"
          aria-hidden="true"
        />

        <div className="specialties-marquee">
          <div className="specialties-marquee-track">
            <SpecialtySet />
            <SpecialtySet decorative />
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-brand-dark/55">
          Passe o mouse ou foque nos cards para pausar e conhecer cada atendimento.
        </p>
      </div>
    </section>
  )
}
