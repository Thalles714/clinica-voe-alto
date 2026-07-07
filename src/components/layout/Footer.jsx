import { Share2, Globe, MapPin, Phone, Mail } from 'lucide-react'
import Container from '../ui/Container'

const footerLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Benefícios', href: '#beneficios' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Contato', href: '#contato' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-sm font-bold text-white">
                LD
              </div>
              <div>
                <p className="font-bold text-white">Dra. Lauane Dantas</p>
                <p className="text-xs text-slate-400">Odontologia de Excelência</p>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Cuidamos do seu sorriso com tecnologia de ponta, conforto e
              atendimento humanizado.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Navegação
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:text-primary-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Contato
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
                <span>Rua Exemplo, 123 — Centro, João Pessoa — PB</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm">
                <Phone className="h-4 w-4 shrink-0 text-primary-400" />
                <a href="tel:+5583999999999" className="hover:text-primary-400">
                  (83) 99999-9999
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm">
                <Mail className="h-4 w-4 shrink-0 text-primary-400" />
                <a
                  href="mailto:contato@lauanedantas.com.br"
                  className="hover:text-primary-400"
                >
                  contato@lauanedantas.com.br
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Horário
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Seg — Sex: 8h às 18h</li>
              <li>Sábado: 8h às 12h</li>
              <li>Domingo: Fechado</li>
            </ul>

            <div className="mt-6 flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-colors hover:bg-primary-600 hover:text-white"
                aria-label="Instagram"
              >
                <Share2 className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-colors hover:bg-primary-600 hover:text-white"
                aria-label="Facebook"
              >
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">
            © {currentYear} Clínica Odontológica Dra. Lauane Dantas. Todos os
            direitos reservados.
          </p>
          <p className="text-xs text-slate-600">CRO-PB 00000</p>
        </div>
      </Container>
    </footer>
  )
}
