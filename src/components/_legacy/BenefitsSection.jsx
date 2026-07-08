import {
  Shield,
  Heart,
  Cpu,
  Clock,
} from 'lucide-react'
import Container from '../ui/Container'
import SectionHeading from './SectionHeading'
import Card from '../ui/Card'

const benefits = [
  {
    icon: Shield,
    title: 'Ambiente seguro e higienizado',
    description:
      'Protocolos rigorosos de biossegurança para garantir sua tranquilidade em cada visita.',
  },
  {
    icon: Cpu,
    title: 'Tecnologia de ponta',
    description:
      'Equipamentos modernos e técnicas avançadas para tratamentos mais precisos e confortáveis.',
  },
  {
    icon: Heart,
    title: 'Atendimento humanizado',
    description:
      'Cuidado personalizado que respeita suas necessidades e transforma a experiência odontológica.',
  },
  {
    icon: Clock,
    title: 'Horários flexíveis',
    description:
      'Agendamento prático com horários que se adaptam à sua rotina, inclusive aos sábados.',
  },
]

export default function BenefitsSection() {
  return (
    <section id="beneficios" className="bg-white py-20 lg:py-28">
      <Container>
        <SectionHeading
          badge="Por que nos escolher"
          title="Benefícios que fazem a diferença"
          subtitle="Combinamos expertise clínica, tecnologia e acolhimento para entregar resultados excepcionais no cuidado com seu sorriso."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <Card key={benefit.title} hover className="text-center lg:text-left">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 lg:mx-0">
                <benefit.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {benefit.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
