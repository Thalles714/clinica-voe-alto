import { X } from 'lucide-react'
import Button from '../ui/Button'

export default function MobileMenu({ isOpen, onClose, links }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl">
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-6">
          <span className="font-bold text-slate-900">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
            aria-label="Fechar menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-6" aria-label="Navegação mobile">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="rounded-xl px-4 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-primary-50 hover:text-primary-700"
            >
              {link.label}
            </a>
          ))}

          <div className="mt-6 border-t border-slate-100 pt-6">
            <Button
              href="https://wa.me/5583999999999?text=Olá! Gostaria de agendar uma consulta."
              variant="primary"
              size="md"
              className="w-full"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
            >
              Agendar consulta
            </Button>
          </div>
        </nav>
      </div>
    </div>
  )
}
