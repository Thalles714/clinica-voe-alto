import { useEffect, useRef, useState } from 'react'
import usePointerImageMotion from '../../hooks/usePointerImageMotion'

const INTENSITY = {
  hero: { move: '10px', scale: '1.045' },
  medium: { move: '7px', scale: '1.035' },
  soft: { move: '4px', scale: '1.02' },
}

function isNearViewport(node) {
  const rect = node.getBoundingClientRect()
  const vh = window.innerHeight || 1
  return rect.bottom > -vh * 0.2 && rect.top < vh * 1.2
}

/**
 * Image with optional clip reveal + pointer parallax (fine pointer only).
 * Reveal is driven by IntersectionObserver (and near-viewport check).
 * A long timeout is only a last-resort safety net, then cancelled on success.
 */
export default function InteractiveImage({
  src,
  alt,
  width,
  height,
  className = '',
  imgClassName = '',
  objectPosition = 'object-center',
  intensity = 'medium',
  reveal = 'none',
  priority = false,
  glow = false,
  children,
}) {
  const ref = useRef(null)
  const [revealed, setRevealed] = useState(reveal === 'none')
  const preset = INTENSITY[intensity] ?? INTENSITY.medium

  usePointerImageMotion(ref, { enabled: true })

  useEffect(() => {
    if (reveal === 'none') return undefined
    const node = ref.current
    if (!node) return undefined

    let done = false
    let safety = 0
    let observer

    const finish = () => {
      if (done) return
      done = true
      if (safety) window.clearTimeout(safety)
      observer?.disconnect()
      setRevealed(true)
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish()
      return undefined
    }

    if (priority) {
      const timer = window.setTimeout(finish, 90)
      return () => window.clearTimeout(timer)
    }

    // Primary path: already near viewport, or IntersectionObserver.
    if (isNearViewport(node)) {
      // Defer one frame so CSS can apply the closed clip before opening.
      const raf = window.requestAnimationFrame(() => finish())
      return () => window.cancelAnimationFrame(raf)
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) finish()
      },
      { threshold: 0.02, rootMargin: '20% 0px' },
    )
    observer.observe(node)

    const onScrollOrResize = () => {
      if (isNearViewport(node)) finish()
    }
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize, { passive: true })

    // Last-resort only — should rarely run if IO/near-viewport works.
    safety = window.setTimeout(finish, 4500)

    return () => {
      done = true
      observer?.disconnect()
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      if (safety) window.clearTimeout(safety)
    }
  }, [reveal, priority])

  return (
    <div
      ref={ref}
      className={['interactive-image', `interactive-image--${intensity}`, className]
        .filter(Boolean)
        .join(' ')}
      style={{
        '--move-x': preset.move,
        '--move-y': preset.move,
        '--img-scale': preset.scale,
      }}
    >
      <div
        className={[
          'interactive-image__stage',
          reveal !== 'none' ? `interactive-image--reveal-${reveal}` : '',
          revealed ? 'is-revealed' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : undefined}
          className={[
            'interactive-image__media',
            objectPosition,
            imgClassName,
          ]
            .filter(Boolean)
            .join(' ')}
        />
        {glow ? <span className="interactive-image__glow" aria-hidden="true" /> : null}
        {children}
      </div>
    </div>
  )
}
