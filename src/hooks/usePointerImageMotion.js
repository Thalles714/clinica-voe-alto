import { useEffect } from 'react'

/**
 * Pointer-driven image motion (Longbow-inspired).
 * Sets --pointer-x / --pointer-y via rAF. No React state on move.
 * Disabled for touch / reduced-motion.
 */
export default function usePointerImageMotion(containerRef, { enabled = true } = {}) {
  useEffect(() => {
    const node = containerRef.current
    if (!node || !enabled) return undefined

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reduceMotion) return undefined

    let raf = 0
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let active = false
    let inView = true

    const apply = () => {
      raf = 0
      currentX += (targetX - currentX) * 0.14
      currentY += (targetY - currentY) * 0.14
      node.style.setProperty('--pointer-x', currentX.toFixed(4))
      node.style.setProperty('--pointer-y', currentY.toFixed(4))
      if (
        Math.abs(targetX - currentX) > 0.001 ||
        Math.abs(targetY - currentY) > 0.001
      ) {
        raf = window.requestAnimationFrame(apply)
      }
    }

    const schedule = () => {
      if (!inView) return
      if (!raf) raf = window.requestAnimationFrame(apply)
    }

    const onMove = (event) => {
      if (!active || !inView) return
      const rect = node.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      const x = (event.clientX - rect.left) / rect.width
      const y = (event.clientY - rect.top) / rect.height
      targetX = Math.max(-1, Math.min(1, x * 2 - 1))
      targetY = Math.max(-1, Math.min(1, y * 2 - 1))
      schedule()
    }

    const onEnter = () => {
      active = true
      node.classList.add('is-pointer-active')
    }

    const onLeave = () => {
      active = false
      node.classList.remove('is-pointer-active')
      targetX = 0
      targetY = 0
      schedule()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        if (!inView) {
          targetX = 0
          targetY = 0
          currentX = 0
          currentY = 0
          node.style.setProperty('--pointer-x', '0')
          node.style.setProperty('--pointer-y', '0')
          node.classList.remove('is-pointer-active')
        }
      },
      { threshold: 0.05 },
    )
    observer.observe(node)

    node.addEventListener('pointerenter', onEnter)
    node.addEventListener('pointerleave', onLeave)
    node.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      observer.disconnect()
      node.removeEventListener('pointerenter', onEnter)
      node.removeEventListener('pointerleave', onLeave)
      node.removeEventListener('pointermove', onMove)
      if (raf) window.cancelAnimationFrame(raf)
      node.classList.remove('is-pointer-active')
      node.style.removeProperty('--pointer-x')
      node.style.removeProperty('--pointer-y')
    }
  }, [containerRef, enabled])
}
