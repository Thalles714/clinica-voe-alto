import { useCallback, useEffect, useRef, useState } from 'react'
import Button from '../ui/Button'
import MobileMenu, { MOBILE_NAV_ID } from './MobileMenu'
import { clinic, navLinks, whatsappUrl } from '../../data/clinic'

/**
 * Top bar motion:
 * - starts expanded over the Hero
 * - morphs into a deterministic centered pill after a short scroll
 * - stays visible for the rest of the page (no auto-hide)
 * - never measures transformed content or scales the logo
 */
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
      className="h-5 w-5"
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
  const [isCompact, setIsCompact] = useState(false)

  const menuBtnRef = useRef(null)
  const scrollRafRef = useRef(0)

  useEffect(() => {
    const update = () => {
      scrollRafRef.current = 0
      const y = window.scrollY
      setIsCompact((current) => {
        const next = current ? y > 24 : y > 88
        return current === next ? current : next
      })
    }

    const onScroll = () => {
      if (scrollRafRef.current) return
      scrollRafRef.current = window.requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (scrollRafRef.current) {
        window.cancelAnimationFrame(scrollRafRef.current)
      }
    }
  }, [])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <header
      data-header-state={isCompact ? 'compact' : 'expanded'}
      className={[
        'site-header',
        isCompact ? 'is-compact' : 'is-expanded',
        menuOpen ? 'is-menu-open' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="site-header__inner">
        <span className="site-header__bg" aria-hidden="true" />

        <div className="site-header__head">
          <a
            href="#inicio"
            className="site-header__logo ui-button"
            aria-label={`${clinic.name}, voltar ao início`}
            onClick={(event) => {
              event.preventDefault()
              closeMenu()
              const reduceMotion = window.matchMedia(
                '(prefers-reduced-motion: reduce)',
              ).matches
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: reduceMotion ? 'auto' : 'smooth',
              })
              const { pathname, search } = window.location
              if (window.location.hash) {
                window.history.replaceState(null, '', `${pathname}${search}`)
              }
              window.requestAnimationFrame(() => {
                window.dispatchEvent(new Event('scroll'))
              })
            }}
          >
            <img
              src={clinic.logo}
              alt={clinic.name}
              width={120}
              height={48}
              decoding="async"
              className="site-header__logo-img"
            />
          </a>

          <nav className="site-header__nav" aria-label="Navegação principal">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="site-header__link ui-button">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="site-header__actions">
            <Button
              href={whatsappUrl()}
              variant="primary"
              size="sm"
              className="site-header__cta"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Agendar avaliação pelo WhatsApp"
            >
              Agendar avaliação
            </Button>

            <button
              ref={menuBtnRef}
              type="button"
              className="site-header__menu-btn"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu de navegação"
              aria-expanded={menuOpen}
              aria-controls={MOBILE_NAV_ID}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={menuOpen}
        onClose={closeMenu}
        links={navLinks}
        returnFocusRef={menuBtnRef}
      />
    </header>
  )
}
