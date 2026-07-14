import { useEffect, useMemo, useRef, useState } from 'react'
import Badge from '../ui/Badge'
import PuzzlePiece from '../ui/PuzzlePiece'

/**
 * Puzzle field inspired by Wolverine section-fotos:
 * continuous upward stream (not 1:1 scroll scrubbing).
 * Scroll direction only boosts/reverses velocity; motion never fully stops.
 * showFrom: 0 mobile+ / 768 tablet+ / 1024 desktop
 */
const PUZZLE_PIECES = [
  { id: 'p01', x: -8, size: 176, startRotation: -14, endRotation: 9, startScale: 0.9, endScale: 1.12, opacity: 0.78, depth: 1.2, drift: 12, variant: 'blue', shape: 'classic', layer: 'front', showFrom: 1024, idle: 1.15 },
  { id: 'p02', x: 88, size: 158, startRotation: 11, endRotation: -10, startScale: 0.88, endScale: 1.1, opacity: 0.74, depth: 1.16, drift: -11, variant: 'pink', shape: 'adjacent', layer: 'front', showFrom: 0, blurred: true, idle: 1.05 },
  { id: 'p03', x: 6, size: 128, startRotation: -9, endRotation: 13, startScale: 0.92, endScale: 1.05, opacity: 0.64, depth: 0.98, drift: 7, variant: 'gradient', shape: 'alt', layer: 'middle', showFrom: 0, idle: 0.9 },
  { id: 'p04', x: 74, size: 116, startRotation: 16, endRotation: -7, startScale: 0.94, endScale: 1.06, opacity: 0.68, depth: 1.04, drift: -6, variant: 'blue-glass', shape: 'classic', layer: 'middle', showFrom: 0, idle: 0.95 },
  { id: 'p05', x: 46, size: 92, startRotation: -18, endRotation: 5, startScale: 0.86, endScale: 1.02, opacity: 0.4, depth: 0.7, drift: 4, variant: 'light-pink', shape: 'edge', layer: 'back', showFrom: 0, idle: 0.7 },
  { id: 'p06', x: 22, size: 142, startRotation: 7, endRotation: -12, startScale: 0.9, endScale: 1.09, opacity: 0.7, depth: 1.1, drift: 9, variant: 'pink-glass', shape: 'tri', layer: 'middle', showFrom: 0, idle: 1.0 },
  { id: 'p07', x: 96, size: 104, startRotation: -11, endRotation: 15, startScale: 0.93, endScale: 1.04, opacity: 0.52, depth: 0.86, drift: -8, variant: 'outline', shape: 'corner', layer: 'back', showFrom: 0, idle: 0.75 },
  { id: 'p08', x: -4, size: 120, startRotation: 9, endRotation: -11, startScale: 0.91, endScale: 1.07, opacity: 0.58, depth: 0.94, drift: 6, variant: 'frosted', shape: 'alt', layer: 'middle', showFrom: 0, idle: 0.88 },
  { id: 'p09', x: 58, size: 168, startRotation: -5, endRotation: 11, startScale: 0.88, endScale: 1.13, opacity: 0.76, depth: 1.18, drift: -10, variant: 'blue', shape: 'edgeAlt', layer: 'front', showFrom: 1024, idle: 1.2 },
  { id: 'p10', x: 36, size: 80, startRotation: 20, endRotation: -4, startScale: 0.9, endScale: 1.0, opacity: 0.36, depth: 0.62, drift: 3, variant: 'pink', shape: 'adjacentAlt', layer: 'back', showFrom: 0, idle: 0.65 },
  { id: 'p11', x: 80, size: 136, startRotation: -13, endRotation: 8, startScale: 0.92, endScale: 1.08, opacity: 0.66, depth: 1.08, drift: 8, variant: 'gradient', shape: 'classic', layer: 'middle', showFrom: 1024, idle: 1.02 },
  { id: 'p12', x: 12, size: 108, startRotation: 8, endRotation: -16, startScale: 0.9, endScale: 1.06, opacity: 0.6, depth: 1.0, drift: -5, variant: 'blue-glass', shape: 'cornerAlt', layer: 'middle', showFrom: 0, idle: 0.92 },
  { id: 'p13', x: 50, size: 70, startRotation: -22, endRotation: 6, startScale: 0.88, endScale: 0.98, opacity: 0.32, depth: 0.56, drift: 2, variant: 'outline', shape: 'classic', layer: 'back', showFrom: 1024, idle: 0.6 },
  { id: 'p14', x: 94, size: 148, startRotation: 4, endRotation: -9, startScale: 0.9, endScale: 1.1, opacity: 0.72, depth: 1.14, drift: -13, variant: 'pink', shape: 'alt', layer: 'front', showFrom: 1024, idle: 1.12 },
  { id: 'p15', x: 2, size: 96, startRotation: -10, endRotation: 12, startScale: 0.93, endScale: 1.03, opacity: 0.48, depth: 0.8, drift: 7, variant: 'light-pink', shape: 'triAlt', layer: 'back', showFrom: 0, idle: 0.78 },
  { id: 'p16', x: 66, size: 122, startRotation: 13, endRotation: -8, startScale: 0.91, endScale: 1.07, opacity: 0.64, depth: 1.03, drift: 5, variant: 'frosted', shape: 'adjacent', layer: 'middle', showFrom: 1024, idle: 0.98 },
  { id: 'p17', x: 28, size: 102, startRotation: -7, endRotation: 10, startScale: 0.92, endScale: 1.05, opacity: 0.55, depth: 0.92, drift: -4, variant: 'pink-glass', shape: 'edge', layer: 'middle', showFrom: 0, idle: 0.85 },
  { id: 'p18', x: 84, size: 90, startRotation: 15, endRotation: -6, startScale: 0.94, endScale: 1.03, opacity: 0.44, depth: 0.74, drift: 5, variant: 'blue', shape: 'corner', layer: 'back', showFrom: 0, idle: 0.72 },
  { id: 'p19', x: -10, size: 134, startRotation: 6, endRotation: -14, startScale: 0.89, endScale: 1.08, opacity: 0.7, depth: 1.12, drift: 10, variant: 'gradient', shape: 'tri', layer: 'front', showFrom: 1024, idle: 1.08 },
  { id: 'p20', x: 42, size: 74, startRotation: -16, endRotation: 8, startScale: 0.9, endScale: 1.01, opacity: 0.34, depth: 0.6, drift: -3, variant: 'outline', shape: 'edgeAlt', layer: 'back', showFrom: 0, idle: 0.68 },
  { id: 'p21', x: 70, size: 154, startRotation: -8, endRotation: 12, startScale: 0.87, endScale: 1.11, opacity: 0.72, depth: 1.15, drift: -9, variant: 'blue-glass', shape: 'adjacentAlt', layer: 'front', showFrom: 1024, idle: 1.1, blurred: true },
  { id: 'p22', x: 18, size: 112, startRotation: 10, endRotation: -9, startScale: 0.93, endScale: 1.05, opacity: 0.58, depth: 0.9, drift: 6, variant: 'pink', shape: 'classic', layer: 'middle', showFrom: 0, idle: 0.86 },
  { id: 'p23', x: 54, size: 118, startRotation: -12, endRotation: 7, startScale: 0.89, endScale: 1.08, opacity: 0.62, depth: 1.06, drift: 8, variant: 'pink-glass', shape: 'edgeBottom', layer: 'middle', showFrom: 0, idle: 0.94 },
  { id: 'p24', x: -12, size: 98, startRotation: 14, endRotation: -8, startScale: 0.92, endScale: 1.04, opacity: 0.5, depth: 0.84, drift: -7, variant: 'light-pink', shape: 'cornerBL', layer: 'back', showFrom: 1024, idle: 0.8 },
  { id: 'p25', x: 98, size: 130, startRotation: -6, endRotation: 13, startScale: 0.9, endScale: 1.09, opacity: 0.7, depth: 1.13, drift: -12, variant: 'blue', shape: 'triAlt', layer: 'front', showFrom: 1024, idle: 1.14 },
  { id: 'p26', x: 32, size: 86, startRotation: 18, endRotation: -5, startScale: 0.91, endScale: 1.02, opacity: 0.42, depth: 0.68, drift: 4, variant: 'frosted', shape: 'adjacent', layer: 'back', showFrom: 0, idle: 0.7 },
  { id: 'p27', x: 62, size: 124, startRotation: -15, endRotation: 9, startScale: 0.93, endScale: 1.07, opacity: 0.66, depth: 1.0, drift: -6, variant: 'gradient', shape: 'alt', layer: 'middle', showFrom: 768, idle: 0.96 },
  { id: 'p28', x: 8, size: 140, startRotation: 5, endRotation: -12, startScale: 0.88, endScale: 1.1, opacity: 0.74, depth: 1.17, drift: 11, variant: 'pink', shape: 'classic', layer: 'front', showFrom: 1024, idle: 1.18 },
  { id: 'p29', x: 76, size: 78, startRotation: -19, endRotation: 6, startScale: 0.9, endScale: 1.0, opacity: 0.38, depth: 0.64, drift: 3, variant: 'outline', shape: 'corner', layer: 'back', showFrom: 0, idle: 0.66 },
  { id: 'p30', x: 44, size: 150, startRotation: 8, endRotation: -11, startScale: 0.89, endScale: 1.12, opacity: 0.7, depth: 1.14, drift: -8, variant: 'blue-glass', shape: 'tri', layer: 'front', showFrom: 1024, idle: 1.08, blurred: true },
]

