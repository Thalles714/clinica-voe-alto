import { useState } from 'react'
import Container from '../ui/Container'
import Button from '../ui/Button'
import MobileMenu from './MobileMenu'
import { clinic, navLinks, whatsappUrl } from '../../data/clinic'

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-brand-light-gray/80 bg-brand-white/85 backdrop-blur-md">
      <Container>
        <div className="flex h-20 items-center justify-between gap-6">
          <a
            href="#inicio"
            className="shrink-0 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 focus-visible:ring-offset-2"
            aria-label={`${clinic.name} — voltar ao início`}
          >
            <img
              src={clinic.logo}
              alt={clinic.name}
              className="h-10 w-auto lg:h-11"
            />
          </a>

          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Navegação principal"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-brand-dark/75 transition-colors duration-200 hover:text-brand-blue focus:outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-brand-blue/30 focus-visible:ring-offset-2"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              href={whatsappUrl()}
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Agendar pelo WhatsApp"
            >
              Agendar pelo WhatsApp
            </Button>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl p-2.5 text-brand-dark transition-colors duration-200 hover:bg-brand-light-gray focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 focus-visible:ring-offset-2 lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu de navegação"
              aria-expanded={menuOpen}
            >
              <MenuIcon />
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
