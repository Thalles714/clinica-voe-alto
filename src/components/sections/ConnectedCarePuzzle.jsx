import { useEffect, useMemo, useRef, useState } from 'react'
import Badge from '../ui/Badge'
import PuzzlePiece from '../ui/PuzzlePiece'

/**
 * Puzzle field inspired by Wolverine section-fotos:
 * continuous upward/downward stream with constant speed.
 * Scroll direction only flips the flow; copy remains scroll-latched.
 */
const PUZZLE_PIECES = [
  { id: 'p01', x: -2, size: 118, start: -0.16, end: 0.46, startRotation: -7, endRotation: 5, startScale: 0.92, endScale: 1.05, opacity: 0.62, drift: 7, variant: 'blue', shape: 'classic', layer: 'middle', showFrom: 0 },
  { id: 'p02', x: 95, size: 108, start: -0.04, end: 0.54, startRotation: 6, endRotation: -5, startScale: 0.94, endScale: 1.04, opacity: 0.6, drift: -6, variant: 'pink', shape: 'opposite', layer: 'middle', showFrom: 0 },
  { id: 'p03', x: 8, size: 88, start: 0.08, end: 0.62, startRotation: -5, endRotation: 4, startScale: 0.9, endScale: 1, opacity: 0.45, drift: 5, variant: 'gradient', shape: 'top-tab', layer: 'back', showFrom: 0 },
  { id: 'p04', x: 89, size: 96, start: 0.18, end: 0.72, startRotation: 7, endRotation: -4, startScale: 0.92, endScale: 1.03, opacity: 0.48, drift: -5, variant: 'blue-glass', shape: 'side-tab', layer: 'back', showFrom: 0 },
  { id: 'p05', x: 1, size: 78, start: 0.3, end: 0.82, startRotation: -6, endRotation: 3, startScale: 0.94, endScale: 1.02, opacity: 0.42, drift: 4, variant: 'light-pink', shape: 'top-blank', layer: 'back', showFrom: 0 },
  { id: 'p06', x: 98, size: 84, start: 0.42, end: 0.94, startRotation: 5, endRotation: -3, startScale: 0.93, endScale: 1.02, opacity: 0.44, drift: -4, variant: 'pink-glass', shape: 'side-blank', layer: 'middle', showFrom: 0 },
  { id: 'p07', x: 14, size: 100, start: -0.1, end: 0.56, startRotation: 8, endRotation: -6, startScale: 0.91, endScale: 1.06, opacity: 0.5, drift: 7, variant: 'outline', shape: 'adjacent', layer: 'back', showFrom: 768 },
  { id: 'p08', x: 86, size: 112, start: 0.26, end: 0.9, startRotation: -7, endRotation: 5, startScale: 0.9, endScale: 1.05, opacity: 0.52, drift: -7, variant: 'frosted', shape: 'adjacent-blank', layer: 'middle', showFrom: 768 },
  { id: 'p09', x: 20, size: 146, start: -0.2, end: 0.5, startRotation: -8, endRotation: 7, startScale: 0.88, endScale: 1.08, opacity: 0.62, drift: 9, variant: 'blue', shape: 'top-tab', layer: 'front', showFrom: 1024 },
  { id: 'p10', x: 80, size: 138, start: 0, end: 0.68, startRotation: 7, endRotation: -7, startScale: 0.9, endScale: 1.07, opacity: 0.6, drift: -9, variant: 'pink', shape: 'adjacent', layer: 'front', showFrom: 1024 },
  { id: 'p11', x: 10, size: 120, start: 0.34, end: 0.92, startRotation: -6, endRotation: 5, startScale: 0.92, endScale: 1.04, opacity: 0.5, drift: 6, variant: 'gradient', shape: 'opposite', layer: 'middle', showFrom: 1024 },
  { id: 'p12', x: 92, size: 126, start: 0.48, end: 1, startRotation: 6, endRotation: -4, startScale: 0.92, endScale: 1.05, opacity: 0.54, drift: -6, variant: 'blue-glass', shape: 'classic', layer: 'middle', showFrom: 1024 },
  { id: 'p13', x: 34, size: 76, start: 0.12, end: 0.76, startRotation: -5, endRotation: 4, startScale: 0.92, endScale: 1.02, opacity: 0.28, drift: 4, variant: 'frosted', shape: 'top-blank', layer: 'back', showFrom: 0 },
  { id: 'p14', x: 67, size: 70, start: 0.28, end: 0.88, startRotation: 5, endRotation: -4, startScale: 0.94, endScale: 1.02, opacity: 0.3, drift: -4, variant: 'outline', shape: 'side-tab', layer: 'back', showFrom: 0 },
  { id: 'p15', x: 43, size: 94, start: -0.08, end: 0.58, startRotation: -6, endRotation: 5, startScale: 0.9, endScale: 1.04, opacity: 0.36, drift: 5, variant: 'blue-glass', shape: 'adjacent-blank', layer: 'middle', showFrom: 768 },
  { id: 'p16', x: 58, size: 88, start: 0.38, end: 0.96, startRotation: 6, endRotation: -5, startScale: 0.92, endScale: 1.03, opacity: 0.34, drift: -5, variant: 'pink-glass', shape: 'top-tab', layer: 'back', showFrom: 768 },
  { id: 'p17', x: 37, size: 118, start: -0.14, end: 0.52, startRotation: -7, endRotation: 6, startScale: 0.89, endScale: 1.06, opacity: 0.38, drift: 6, variant: 'gradient', shape: 'opposite', layer: 'middle', showFrom: 1024 },
  { id: 'p18', x: 50, size: 82, start: 0.18, end: 0.8, startRotation: 5, endRotation: -4, startScale: 0.93, endScale: 1.02, opacity: 0.3, drift: -3, variant: 'light-pink', shape: 'side-blank', layer: 'back', showFrom: 1024 },
  { id: 'p19', x: 63, size: 108, start: 0.42, end: 1, startRotation: -5, endRotation: 5, startScale: 0.91, endScale: 1.05, opacity: 0.36, drift: 5, variant: 'frosted', shape: 'classic', layer: 'middle', showFrom: 1024 },
  { id: 'p20', x: 74, size: 86, start: 0.06, end: 0.66, startRotation: 6, endRotation: -5, startScale: 0.92, endScale: 1.03, opacity: 0.34, drift: -4, variant: 'outline', shape: 'adjacent', layer: 'back', showFrom: 1024 },
]