const SPAWN_Y = 118
const EXIT_Y = -32
const PATH_SPAN = SPAWN_Y - EXIT_Y

/** Continuous stream speed (vh/s magnitude). Direction is separate. */
const BASE_SPEED = 24
const MIN_SPEED = 14
const MAX_SPEED = 82
const SCROLL_IMPULSE = 0.11
const SPEED_RETURN = 1.15
const DIR_FLIP_DELTA = 1.25

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function lerp(a, b, t) {
  return a + (b - a) * t
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

function easeInCubic(t) {
  return t * t * t
}

function wrap01(value) {
  const v = value % 1
  return v < 0 ? v + 1 : v
}

function getViewportWidth() {
  return typeof window === 'undefined' ? 1280 : window.innerWidth
}

function hashPhase(id) {
  let h = 0
  for (let i = 0; i < id.length; i += 1) h = (h * 31 + id.charCodeAt(i)) % 1000
  return (h / 1000) * Math.PI * 2
}

function pieceSeed(id) {
  return wrap01(hashPhase(id) / (Math.PI * 2))
}

const COPY_STEPS = [
  { key: 'badge', enter: [0.0, 0.1], exit: [0.86, 0.98], y: 48 },
  { key: 'line1', enter: [0.03, 0.16], exit: [0.84, 0.97], y: 64 },
  { key: 'line2', enter: [0.08, 0.22], exit: [0.82, 0.96], y: 68 },
  { key: 'desc', enter: [0.14, 0.3], exit: [0.8, 0.95], y: 44 },
  { key: 'note', enter: [0.2, 0.38], exit: [0.78, 0.93], y: 36 },
]

function getCopyElementMotion(progress, step) {
  const [e0, e1] = step.enter
  const [x0, x1] = step.exit

  if (progress <= e0) return { opacity: 0, y: step.y, scale: 0.965 }
  if (progress < e1) {
    const t = easeOutCubic((progress - e0) / (e1 - e0))
    return { opacity: t, y: lerp(step.y, 0, t), scale: lerp(0.965, 1, t) }
  }
  if (progress < x0) return { opacity: 1, y: 0, scale: 1 }
  if (progress < x1) {
    const t = easeInCubic((progress - x0) / (x1 - x0))
    return { opacity: lerp(1, 0, t), y: lerp(0, -step.y * 0.45, t), scale: lerp(1, 0.98, t) }
  }
  return { opacity: 0, y: -step.y * 0.45, scale: 0.98 }
}

function applyCopyMotion(nodes, progress) {
  COPY_STEPS.forEach((step) => {
    const node = nodes.get(step.key)
    if (!node) return
    const motion = getCopyElementMotion(progress, step)
    node.style.opacity = String(motion.opacity)
    node.style.transform = `translate3d(0, ${motion.y}px, 0) scale(${motion.scale})`
  })
}

export default function ConnectedCarePuzzle() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const copyRef = useRef(null)
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
        const rest = 0.35 + (index % 5) * 0.08
        const y = lerp(SPAWN_Y, EXIT_Y, rest)
        const rotation = lerp(piece.startRotation, piece.endRotation, rest)
        const scale = lerp(piece.startScale, piece.endScale, rest)
        node.style.opacity = String(piece.opacity * 0.9)
        node.style.transform = `translate3d(-50%, -50%, 0) translateY(${y}vh) rotate(${rotation * 0.4}deg) scale(${scale})`
        node.style.willChange = 'auto'
      })
      if (copyRef.current) {
        copyRef.current.style.opacity = '1'
        copyRef.current.style.transform = 'none'
      }
      copyNodesRef.current.forEach((node) => {
        node.style.opacity = '1'
        node.style.transform = 'translate3d(0,0,0) scale(1)'
      })
      return undefined
    }

    const section = sectionRef.current
    const stage = stageRef.current
    if (!section || !stage) return undefined

    let raf = 0
    let active = false
    let lastFrame = performance.now()
    let lastScrollY = window.scrollY
    let lastCopyProgress = -1
    // Continuous conveyor offset in path units.
    let travel = 0
    // -1 = pieces rise, +1 = pieces fall (destination follows scroll intent).
    let flowDir = -1
    let speed = BASE_SPEED
    const piecesMap = pieceRefs.current

    const readCopyProgress = () => {
      const maxScroll = section.offsetHeight - window.innerHeight
      if (maxScroll <= 0) return 0
      const traveled = -section.getBoundingClientRect().top
      return clamp(traveled / maxScroll, 0, 1)
    }

    const applyPieces = (now) => {
      const driftScale = viewportWidth < 768 ? 0.4 : viewportWidth < 1024 ? 0.7 : 1
      const t = now * 0.001

      visiblePieces.forEach((piece) => {
        const node = pieceRefs.current.get(piece.id)
        if (!node) return

        // Full-path seeds = dense continuous stream (no empty wave gaps).
        const seed = pieceSeed(piece.id)
        const pieceSpeed = 0.78 + piece.depth * 0.4
        const along = wrap01(seed + travel * pieceSpeed)
        const y = lerp(SPAWN_Y, EXIT_Y, along)

        const rotation = lerp(piece.startRotation, piece.endRotation, along)
        const scale = lerp(piece.startScale, piece.endScale, along)
        const xDrift = Math.sin(along * Math.PI) * piece.drift * driftScale

        let opacity = piece.opacity
        if (along < 0.05) opacity *= along / 0.05
        else if (along > 0.92) opacity *= clamp((1 - along) / 0.08, 0, 1)

        const phase = hashPhase(piece.id)
        const idleAmp = piece.idle ?? 1
        const idleY = Math.sin(t * 0.55 * idleAmp + phase) * 0.45
        const idleX = Math.cos(t * 0.42 * idleAmp + phase * 1.3) * 2.8
        const idleRot = Math.sin(t * 0.38 * idleAmp + phase * 0.7) * 1.2

        node.style.opacity = String(opacity)
        node.style.transform = `translate3d(calc(-50% + ${xDrift + idleX}px), -50%, 0) translateY(${y + idleY}vh) rotate(${rotation + idleRot}deg) scale(${scale})`
      })
    }

    const applyFrame = (now) => {
      const dt = Math.min((now - lastFrame) / 1000, 0.048)
      lastFrame = now

      // Keep moving at base speed; never freeze. Direction stays until reversed.
      speed = lerp(speed, BASE_SPEED, Math.min(1, dt * SPEED_RETURN))
      speed = clamp(speed, MIN_SPEED, MAX_SPEED)

      // flowDir -1 → travel increases → pieces rise; +1 → travel decreases → fall.
      travel += (-flowDir * speed) / PATH_SPAN * dt

      const copyProgress = readCopyProgress()
      stage.style.setProperty('--puzzle-progress', String(copyProgress))
      if (Math.abs(copyProgress - lastCopyProgress) >= 0.002) {
        lastCopyProgress = copyProgress
        applyCopyMotion(copyNodesRef.current, copyProgress)
      }

      applyPieces(now)
    }

    const loop = (now) => {
      raf = 0
      if (!active) return
      applyFrame(now)
      raf = window.requestAnimationFrame(loop)
    }

    const startLoop = () => {
      if (raf || !active) return
      lastFrame = performance.now()
      raf = window.requestAnimationFrame(loop)
    }

    const stopLoop = () => {
      if (raf) {
        window.cancelAnimationFrame(raf)
        raf = 0
      }
    }

    const onScroll = () => {
      if (!active) {
        lastScrollY = window.scrollY
        return
      }
      const y = window.scrollY
      const delta = y - lastScrollY
      lastScrollY = y
      if (Math.abs(delta) < 0.2) return

      // Scroll down → pieces go up. Scroll up (back) → pieces reverse downward.
      if (delta > DIR_FLIP_DELTA) flowDir = -1
      else if (delta < -DIR_FLIP_DELTA) flowDir = 1

      speed = clamp(speed + Math.abs(delta) * SCROLL_IMPULSE, MIN_SPEED, MAX_SPEED)
    }

    const activate = () => {
      if (active) return
      active = true
      stage.classList.add('is-active')
      // Start slightly biased so the first wave rises from below, still dense.
      travel = -0.28
      flowDir = -1
      speed = BASE_SPEED
      lastScrollY = window.scrollY
      lastFrame = performance.now()
      pieceRefs.current.forEach((node) => {
        node.style.willChange = 'transform, opacity'
      })
      window.addEventListener('scroll', onScroll, { passive: true })
      applyCopyMotion(copyNodesRef.current, readCopyProgress())
      applyPieces(performance.now())
      startLoop()
    }

    const deactivate = () => {
      if (!active) return
      active = false
      stage.classList.remove('is-active')
      window.removeEventListener('scroll', onScroll)
      pieceRefs.current.forEach((node) => {
        node.style.willChange = 'auto'
      })
      stopLoop()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) activate()
        else deactivate()
      },
      { root: null, rootMargin: '15% 0px', threshold: 0 },
    )

    observer.observe(section)

    const boot = window.requestAnimationFrame(() => {
      const rect = section.getBoundingClientRect()
      const near = rect.bottom > 0 && rect.top < window.innerHeight * 1.05
      if (near) activate()
    })

    return () => {
      window.cancelAnimationFrame(boot)
      observer.disconnect()
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
              ? Math.round(piece.size * 0.74)
              : viewportWidth < 1024
                ? Math.round(piece.size * 0.82)
                : piece.size
          }
          variant={piece.variant}
          shape={piece.shape}
          blurred={Boolean(piece.blurred)}
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

        <div className="connected-care__layer connected-care__layer--back" aria-hidden="true">
          {renderLayer(layers.back)}
        </div>
        <div className="connected-care__layer connected-care__layer--middle" aria-hidden="true">
          {renderLayer(layers.middle)}
        </div>

        <div className="connected-care__content">
          <div ref={copyRef} className="connected-care__copy">
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
