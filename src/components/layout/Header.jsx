import { useState } from 'react'
import { Menu } from 'lucide-react'
import Container from '../ui/Container'
import Button from '../ui/Button'
import MobileMenu from './MobileMenu'

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Benefícios', href: '#beneficios' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Contato', href: '#contato' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-lg">
      <Container>
        <div className="flex h-16 items-center justify-between lg:h-20">
          <a href="#inicio" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-sm font-bold text-white">
              LD
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold leading-tight text-slate-900">
                Dra. Lauane Dantas
              </p>
              <p className="text-xs text-slate-500">Odontologia de Excelência</p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-primary-600"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              href="https://wa.me/5583999999999?text=Olá! Gostaria de agendar uma consulta."
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex"
              target="_blank"
              rel="noopener noreferrer"
            >
              Agendar consulta
            </Button>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </Container>

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={navLinks}
      />
    </header>
  )
}
