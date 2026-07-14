import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Button from '../ui/Button'
import MobileMenu, { MOBILE_NAV_ID } from './MobileMenu'
import ThemeToggle from '../ui/ThemeToggle'
import { clinic, navLinks, whatsappUrl } from '../../data/clinic'

/**
 * Top bar motion — Wolverine animacao-top-bar:
 * - inner offset settles on scroll
 * - width morphs in px (fluid) from full → content-hugging pill
 * - original logo asset scales; no custom wordmark
 * - hide only after hero ends, on scroll down
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
  const [compact, setCompact] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [barWidth, setBarWidth] = useState(undefined)

  const shellRef = useRef(null)
  const headRef = useRef(null)
  const menuBtnRef = useRef(null)
  const lastYRef = useRef(0)
  const tickingRef = useRef(false)
  const compactRef = useRef(false)

  useEffect(() => {
    compactRef.current = compact
  }, [compact])

  useLayoutEffect(() => {
    const measureCompactWidth = () => {
      const head = headRef.current
      if (!head) return 0

      const logo = head.querySelector('.site-header__logo')
      const nav = head.querySelector('.site-header__nav')
      const actions = head.querySelector('.site-header__actions')
      const gap = Number.parseFloat(getComputedStyle(head).gap) || 32

      const parts = [logo, nav, actions].filter((el) => {
        if (!el) return false
        return getComputedStyle(el).display !== 'none'
      })

      const content = parts.reduce(
        (sum, el) => sum + el.getBoundingClientRect().width,
        0,
      )

      // Extra room for pill inset, CTA label length, and subpixel rounding.
      const padX = 20
      return Math.ceil(content + gap * Math.max(parts.length - 1, 0) + padX)
    }

    const measure = () => {
      const shell = shellRef.current
      if (!shell) return

      if (compactRef.current) {
        setBarWidth(measureCompactWidth())
      } else {
        setBarWidth(Math.ceil(shell.clientWidth))
      }
    }

    measure()
    const id = window.requestAnimationFrame(measure)
    // Remeasure after fonts/layout settle — longer CTA can otherwise clip the pill.
    const settleId = window.setTimeout(measure, 120)
    window.addEventListener('resize', measure)

    return () => {
      window.cancelAnimationFrame(id)
      window.clearTimeout(settleId)
      window.removeEventListener('resize', measure)
    }
  }, [compact, menuOpen])

  useEffect(() => {
    lastYRef.current = window.scrollY

    const getHideAfterY = () => {
      const hero = document.getElementById('inicio')
      if (!hero) return 720
      return Math.max(hero.offsetTop + hero.offsetHeight - 48, 560)
    }

    const update = () => {
      const y = window.scrollY
      const lastY = lastYRef.current
      const delta = y - lastY
      const hideAfterY = getHideAfterY()

      setCompact((prev) => {
        if (prev) return y > 56
        return y > 120
      })

      if (y < hideAfterY) {
        setHidden(false)
      } else if (delta > 10) {
        setHidden(true)
      } else if (delta < -10) {
        setHidden(false)
      }

      lastYRef.current = y
      tickingRef.current = false
    }

    const onScroll = () => {
      if (tickingRef.current) return
      tickingRef.current = true
      window.requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <header
      ref={shellRef}
      className={[
        'site-header',
        compact ? 'is-compact' : '',
        hidden && !menuOpen ? 'is-hidden' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        className="site-header__inner"
        style={barWidth ? { width: `${barWidth}px` } : undefined}
      >
        <span className="site-header__bg" aria-hidden="true" />

        <div ref={headRef} className="site-header__head">
          <a
            href="#inicio"
            className="site-header__logo ui-button"
            aria-label={`${clinic.name}, voltar ao início`}
            onClick={(event) => {
              event.preventDefault()
              setMenuOpen(false)
              setHidden(false)
              const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: reduceMotion ? 'auto' : 'smooth',
              })
              const { pathname, search } = window.location
              if (window.location.hash) {
                window.history.replaceState(null, '', `${pathname}${search}`)
              }
              // Sync compact/hidden state after hard reset to top.
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
            <ThemeToggle />
            <Button
              href={whatsappUrl()}
              variant="primary"
              size="sm"
              className="site-header__cta hidden sm:inline-flex"
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
              onClick={() => {
                setHidden(false)
                setMenuOpen(true)
              }}
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
        onClose={() => setMenuOpen(false)}
        links={navLinks}
        returnFocusRef={menuBtnRef}
      />
    </header>
  )
}
