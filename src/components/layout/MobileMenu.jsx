import Button from '../ui/Button'
import { whatsappUrl } from '../../data/clinic'

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <line x1="18" x2="6" y1="6" y2="18" />
      <line x1="6" x2="18" y1="6" y2="18" />
    </svg>
  )
}

export default function MobileMenu({ isOpen, onClose, links }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu de navegação">
      <div
        className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-brand-white shadow-2xl shadow-brand-dark/10">
        <div className="flex h-20 items-center justify-between border-b border-brand-light-gray px-6">
          <span className="text-base font-semibold text-brand-dark">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2.5 text-brand-dark transition-colors duration-200 hover:bg-brand-light-gray focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 focus-visible:ring-offset-2"
            aria-label="Fechar menu de navegação"
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-6" aria-label="Navegação mobile">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="rounded-2xl px-4 py-3.5 text-base font-medium text-brand-dark/85 transition-colors duration-200 hover:bg-brand-light-pink/40 hover:text-brand-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
            >
              {link.label}
            </a>
          ))}

          <div className="mt-6 border-t border-brand-light-gray pt-6">
            <Button
              href={whatsappUrl()}
              variant="primary"
              size="md"
              className="w-full"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              aria-label="Agendar pelo WhatsApp"
            >
              Agendar pelo WhatsApp
            </Button>
          </div>
        </nav>
      </div>
    </div>
  )
}
