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

export default function Specialties() {
  return (
    <section
      id="especialidades"
      className="bg-brand-white py-16 sm:py-20 lg:py-28"
      aria-label="Especialidades da clínica"
    >
      <Container>
        <SectionTitle
          eyebrow="Especialidades"
          title="Cuidado multidisciplinar para cada fase do desenvolvimento"
          description="Da infância à vida adulta, a Clínica Voe Alto reúne diferentes especialidades para oferecer um acompanhamento mais completo, acolhedor e direcionado às necessidades de cada paciente."
          eyebrowVariant="blue"
        />

        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6">
          {specialties.map((specialty) => (
            <Card
              key={specialty.title}
              hover
              className="flex h-full flex-col p-6 sm:p-7"
            >
              <Badge variant="blue" className="w-fit px-3 py-1 text-xs">
                {specialty.category}
              </Badge>

              <h3 className="mt-4 text-lg font-semibold leading-snug text-brand-dark sm:text-xl">
                {specialty.title}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-dark/70 sm:text-base">
                {specialty.description}
              </p>

              <p className="mt-4 text-sm text-brand-dark/60">
                <span className="font-medium text-brand-dark/80">Público: </span>
                {specialty.audience}
              </p>

              <ul className="mt-4 flex flex-wrap gap-2" aria-label={`Áreas de ${specialty.title}`}>
                {specialty.tags.map((tag) => (
                  <li key={tag}>
                    <span className="inline-flex rounded-full bg-brand-light-pink/50 px-2.5 py-1 text-xs font-medium text-brand-blue">
                      {tag}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={whatsappUrl(specialtyWhatsappMessage(specialty.title))}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition-colors duration-200 hover:text-brand-pink focus:outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-brand-blue/30 focus-visible:ring-offset-2"
                aria-label={`Falar sobre ${specialty.title} pelo WhatsApp`}
              >
                Falar sobre este atendimento
                <ArrowIcon />
              </a>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
