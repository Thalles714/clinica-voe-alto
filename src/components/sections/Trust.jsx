import Container from '../ui/Container'
import Card from '../ui/Card'
import SectionTitle from '../ui/SectionTitle'

const trustItems = [
  {
    title: 'Mais de 10 anos',
    description:
      'Uma trajetória dedicada ao cuidado, desenvolvimento e acolhimento de famílias em Goiânia.',
    icon: YearsIcon,
  },
  {
    title: 'Equipe multidisciplinar',
    description:
      'Profissionais de diferentes especialidades atuando de forma integrada para compreender cada necessidade.',
    icon: TeamIcon,
  },
  {
    title: 'Atendimento humanizado',
    description:
      'Escuta, respeito e acolhimento em todas as etapas do atendimento.',
    icon: HeartIcon,
  },
  {
    title: 'Ambiente acolhedor',
    description:
      'Uma estrutura pensada para transmitir segurança, tranquilidade e confiança.',
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
      className="bg-brand-light-gray py-16 sm:py-20 lg:py-28"
      aria-label="Por que escolher a Voe Alto"
    >
      <Container>
        <SectionTitle
          eyebrow="Por que escolher a Voe Alto"
          title="Um cuidado completo, acolhedor e especializado"
          description="Unimos experiência, equipe multidisciplinar e um ambiente preparado para oferecer um atendimento mais humano, seguro e próximo de cada família."
          eyebrowVariant="blue"
        />

        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-6">
          {trustItems.map((item) => {
            const Icon = item.icon

            return (
              <Card key={item.title} hover className="flex h-full flex-col p-7">
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-light-pink/50 text-brand-blue"
                  aria-hidden="true"
                >
                  <Icon />
                </div>
                <h3 className="text-lg font-semibold leading-snug text-brand-dark">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-dark/70 sm:text-base">
                  {item.description}
                </p>
              </Card>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
