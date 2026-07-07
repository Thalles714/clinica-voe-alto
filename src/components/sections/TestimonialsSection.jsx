import { Star, Quote } from 'lucide-react'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import Card from '../ui/Card'

const testimonials = [
  {
    name: 'Maria Silva',
    role: 'Paciente desde 2022',
    text: 'Experiência incrível! A Dra. Lauane é extremamente cuidadosa e profissional. Meu clareamento ficou perfeito e o atendimento superou todas as expectativas.',
    rating: 5,
  },
  {
    name: 'João Pedro Santos',
    role: 'Paciente desde 2021',
    text: 'Fiz meu implante aqui e recomendo de olhos fechados. Ambiente moderno, equipe atenciosa e resultado impecável. Finalmente recuperei a confiança no meu sorriso.',
    rating: 5,
  },
  {
    name: 'Ana Carolina Lima',
    role: 'Paciente desde 2023',
    text: 'Levei minha filha para a odontopediatria e ela adorou! A clínica é linda, limpa e a Dra. tem um jeito especial com crianças. Já somos pacientes da família toda.',
    rating: 5,
  },
]

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  return (
    <section id="depoimentos" className="bg-slate-50 py-20 lg:py-28">
      <Container>
        <SectionHeading
          badge="Depoimentos"
          title="O que nossos pacientes dizem"
          subtitle="A satisfação de quem confia em nós é a nossa maior recompensa. Veja o que nossos pacientes compartilham."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} hover className="flex flex-col">
              <Quote className="h-8 w-8 text-primary-200" />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="mt-6 border-t border-slate-100 pt-4">
                <StarRating count={testimonial.rating} />
                <p className="mt-3 font-semibold text-slate-900">{testimonial.name}</p>
                <p className="text-xs text-slate-500">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
