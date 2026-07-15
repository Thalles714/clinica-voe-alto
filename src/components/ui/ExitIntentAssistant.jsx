import { useEffect, useRef, useState } from 'react'
import { whatsappUrl } from '../../data/clinic'
import { assistantOptions } from '../../data/assistant'

const TOP_EXIT_THRESHOLD = 8
const SIDE_EXIT_INSET = 24
const RESIZE_SUPPRESSION_MS = 800
const PUZZLE_SECTION_ID = 'cuidado-conectado'
const DESKTOP_POINTER_QUERY =
  '(min-width: 1024px) and (hover: hover) and (pointer: fine)'

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

export default function ExitIntentAssistant() {
  const [isDesktopPointer, setIsDesktopPointer] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedId, setSelectedId] = useState(null)

  const isOpenRef = useRef(false)
  const isArmedRef = useRef(false)
  const canTriggerRef = useRef(true)
  const suppressUntilRef = useRef(0)
  const selected = assistantOptions.find((option) => option.id === selectedId) ?? null

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_POINTER_QUERY)
    const syncPointer = () => setIsDesktopPointer(media.matches)

    syncPointer()
    media.addEventListener('change', syncPointer)
    return () => media.removeEventListener('change', syncPointer)
  }, [])

  useEffect(() => {
    if (!isDesktopPointer) return undefined

    const section = document.getElementById(PUZZLE_SECTION_ID)
    if (!section) return undefined

    const armFromIntersection = (entry) => {
      if (entry.isIntersecting) isArmedRef.current = true
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(armFromIntersection)
      },
      { threshold: 0 },
    )

    observer.observe(section)

    const rect = section.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      isArmedRef.current = true
    }

    return () => observer.disconnect()
  }, [isDesktopPointer])

  useEffect(() => {
    if (!isDesktopPointer) return undefined

    const showAssistant = () => {
      if (!isArmedRef.current) return
      if (isOpenRef.current) return
      if (!canTriggerRef.current) return
      if (document.visibilityState !== 'visible') return
      if (performance.now() < suppressUntilRef.current) return

      canTriggerRef.current = false
      isOpenRef.current = true
      setSelectedId(null)
      setIsOpen(true)
    }

    const onResize = () => {
      suppressUntilRef.current = performance.now() + RESIZE_SUPPRESSION_MS
    }

    const onPointerEnter = () => {
      if (isOpenRef.current) return
      canTriggerRef.current = true
    }

    const onMouseOut = (event) => {
      if (event.relatedTarget !== null) return
      if (document.visibilityState !== 'visible') return
      if (performance.now() < suppressUntilRef.current) return
      if (event.clientY > TOP_EXIT_THRESHOLD) return
      if (event.clientX <= SIDE_EXIT_INSET) return
      if (event.clientX >= window.innerWidth - SIDE_EXIT_INSET) return

      showAssistant()
    }

    const root = document.documentElement

    window.addEventListener('resize', onResize, { passive: true })
    root.addEventListener('pointerenter', onPointerEnter)
    root.addEventListener('mouseenter', onPointerEnter)
    document.addEventListener('mouseout', onMouseOut)

    return () => {
      window.removeEventListener('resize', onResize)
      root.removeEventListener('pointerenter', onPointerEnter)
      root.removeEventListener('mouseenter', onPointerEnter)
      document.removeEventListener('mouseout', onMouseOut)
    }
  }, [isDesktopPointer])

  const handleClose = () => {
    isOpenRef.current = false
    canTriggerRef.current = false
    setIsOpen(false)
  }

  if (!isDesktopPointer || !isOpen) return null

  return (
    <aside
      className="exit-intent-assistant"
      role="dialog"
      aria-modal="false"
      aria-labelledby="exit-intent-title"
      aria-describedby="exit-intent-description"
    >
      <button
        type="button"
        className="exit-intent-assistant__close"
        aria-label="Fechar convite para falar com a equipe"
        onClick={handleClose}
      >
        <CloseIcon />
      </button>

      <div className="exit-intent-assistant__accent" aria-hidden="true" />
      <p className="exit-intent-assistant__eyebrow">Clínica Voe Alto</p>
      <h2 id="exit-intent-title" className="exit-intent-assistant__title">
        Ainda ficou com alguma dúvida?
      </h2>
      <p id="exit-intent-description" className="exit-intent-assistant__description">
        Escolha uma opção. O assistente prepara o contato, e a equipe continua pelo
        WhatsApp.
      </p>

      {!selected ? (
        <div
          className="exit-intent-assistant__options"
          role="group"
          aria-label="Opções de orientação"
        >
          {assistantOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              className="exit-intent-assistant__option"
              onClick={() => setSelectedId(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : (
        <div className="exit-intent-assistant__response" aria-live="polite">
          <p>{selected.reply}</p>
          <a
            href={whatsappUrl(selected.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="exit-intent-assistant__cta"
            aria-label={`Continuar no WhatsApp: ${selected.label}`}
          >
            Continuar no WhatsApp
          </a>
          <button
            type="button"
            className="exit-intent-assistant__back"
            onClick={() => setSelectedId(null)}
          >
            Escolher outra opção
          </button>
        </div>
      )}
    </aside>
  )
}
