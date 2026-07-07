import {
  Smile,
  Sparkles,
  AlignCenter,
  Baby,
  Stethoscope,
  Sun,
} from 'lucide-react'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import Card from '../ui/Card'
import Button from '../ui/Button'

const services = [
  {
    icon: Sparkles,
    title: 'Clareamento Dental',
    description:
      'Recupere a luminosidade natural dos seus dentes com procedimentos seguros e eficazes.',
    popular: true,
  },
  {
    icon: Smile,
    title: 'Implantes Dentários',
    description:
      'Reposição de dentes com soluções duradouras e aparência natural.',
  },
  {
    icon: AlignCenter,
    title: 'Ortodontia',
    description:
      'Aparelhos fixos e alinhadores invisíveis para um sorriso harmonioso.',
  },
  {
    icon: Stethoscope,
    title: 'Limpeza e Prevenção',
    description:
      'Profilaxia completa e orientação para manter sua saúde bucal em dia.',
  },
  {
    icon: Sun,
    title: 'Estética Dental',
    description:
      'Lentes de contato, facetas e harmonização para o sorriso dos seus sonhos.',
  },
  {
    icon: Baby,
    title: 'Odontopediatria',
    description:
      'Atendimento especializado e lúdico para crianças se sentirem à vontade.',
  },
]

export default function ServicesSection() {
  return (
    <section id="servicos" className="bg-slate-50 py-20 lg:py-28">
      <Container>
        <SectionHeading
          badge="Nossos serviços"
          title="Tratamentos completos para seu sorriso"
          subtitle="Oferecemos uma gama completa de procedimentos odontológicos com foco em qualidade, conforto e resultados duradouros."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} hover className="relative">
              {service.popular && (
                <span className="absolute right-4 top-4 rounded-full bg-accent-400/20 px-3 py-1 text-xs font-semibold text-amber-700">
                  Popular
                </span>
              )}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600 text-white">
                <service.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {service.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            href="https://wa.me/5583999999999?text=Olá! Gostaria de saber mais sobre os serviços."
            variant="primary"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tirar dúvidas no WhatsApp
          </Button>
        </div>
      </Container>
    </section>
  )
}
