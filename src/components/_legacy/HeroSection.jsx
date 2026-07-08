import { ArrowRight, Star, Sparkles } from 'lucide-react'
import Container from '../ui/Container'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import ImagePlaceholder from './ImagePlaceholder'

const stats = [
  { value: '2.000+', label: 'Pacientes atendidos' },
  { value: '10+', label: 'Anos de experiência' },
  { value: '4.9', label: 'Avaliação Google' },
]

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-b from-primary-50/80 via-white to-white pt-24 lg:pt-32"
    >
      <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-primary-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-primary-50 blur-3xl" />

      <Container className="relative pb-16 lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl">
            <Badge>Clínica Odontológica Premium</Badge>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              Seu sorriso merece{' '}
              <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                o melhor cuidado
              </span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Tratamentos odontológicos de excelência com tecnologia de ponta,
              ambiente acolhedor e atendimento personalizado para toda a família.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                href="https://wa.me/5583999999999?text=Olá! Gostaria de agendar uma consulta."
                variant="primary"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Agendar consulta
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button href="#servicos" variant="secondary" size="lg">
                Conhecer serviços
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-3">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-primary-200 to-primary-300 text-xs font-bold text-primary-800"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-slate-500">
                  Avaliado com <strong className="text-slate-700">4.9/5</strong> por
                  nossos pacientes
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <ImagePlaceholder
              label="Foto da clínica"
              aspectRatio="aspect-[4/5] sm:aspect-square lg:aspect-[4/5]"
              icon={Sparkles}
              className="shadow-2xl shadow-primary-200/30"
            />
            <div className="absolute -bottom-4 -left-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:-bottom-6 sm:-left-6">
              <p className="text-2xl font-bold text-primary-600">10+</p>
              <p className="text-sm text-slate-500">Anos de experiência</p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 border-t border-slate-100 pt-12 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
