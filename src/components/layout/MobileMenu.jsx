import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Button from '../ui/Button'
import ThemeToggle from '../ui/ThemeToggle'
import { whatsappUrl } from '../../data/clinic'

export const MOBILE_NAV_ID = 'mobile-navigation'

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

function getFocusable(container) {
  if (!container) return []
  return [
    ...container.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ].filter((el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true')
}

export default function MobileMenu({ isOpen, onClose, links, returnFocusRef }) {
  const panelRef = useRef(null)
  const closeBtnRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined

    const previousOverflow = document.body.style.overflow
    const previousPaddingRight = document.body.style.paddingRight
    const scrollbarGap = window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    if (scrollbarGap > 0) {
      document.body.style.paddingRight = `${scrollbarGap}px`
    }

    const focusTimer = window.setTimeout(() => {
      closeBtnRef.current?.focus()
    }, 20)

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = getFocusable(panelRef.current)
      if (focusable.length === 0) {
        event.preventDefault()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (event.shiftKey) {
        if (active === first || !panelRef.current?.contains(active)) {
          event.preventDefault()
          last.focus()
        }
      } else if (active === last || !panelRef.current?.contains(active)) {
        event.preventDefault()
        first.focus()
      }
    }

    const onResize = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)

    const trigger = returnFocusRef?.current

    return () => {
      window.clearTimeout(focusTimer)
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = previousPaddingRight
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
      if (trigger && typeof trigger.focus === 'function') {
        trigger.focus()
      }
    }
  }, [isOpen, onClose, returnFocusRef])

  if (!isOpen || typeof document === 'undefined') return null

  return createPortal(
    <div
      id={MOBILE_NAV_ID}
      className="mobile-nav"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navegação"
    >
      <button
        type="button"
        className="mobile-nav__backdrop"
        onClick={onClose}
        aria-label="Fechar menu de navegação"
      />

      <div ref={panelRef} className="mobile-nav__panel">
        <div className="mobile-nav__header">
          <span className="mobile-nav__title">Menu</span>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="mobile-nav__close"
            aria-label="Fechar menu de navegação"
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="mobile-nav__links" aria-label="Navegação mobile">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="mobile-nav__link"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="mobile-nav__footer">
          <div className="mobile-nav__theme">
            <span className="mobile-nav__theme-label">Aparência</span>
            <ThemeToggle />
          </div>
          <Button
            href={whatsappUrl()}
            variant="primary"
            size="md"
            className="w-full"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            aria-label="Agendar avaliação pelo WhatsApp"
          >
            Agendar avaliação pelo WhatsApp
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
