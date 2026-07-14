import { useEffect, useMemo, useRef, useState } from 'react'
import Badge from '../ui/Badge'
import PuzzlePiece from '../ui/PuzzlePiece'

/**
 * Deterministic puzzle field (Hero Patterns jigsaw silhouette model).
 * showFrom: 0 mobile+ / 768 tablet+ / 1024 desktop
 * Counts: mobile ~16 · tablet ~22 · desktop 30
 */
const PUZZLE_PIECES = [
  { id: 'p01', x: -8, startY: 122, endY: -30, size: 176, startRotation: -14, endRotation: 9, startScale: 0.9, endScale: 1.12, opacity: 0.78, depth: 1.2, drift: 12, variant: 'blue', shape: 'classic', layer: 'front', start: 0.02, end: 0.9, showFrom: 1024, idle: 1.15 },
  { id: 'p02', x: 88, startY: 136, endY: -38, size: 158, startRotation: 11, endRotation: -10, startScale: 0.88, endScale: 1.1, opacity: 0.74, depth: 1.16, drift: -11, variant: 'pink', shape: 'adjacent', layer: 'front', start: 0.08, end: 0.94, showFrom: 0, blurred: true, idle: 1.05 },
  { id: 'p03', x: 6, startY: 110, endY: -24, size: 128, startRotation: -9, endRotation: 13, startScale: 0.92, endScale: 1.05, opacity: 0.64, depth: 0.98, drift: 7, variant: 'gradient', shape: 'alt', layer: 'middle', start: 0.0, end: 0.84, showFrom: 0, idle: 0.9 },
  { id: 'p04', x: 74, startY: 126, endY: -32, size: 116, startRotation: 16, endRotation: -7, startScale: 0.94, endScale: 1.06, opacity: 0.68, depth: 1.04, drift: -6, variant: 'blue-glass', shape: 'classic', layer: 'middle', start: 0.1, end: 0.9, showFrom: 0, idle: 0.95 },
  { id: 'p05', x: 46, startY: 142, endY: -42, size: 92, startRotation: -18, endRotation: 5, startScale: 0.86, endScale: 1.02, opacity: 0.4, depth: 0.7, drift: 4, variant: 'light-pink', shape: 'edge', layer: 'back', start: 0.04, end: 0.78, showFrom: 0, idle: 0.7 },
  { id: 'p06', x: 22, startY: 128, endY: -28, size: 142, startRotation: 7, endRotation: -12, startScale: 0.9, endScale: 1.09, opacity: 0.7, depth: 1.1, drift: 9, variant: 'pink-glass', shape: 'tri', layer: 'middle', start: 0.16, end: 0.95, showFrom: 0, idle: 1.0 },
  { id: 'p07', x: 96, startY: 114, endY: -20, size: 104, startRotation: -11, endRotation: 15, startScale: 0.93, endScale: 1.04, opacity: 0.52, depth: 0.86, drift: -8, variant: 'outline', shape: 'corner', layer: 'back', start: 0.08, end: 0.86, showFrom: 0, idle: 0.75 },
  { id: 'p08', x: -4, startY: 138, endY: -36, size: 120, startRotation: 9, endRotation: -11, startScale: 0.91, endScale: 1.07, opacity: 0.58, depth: 0.94, drift: 6, variant: 'frosted', shape: 'alt', layer: 'middle', start: 0.2, end: 0.94, showFrom: 0, idle: 0.88 },
  { id: 'p09', x: 58, startY: 152, endY: -46, size: 168, startRotation: -5, endRotation: 11, startScale: 0.88, endScale: 1.13, opacity: 0.76, depth: 1.18, drift: -10, variant: 'blue', shape: 'edgeAlt', layer: 'front', start: 0.26, end: 0.98, showFrom: 1024, idle: 1.2 },
  { id: 'p10', x: 36, startY: 118, endY: -22, size: 80, startRotation: 20, endRotation: -4, startScale: 0.9, endScale: 1.0, opacity: 0.36, depth: 0.62, drift: 3, variant: 'pink', shape: 'adjacentAlt', layer: 'back', start: 0.0, end: 0.72, showFrom: 0, idle: 0.65 },
  { id: 'p11', x: 80, startY: 130, endY: -34, size: 136, startRotation: -13, endRotation: 8, startScale: 0.92, endScale: 1.08, opacity: 0.66, depth: 1.08, drift: 8, variant: 'gradient', shape: 'classic', layer: 'middle', start: 0.14, end: 0.91, showFrom: 1024, idle: 1.02 },
  { id: 'p12', x: 12, startY: 146, endY: -40, size: 108, startRotation: 8, endRotation: -16, startScale: 0.9, endScale: 1.06, opacity: 0.6, depth: 1.0, drift: -5, variant: 'blue-glass', shape: 'cornerAlt', layer: 'middle', start: 0.18, end: 0.96, showFrom: 0, idle: 0.92 },
  { id: 'p13', x: 50, startY: 124, endY: -26, size: 70, startRotation: -22, endRotation: 6, startScale: 0.88, endScale: 0.98, opacity: 0.32, depth: 0.56, drift: 2, variant: 'outline', shape: 'classic', layer: 'back', start: 0.06, end: 0.8, showFrom: 1024, idle: 0.6 },
  { id: 'p14', x: 94, startY: 140, endY: -44, size: 148, startRotation: 4, endRotation: -9, startScale: 0.9, endScale: 1.1, opacity: 0.72, depth: 1.14, drift: -13, variant: 'pink', shape: 'alt', layer: 'front', start: 0.3, end: 1.0, showFrom: 1024, idle: 1.12 },
  { id: 'p15', x: 2, startY: 120, endY: -28, size: 96, startRotation: -10, endRotation: 12, startScale: 0.93, endScale: 1.03, opacity: 0.48, depth: 0.8, drift: 7, variant: 'light-pink', shape: 'triAlt', layer: 'back', start: 0.12, end: 0.88, showFrom: 0, idle: 0.78 },
  { id: 'p16', x: 66, startY: 148, endY: -36, size: 122, startRotation: 13, endRotation: -8, startScale: 0.91, endScale: 1.07, opacity: 0.64, depth: 1.03, drift: 5, variant: 'frosted', shape: 'adjacent', layer: 'middle', start: 0.22, end: 0.97, showFrom: 1024, idle: 0.98 },
  { id: 'p17', x: 28, startY: 134, endY: -30, size: 102, startRotation: -7, endRotation: 10, startScale: 0.92, endScale: 1.05, opacity: 0.55, depth: 0.92, drift: -4, variant: 'pink-glass', shape: 'edge', layer: 'middle', start: 0.05, end: 0.88, showFrom: 0, idle: 0.85 },
  { id: 'p18', x: 84, startY: 108, endY: -18, size: 90, startRotation: 15, endRotation: -6, startScale: 0.94, endScale: 1.03, opacity: 0.44, depth: 0.74, drift: 5, variant: 'blue', shape: 'corner', layer: 'back', start: 0.24, end: 0.92, showFrom: 0, idle: 0.72 },
  { id: 'p19', x: -10, startY: 150, endY: -42, size: 134, startRotation: 6, endRotation: -14, startScale: 0.89, endScale: 1.08, opacity: 0.7, depth: 1.12, drift: 10, variant: 'gradient', shape: 'tri', layer: 'front', start: 0.34, end: 0.99, showFrom: 1024, idle: 1.08 },
  { id: 'p20', x: 42, startY: 112, endY: -24, size: 74, startRotation: -16, endRotation: 8, startScale: 0.9, endScale: 1.01, opacity: 0.34, depth: 0.6, drift: -3, variant: 'outline', shape: 'edgeAlt', layer: 'back', start: 0.18, end: 0.85, showFrom: 0, idle: 0.68 },
  { id: 'p21', x: 70, startY: 160, endY: -48, size: 154, startRotation: -8, endRotation: 12, startScale: 0.87, endScale: 1.11, opacity: 0.72, depth: 1.15, drift: -9, variant: 'blue-glass', shape: 'adjacentAlt', layer: 'front', start: 0.28, end: 0.97, showFrom: 1024, idle: 1.1, blurred: true },
  { id: 'p22', x: 18, startY: 104, endY: -16, size: 112, startRotation: 10, endRotation: -9, startScale: 0.93, endScale: 1.05, opacity: 0.58, depth: 0.9, drift: 6, variant: 'pink', shape: 'classic', layer: 'middle', start: 0.12, end: 0.86, showFrom: 0, idle: 0.86 },
  { id: 'p23', x: 54, startY: 156, endY: -44, size: 118, startRotation: -12, endRotation: 7, startScale: 0.89, endScale: 1.08, opacity: 0.62, depth: 1.06, drift: 8, variant: 'pink-glass', shape: 'edgeBottom', layer: 'middle', start: 0.2, end: 0.93, showFrom: 0, idle: 0.94 },
  { id: 'p24', x: -12, startY: 116, endY: -26, size: 98, startRotation: 14, endRotation: -8, startScale: 0.92, endScale: 1.04, opacity: 0.5, depth: 0.84, drift: -7, variant: 'light-pink', shape: 'cornerBL', layer: 'back', start: 0.15, end: 0.89, showFrom: 1024, idle: 0.8 },
  { id: 'p25', x: 98, startY: 154, endY: -40, size: 130, startRotation: -6, endRotation: 13, startScale: 0.9, endScale: 1.09, opacity: 0.7, depth: 1.13, drift: -12, variant: 'blue', shape: 'triAlt', layer: 'front', start: 0.32, end: 0.98, showFrom: 1024, idle: 1.14 },
  { id: 'p26', x: 32, startY: 148, endY: -34, size: 86, startRotation: 18, endRotation: -5, startScale: 0.91, endScale: 1.02, opacity: 0.42, depth: 0.68, drift: 4, variant: 'frosted', shape: 'adjacent', layer: 'back', start: 0.1, end: 0.82, showFrom: 0, idle: 0.7 },
  { id: 'p27', x: 62, startY: 106, endY: -14, size: 124, startRotation: -15, endRotation: 9, startScale: 0.93, endScale: 1.07, opacity: 0.66, depth: 1.0, drift: -6, variant: 'gradient', shape: 'alt', layer: 'middle', start: 0.24, end: 0.9, showFrom: 768, idle: 0.96 },
  { id: 'p28', x: 8, startY: 158, endY: -48, size: 140, startRotation: 5, endRotation: -12, startScale: 0.88, endScale: 1.1, opacity: 0.74, depth: 1.17, drift: 11, variant: 'pink', shape: 'classic', layer: 'front', start: 0.36, end: 1.0, showFrom: 1024, idle: 1.18 },
  { id: 'p29', x: 76, startY: 120, endY: -28, size: 78, startRotation: -19, endRotation: 6, startScale: 0.9, endScale: 1.0, opacity: 0.38, depth: 0.64, drift: 3, variant: 'outline', shape: 'corner', layer: 'back', start: 0.16, end: 0.84, showFrom: 0, idle: 0.66 },
  { id: 'p30', x: 44, startY: 132, endY: -36, size: 150, startRotation: 8, endRotation: -11, startScale: 0.89, endScale: 1.12, opacity: 0.7, depth: 1.14, drift: -8, variant: 'blue-glass', shape: 'tri', layer: 'front', start: 0.22, end: 0.95, showFrom: 1024, idle: 1.08, blurred: true },
]

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function lerp(a, b, t) {
  return a + (b - a) * t
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

function easeInCubic(t) {
  return t * t * t
}

function getViewportWidth() {
  return typeof window === 'undefined' ? 1280 : window.innerWidth
}

function hashPhase(id) {
  let h = 0
  for (let i = 0; i < id.length; i += 1) h = (h * 31 + id.charCodeAt(i)) % 1000
  return (h / 1000) * Math.PI * 2
}

/**
 * Mobile: pieces used to spawn at 110–160vh (below the sticky stage),
 * so most of the scroll felt empty. Bring starts into view early and
 * stretch travel so several pieces stay readable while swiping.
 */
function adaptPiece(piece, viewportWidth) {
  if (viewportWidth >= 768) return piece

  const startY = clamp(48 + (piece.startY - 100) * 0.38, 46, 82)
  const endY = clamp(piece.endY * 0.55, -28, -8)
  const start = clamp(piece.start * 0.35, 0, 0.1)
  const end = clamp(Math.max(piece.end, 0.9), 0.88, 0.98)

  return {
    ...piece,
    startY,
    endY,
    start,
    end,
    // Keep depth near 1 so pieces actually cross the stage.
    depth: clamp(piece.depth, 0.92, 1.08),
    opacity: Math.min(0.9, piece.opacity + 0.14),
  }
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
    () =>
      PUZZLE_PIECES.filter((piece) => viewportWidth >= piece.showFrom).map((piece) =>
        adaptPiece(piece, viewportWidth),
      ),
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
      pieceRefs.current.forEach((node, id) => {
        const piece = visiblePieces.find((item) => item.id === id)
        if (!node || !piece) return
        const rest = 0.42 + (piece.depth % 1) * 0.12
        const y = lerp(piece.startY, piece.endY, rest)
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
    let lastProgress = -1
    let idleStrength = 0
    let lastFrame = performance.now()
    let lastScrollAt = performance.now()
    let scrollIdleTimer = 0
    const piecesMap = pieceRefs.current

    const readProgress = () => {
      const maxScroll = section.offsetHeight - window.innerHeight
      if (maxScroll <= 0) return 0
      const traveled = -section.getBoundingClientRect().top
      return clamp(traveled / maxScroll, 0, 1)
    }

    const applyFrame = (progress, now, force = false) => {
      const scrolling = now - lastScrollAt < 140
      const dt = Math.min((now - lastFrame) / 1000, 0.048)
      lastFrame = now

      const targetIdle = scrolling ? 0 : 1
      idleStrength = lerp(idleStrength, targetIdle, scrolling ? Math.min(1, dt * 8) : Math.min(1, dt * 2.2))

      const progressChanged = Math.abs(progress - lastProgress) >= 0.0008
      if (!force && !progressChanged && idleStrength < 0.01 && targetIdle === 0) return

      lastProgress = progress
      stage.style.setProperty('--puzzle-progress', String(progress))
      if (progressChanged || force) applyCopyMotion(copyNodesRef.current, progress)

      const driftScale = viewportWidth < 768 ? 0.35 : viewportWidth < 1024 ? 0.65 : 1
      const t = now * 0.001

      visiblePieces.forEach((piece) => {
        const node = pieceRefs.current.get(piece.id)
        if (!node) return

        const span = Math.max(piece.end - piece.start, 0.001)
        const local = clamp((progress - piece.start) / span, 0, 1)
        const eased = easeInOutCubic(local)
        // On mobile, avoid depth < 1 that stalls pieces below the fold.
        const depthFactor = viewportWidth < 768 ? 1 : piece.depth
        const depthT = clamp(eased * depthFactor, 0, 1)

        const y = lerp(piece.startY, piece.endY, depthT)
        const xDrift = Math.sin(eased * Math.PI) * piece.drift * driftScale
        const rotation = lerp(piece.startRotation, piece.endRotation, eased)
        const scale = lerp(piece.startScale, piece.endScale, eased)

        let opacity = piece.opacity
        if (progress < piece.start) {
          opacity = 0
        } else if (local < 0.08) {
          const fadeIn = local / 0.08
          // Mobile pieces spawn already in-frame — keep a readable base opacity.
          opacity *= viewportWidth < 768 ? lerp(0.55, 1, fadeIn) : fadeIn
        } else if (local > 0.88) {
          opacity *= clamp((1 - local) / 0.12, 0, 1)
        }

        const phase = hashPhase(piece.id)
        const idleAmp = (piece.idle ?? 1) * idleStrength
        const idleY = Math.sin(t * 0.55 * (piece.idle ?? 1) + phase) * 0.55 * idleAmp
        const idleX = Math.cos(t * 0.42 * (piece.idle ?? 1) + phase * 1.3) * 3.2 * idleAmp
        const idleRot = Math.sin(t * 0.38 * (piece.idle ?? 1) + phase * 0.7) * 1.4 * idleAmp

        node.style.opacity = String(opacity)
        node.style.transform = `translate3d(calc(-50% + ${xDrift + idleX}px), -50%, 0) translateY(${y + idleY}vh) rotate(${rotation + idleRot}deg) scale(${scale})`
      })
    }

    const loop = (now) => {
      raf = 0
      if (!active) return
      applyFrame(readProgress(), now)
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
      lastScrollAt = performance.now()
      window.clearTimeout(scrollIdleTimer)
      scrollIdleTimer = window.setTimeout(() => {
        lastScrollAt = performance.now() - 160
      }, 120)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const nextActive = entry.isIntersecting
        if (nextActive === active) return

        active = nextActive
        if (active) {
          stage.classList.add('is-active')
          pieceRefs.current.forEach((node) => {
            node.style.willChange = 'transform, opacity'
          })
          window.addEventListener('scroll', onScroll, { passive: true })
          applyFrame(readProgress(), performance.now(), true)
          startLoop()
        } else {
          stage.classList.remove('is-active')
          window.removeEventListener('scroll', onScroll)
          pieceRefs.current.forEach((node) => {
            node.style.willChange = 'auto'
          })
          stopLoop()
        }
      },
      { root: null, rootMargin: '20% 0px', threshold: 0 },
    )

    observer.observe(section)
    window.addEventListener('resize', onScroll, { passive: true })

    const boot = window.requestAnimationFrame(() => {
      const rect = section.getBoundingClientRect()
      const near = rect.bottom > -window.innerHeight * 0.2 && rect.top < window.innerHeight * 1.2
      if (near && !active) {
        active = true
        stage.classList.add('is-active')
        window.addEventListener('scroll', onScroll, { passive: true })
        applyFrame(readProgress(), performance.now(), true)
        startLoop()
      }
    })

    return () => {
      active = false
      window.cancelAnimationFrame(boot)
      window.clearTimeout(scrollIdleTimer)
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      stopLoop()
      piecesMap.forEach((node) => {
        node.style.willChange = 'auto'
      })
    }
  }, [reduceMotion, visiblePieces, viewportWidth])

  // Callback refs: registered when React attaches nodes, not during render paint.
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
          opacity: piece.opacity,
          transform: `translate3d(-50%, -50%, 0) translateY(${piece.startY}vh) rotate(${piece.startRotation}deg) scale(${piece.startScale})`,
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
