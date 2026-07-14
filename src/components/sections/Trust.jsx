import Container from '../ui/Container'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'
import { clinic } from '../../data/clinic'

const trustItems = [
  {
    title: `${clinic.yearsOfExperience} anos de atuação`,
    description:
      'Tempo dedicado a ouvir famílias e acompanhar diferentes fases do desenvolvimento.',
    icon: YearsIcon,
  },
  {
    title: 'Equipe multidisciplinar',
    description:
      'Especialidades que se conversam para compreender a necessidade e orientar o cuidado.',
    icon: TeamIcon,
  },
  {
    title: 'Atendimento humanizado',
    description:
      'Escuta atenta da primeira conversa ao acompanhamento contínuo, sem pressa nem julgamento.',
    icon: HeartIcon,
  },
  {
    title: 'Ambiente preparado',
    description:
      'Espaços pensados para acolher com mais segurança e tranquilidade quem chega à clínica.',
    icon: HomeIcon,
  },
]

function YearsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M12 8v4l2.5 2.5" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  )
}

function TeamIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}

function HomeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

export default function Trust() {
  return (
    <section
      id="confianca"
      className="section-atmosphere-trust relative overflow-hidden py-14 sm:py-20 lg:py-24"
      aria-label="Por que escolher a Voe Alto"
    >
      <div
        className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-brand-blue/[0.07] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-brand-light-pink/25 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <SectionTitle
          eyebrow="Por que escolher a Voe Alto"
          title="Experiência, escuta e cuidado integrado"
          description="Uma clínica preparada para ouvir com atenção, orientar com clareza e acompanhar quem precisa de cuidado."
          eyebrowVariant="pink"
        />

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-5">
          {trustItems.map((item, index) => {
            const Icon = item.icon

            return (
              <Reveal key={item.title} delay={index * 90} as="article">
                <div className="card-hover group relative flex h-full flex-col border-t-2 border-brand-blue/80 bg-surface/85 px-5 pb-6 pt-5 backdrop-blur-sm sm:px-6 sm:pb-7 sm:pt-6">
                  <div
                    className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-brand-blue text-brand-white shadow-sm shadow-brand-blue/20"
                    aria-hidden="true"
                  >
                    <Icon />
                  </div>
                  <span className="mb-2 text-xs font-semibold tracking-[0.14em] text-ink-muted uppercase">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg font-semibold leading-snug text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-muted sm:text-[0.95rem]">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
