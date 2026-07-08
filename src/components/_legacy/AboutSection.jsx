import { Award, GraduationCap, CheckCircle2 } from 'lucide-react'
import Container from '../ui/Container'
import SectionHeading from './SectionHeading'
import ImagePlaceholder from './ImagePlaceholder'
import Button from '../ui/Button'

const highlights = [
  'Especialista em Estética Dental e Implantodontia',
  'Pós-graduação em Ortodontia',
  'Membro da Associação Brasileira de Odontologia',
  'Atendimento humanizado e personalizado',
]

export default function AboutSection() {
  return (
    <section id="sobre" className="bg-white py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative order-2 lg:order-1">
            <ImagePlaceholder
              label="Foto da Dra. Lauane Dantas"
              aspectRatio="aspect-[4/5]"
              icon={GraduationCap}
              className="shadow-xl shadow-slate-200/50"
            />
            <div className="absolute -right-4 top-8 rounded-2xl border border-slate-100 bg-white p-4 shadow-lg sm:-right-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">CRO-PB 00000</p>
                  <p className="text-xs text-slate-500">Registro profissional</p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <SectionHeading
              badge="Sobre a clínica"
              title="Dra. Lauane Dantas"
              subtitle="Apaixonada por transformar sorrisos e proporcionar experiências positivas em odontologia."
              align="left"
              className="mb-8 lg:mb-10"
            />

            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Com mais de 10 anos de experiência, a Dra. Lauane Dantas construiu
                uma clínica referência em João Pessoa, unindo expertise técnica e
                um olhar atento às necessidades de cada paciente.
              </p>
              <p>
                Formada pela Universidade Federal da Paraíba, complementou sua
                formação com especializações em estética dental e implantodontia,
                sempre buscando as técnicas mais modernas do mercado.
              </p>
            </div>

            <ul className="mt-8 space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
                  <span className="text-sm text-slate-700">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Button href="#contato" variant="primary" size="md">
                Entre em contato
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
