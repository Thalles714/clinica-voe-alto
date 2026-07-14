import { useEffect, useRef, useState } from 'react'

/**
 * Scroll reveal — BridgeBio / Wolverine / Sacron inspired.
 * One-shot fade + slide when entering viewport.
 */
function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export default function Reveal({
  children,
  className = '',
  delay = 0,
  from = 'up',
  as: Tag = 'div',
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(prefersReducedMotion)

  useEffect(() => {
    if (visible) return undefined

    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -6% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [visible])

  const fromClass =
    from === 'left' ? 'reveal--from-left' : from === 'right' ? 'reveal--from-right' : ''

  return (
    <Tag
      ref={ref}
      className={['reveal', fromClass, visible ? 'is-visible' : '', className]
        .filter(Boolean)
        .join(' ')}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