const SPAWN_Y = 118
const EXIT_Y = -22
const PATH_SPAN = SPAWN_Y - EXIT_Y
const PIECE_FLOW_SPEED = 22

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function lerp(a, b, t) {
  return a + (b - a) * t
}

function wrap01(value) {
  const wrapped = value % 1
  return wrapped < 0 ? wrapped + 1 : wrapped
}

function getPieceSeed(id) {
  const index = Number.parseInt(id.replace(/\D/g, ''), 10) || 1
  return wrap01(index * 0.193)
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

function getViewportWidth() {
  return typeof window === 'undefined' ? 1280 : window.innerWidth
}

const COPY_STEPS = [
  { key: 'badge', enter: [0.04, 0.12], y: 18, blur: 2 },
  { key: 'line1', enter: [0.08, 0.2], y: 26, blur: 3 },
  { key: 'line2', enter: [0.14, 0.28], y: 28, blur: 3 },
  { key: 'desc', enter: [0.24, 0.38], y: 22, blur: 2 },
  { key: 'note', enter: [0.34, 0.48], y: 18, blur: 1.5 },
]

const COPY_SETTLED_AT = COPY_STEPS[COPY_STEPS.length - 1].enter[1]
const COPY_RESET_BELOW = 0.02

function getCopyElementMotion(progress, step) {
  const [e0, e1] = step.enter

  if (progress <= e0) return { opacity: 0, y: step.y, blur: step.blur }
  if (progress < e1) {
    const t = easeOutCubic((progress - e0) / (e1 - e0))
    return { opacity: t, y: lerp(step.y, 0, t), blur: lerp(step.blur, 0, t) }
  }
  return { opacity: 1, y: 0, blur: 0 }
}

function applyCopyMotion(nodes, progress, settledKeys) {
  COPY_STEPS.forEach((step) => {
    const node = nodes.get(step.key)
    if (!node) return

    if (progress >= step.enter[1]) settledKeys.add(step.key)
    if (progress <= COPY_RESET_BELOW) settledKeys.delete(step.key)

    if (settledKeys.has(step.key)) {
      node.style.opacity = '1'
      node.style.transform = 'none'
      node.style.filter = 'none'
      return
    }

    const motion = getCopyElementMotion(progress, step)
    node.style.opacity = String(motion.opacity)
    node.style.transform = `translate3d(0, ${motion.y}px, 0)`
    node.style.filter = motion.blur > 0.05 ? `blur(${motion.blur}px)` : 'none'
  })
}

function lockCopyVisible(nodes) {
  COPY_STEPS.forEach((step) => {
    const node = nodes.get(step.key)
    if (!node) return
    node.style.opacity = '1'
    node.style.transform = 'none'
    node.style.filter = 'none'
  })
}

export default function ConnectedCarePuzzle() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const copyNodesRef = useRef(new Map())
  const pieceRefs = useRef(new Map())
  const [viewportWidth, setViewportWidth] = useState(getViewportWidth)
  const [reduceMotion, setReduceMotion] = useState(false)

  const visiblePieces = useMemo(
    () => PUZZLE_PIECES.filter((piece) => viewportWidth >= piece.showFrom),
    [viewportWidth],
  )

  const layers = useMemo(
    () => ({
      back: visiblePieces.filter((p) => p.layer === 'back'),
      middle: visiblePieces.filter((p) => p.layer === 'middle'),
      front: visiblePieces.filter((p) => p.layer === 'front'),
    }),
    [visiblePieces],
  )

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMotion = () => setReduceMotion(media.matches)
    syncMotion()
    media.addEventListener('change', syncMotion)

    const onResize = () => setViewportWidth(window.innerWidth)
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      media.removeEventListener('change', syncMotion)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    if (reduceMotion) {
      visiblePieces.forEach((piece, index) => {
        const node = pieceRefs.current.get(piece.id)
        if (!node) return
        const rest = 0.24 + (index % 4) * 0.16
        const y = lerp(SPAWN_Y, EXIT_Y, rest)
        const scale = lerp(piece.startScale, piece.endScale, rest)
        node.style.opacity = String(piece.opacity * 0.78)
        node.style.transform = `translate3d(-50%, -50%, 0) translateY(${y}vh) rotate(0deg) scale(${scale})`
        node.style.willChange = 'auto'
      })
      copyNodesRef.current.forEach((node) => {
        node.style.opacity = '1'
        node.style.transform = 'none'
        node.style.filter = 'none'
      })
      sectionRef.current?.classList.add('is-copy-settled')
      return undefined
    }

    const section = sectionRef.current
    const stage = stageRef.current
    if (!section || !stage) return undefined

    let raf = 0
    let active = false
    let copyLocked = false
    const settledKeys = new Set()
    const piecesMap = pieceRefs.current
    let lastFrame = performance.now()
    let lastScrollY = window.scrollY
    let travel = -0.2
    // -1 = pieces rise constantly, +1 = pieces fall constantly
    let flowDir = -1

    const readProgress = () => {
      const maxScroll = section.offsetHeight - window.innerHeight
      if (maxScroll <= 0) return 1
      const traveled = -section.getBoundingClientRect().top
      return clamp(traveled / maxScroll, 0, 1)
    }

    const applyPieces = () => {
      const driftScale = viewportWidth < 768 ? 0.42 : viewportWidth < 1024 ? 0.68 : 1
      const rotationScale = viewportWidth < 768 ? 0.48 : viewportWidth < 1024 ? 0.72 : 1

      visiblePieces.forEach((piece) => {
        const node = pieceRefs.current.get(piece.id)
        if (!node) return

        // Continuous loop with staggered seeds and slightly different speeds.
        const seed = getPieceSeed(piece.id)
        const pieceSpeed =
          0.82 + ((Number.parseInt(piece.id.replace(/\D/g, ''), 10) || 1) % 5) * 0.05
        const along = wrap01(seed + travel * pieceSpeed)
        const y = lerp(SPAWN_Y, EXIT_Y, along)
        const rotation = lerp(piece.startRotation, piece.endRotation, along) * rotationScale
        const scale = lerp(piece.startScale, piece.endScale, along)
        const xDrift = Math.sin(along * Math.PI) * piece.drift * driftScale

        let opacity = piece.opacity
        if (along < 0.08) opacity *= along / 0.08
        else if (along > 0.9) opacity *= clamp((1 - along) / 0.1, 0, 1)

        node.style.opacity = String(opacity)
        node.style.transform = `translate3d(calc(-50% + ${xDrift}px), -50%, 0) translateY(${y}vh) rotate(${rotation}deg) scale(${scale})`
      })
    }

    const applyCopy = () => {
      const progress = readProgress()

      // One-way latch: after the entrance finishes while scrolling down,
      // keep copy fully visible. Only unlock when returning to the start.
      if (progress >= COPY_SETTLED_AT) copyLocked = true
      else if (progress <= COPY_RESET_BELOW) {
        copyLocked = false
        settledKeys.clear()
      }

      stage.style.setProperty('--puzzle-progress', String(progress))
      section.classList.toggle('is-copy-settled', copyLocked)

      if (copyLocked) lockCopyVisible(copyNodesRef.current)
      else applyCopyMotion(copyNodesRef.current, progress, settledKeys)
    }

    const renderFrame = (now = performance.now()) => {
      raf = 0
      if (!active) return

      const dt = Math.min((now - lastFrame) / 1000, 0.048)
      lastFrame = now

      // Constant flow. Direction only flips with scroll intent.
      travel += (-flowDir * PIECE_FLOW_SPEED * dt) / PATH_SPAN

      applyCopy()
      applyPieces()
      raf = window.requestAnimationFrame(renderFrame)
    }

    const startLoop = () => {
      if (raf || !active) return
      lastFrame = performance.now()
      raf = window.requestAnimationFrame(renderFrame)
    }

    const stopLoop = () => {
      if (!raf) return
      window.cancelAnimationFrame(raf)
      raf = 0
    }

    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastScrollY
      lastScrollY = y
      if (Math.abs(delta) < 0.35) return
      flowDir = delta > 0 ? -1 : 1
      if (!active) applyCopy()
    }

    const activate = () => {
      if (active) return
      active = true
      lastScrollY = window.scrollY
      lastFrame = performance.now()
      pieceRefs.current.forEach((node) => {
        node.style.willChange = 'transform, opacity'
      })
      applyCopy()
      applyPieces()
      startLoop()
    }

    const deactivate = () => {
      if (!active) return
      active = false
      stopLoop()
      pieceRefs.current.forEach((node) => {
        node.style.willChange = 'auto'
      })
    }

    pieceRefs.current.forEach((node) => {
      node.style.willChange = 'transform, opacity'
    })
    window.addEventListener('scroll', onScroll, { passive: true })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) activate()
        else deactivate()
      },
      { root: null, rootMargin: '20% 0px', threshold: 0 },
    )
    observer.observe(section)

    const boot = window.requestAnimationFrame(() => {
      const rect = section.getBoundingClientRect()
      if (rect.bottom > 0 && rect.top < window.innerHeight * 1.1) activate()
      else applyCopy()
    })

    return () => {
      window.cancelAnimationFrame(boot)
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      deactivate()
      piecesMap.forEach((node) => {
        node.style.willChange = 'auto'
      })
    }
  }, [reduceMotion, visiblePieces, viewportWidth])

  /* eslint-disable react-hooks/refs -- intentional callback-ref map registration */
  const setPieceRef = (id) => (node) => {
    if (node) pieceRefs.current.set(id, node)
    else pieceRefs.current.delete(id)
  }

  const setCopyRef = (key) => (node) => {
    if (node) copyNodesRef.current.set(key, node)
    else copyNodesRef.current.delete(key)
  }
  /* eslint-enable react-hooks/refs */

  const renderLayer = (items) =>
    items.map((piece) => (
      <div
        key={piece.id}
        ref={setPieceRef(piece.id)}
        className={`connected-care__piece connected-care__piece--${piece.layer}`}
        style={{
          left: `${piece.x}%`,
          top: 0,
          opacity: 0,
          transform: `translate3d(-50%, -50%, 0) translateY(${SPAWN_Y}vh) rotate(${piece.startRotation}deg) scale(${piece.startScale})`,
        }}
      >
        <PuzzlePiece
          size={
            viewportWidth < 768
              ? Math.round(piece.size * 0.7)
              : viewportWidth < 1024
                ? Math.round(piece.size * 0.84)
                : piece.size
          }
          variant={piece.variant}
          shape={piece.shape}
          strokeOnly={piece.variant === 'outline'}
          opacity={1}
        />
      </div>
    ))

  return (
    <section
      ref={sectionRef}
      id="cuidado-conectado"
      className={`connected-care ${reduceMotion ? 'is-reduced-motion' : ''}`}
      aria-labelledby="connected-care-title"
    >
      <div ref={stageRef} className="connected-care__stage">
        <div className="connected-care__glow" aria-hidden="true" />
        <div className="connected-care__fade connected-care__fade--top" aria-hidden="true" />
        <div className="connected-care__fade connected-care__fade--bottom" aria-hidden="true" />

        <div className="connected-care__layer connected-care__layer--back" aria-hidden="true">
          {renderLayer(layers.back)}
        </div>
        <div className="connected-care__layer connected-care__layer--middle" aria-hidden="true">
          {renderLayer(layers.middle)}
        </div>

        <div className="connected-care__scroll-hint" aria-hidden="true">
          <span className="connected-care__scroll-hint-label">Role ou deslize para continuar</span>
          <span className="connected-care__scroll-hint-arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              focusable="false"
            >
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </span>
        </div>

        <div className="connected-care__content">
          <div className="connected-care__copy">
            <div className="connected-care__veil" aria-hidden="true" />
            <div className="connected-care__copy-inner">
              <div ref={setCopyRef('badge')} className="connected-care__reveal">
                <Badge variant="pink">Cuidado que se conecta</Badge>
              </div>
              <h2 id="connected-care-title" className="connected-care__title">
                <span ref={setCopyRef('line1')} className="connected-care__line connected-care__reveal">
                  Cada parte importa.
                </span>
                <span ref={setCopyRef('line2')} className="connected-care__line connected-care__reveal">
                  Juntas, elas ajudam a construir novos caminhos.
                </span>
              </h2>
              <p ref={setCopyRef('desc')} className="connected-care__description connected-care__reveal">
                Diferentes áreas podem atuar de forma integrada para compreender necessidades,
                orientar famílias e acompanhar cada etapa com mais clareza.
              </p>
              <p ref={setCopyRef('note')} className="connected-care__note connected-care__reveal">
                Se ainda não sabe por onde começar, a equipe ajuda a montar o caminho
                com você.
              </p>
            </div>
          </div>
        </div>

        <div className="connected-care__layer connected-care__layer--front" aria-hidden="true">
          {renderLayer(layers.front)}
        </div>
      </div>
    </section>
  )
}
