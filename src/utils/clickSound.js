const CLICK_SOUND_URL = '/sound/sound-click.mp3'

const CLICKABLE_SELECTOR = [
  'button:not([disabled]):not([data-no-click-sound])',
  '[role="button"]:not([aria-disabled="true"]):not([data-no-click-sound])',
  'a.ui-button:not([aria-disabled="true"]):not([data-no-click-sound])',
  'a.site-header__logo:not([data-no-click-sound])',
  'a.site-header__link:not([data-no-click-sound])',
  'a.mobile-nav__link:not([data-no-click-sound])',
  'input[type="button"]:not([disabled])',
  'input[type="submit"]:not([disabled])',
  'input[type="reset"]:not([disabled])',
  'summary:not([data-no-click-sound])',
].join(',')

let audioContext = null
let clickBuffer = null
let loadPromise = null

function getAudioContext() {
  if (audioContext) return audioContext
  const Ctx = window.AudioContext || window.webkitAudioContext
  if (!Ctx) return null
  audioContext = new Ctx()
  return audioContext
}

function loadClickBuffer() {
  if (clickBuffer) return Promise.resolve(clickBuffer)
  if (loadPromise) return loadPromise

  const ctx = getAudioContext()
  if (!ctx) return Promise.reject(new Error('Web Audio unavailable'))

  loadPromise = fetch(CLICK_SOUND_URL)
    .then((response) => {
      if (!response.ok) throw new Error(`Click sound HTTP ${response.status}`)
      return response.arrayBuffer()
    })
    .then((data) => ctx.decodeAudioData(data.slice(0)))
    .then((buffer) => {
      clickBuffer = buffer
      return buffer
    })
    .catch((error) => {
      loadPromise = null
      throw error
    })

  return loadPromise
}

async function unlockAudio() {
  const ctx = getAudioContext()
  if (!ctx) return
  if (ctx.state === 'suspended') {
    try {
      await ctx.resume()
    } catch {
      /* autoplay policy */
    }
  }
}

/**
 * Plays one click sample immediately. Each call spawns a fresh BufferSource so
 * rapid clicks overlap instead of truncating the previous play.
 */
export function playClickSound() {
  const ctx = getAudioContext()
  if (!ctx) return

  const trigger = () => {
    if (!clickBuffer) return
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {})
    }

    const source = ctx.createBufferSource()
    source.buffer = clickBuffer

    const gain = ctx.createGain()
    // Keep sharp attack; short soft release avoids abrupt cutoff if buffer ends hard.
    const now = ctx.currentTime
    gain.gain.setValueAtTime(0.72, now)

    source.connect(gain)
    gain.connect(ctx.destination)
    // start(0) schedules ASAP relative to the audio clock — stacks freely on spam-clicks.
    source.start(0)
    source.onended = () => {
      try {
        source.disconnect()
        gain.disconnect()
      } catch {
        /* already disconnected */
      }
    }
  }

  if (clickBuffer) {
    trigger()
    return
  }

  loadClickBuffer().then(trigger).catch(() => {})
}

function isClickableTarget(target) {
  if (!(target instanceof Element)) return false
  const el = target.closest(CLICKABLE_SELECTOR)
  if (!el) return false
  if (el.closest('[data-no-click-sound]')) return false
  return el
}

/**
 * Global delegation: one listener, Web Audio overlap, keyboard + pointer support.
 */
export function initGlobalClickSound() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return () => {}

  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const prefersReducedData = () => {
    try {
      return Boolean(navigator.connection?.saveData)
    } catch {
      return false
    }
  }

  if (prefersReducedMotion() || prefersReducedData()) {
    return () => {}
  }

  // Warm decode ASAP so the first real click is low-latency.
  const warm = () => {
    unlockAudio().finally(() => {
      loadClickBuffer().catch(() => {})
    })
  }

  const onFirstGesture = () => {
    warm()
    window.removeEventListener('pointerdown', onFirstGesture, true)
    window.removeEventListener('keydown', onFirstGesture, true)
  }

  window.addEventListener('pointerdown', onFirstGesture, { capture: true, once: true })
  window.addEventListener('keydown', onFirstGesture, { capture: true, once: true })

  // Start network fetch early (decode may wait for context unlock).
  loadClickBuffer().catch(() => {})

  const onPointerDown = (event) => {
    if (!event.isPrimary) return
    if (event.pointerType === 'mouse' && event.button !== 0) return
    if (!isClickableTarget(event.target)) return
    unlockAudio()
    playClickSound()
  }

  const onKeyDown = (event) => {
    if (event.repeat) return
    if (event.key !== 'Enter' && event.key !== ' ') return
    if (!isClickableTarget(event.target)) return
    // Space on buttons already triggers activation; play once per key press.
    unlockAudio()
    playClickSound()
  }

  document.addEventListener('pointerdown', onPointerDown, { capture: true, passive: true })
  document.addEventListener('keydown', onKeyDown, { capture: true })

  return () => {
    document.removeEventListener('pointerdown', onPointerDown, true)
    document.removeEventListener('keydown', onKeyDown, true)
    window.removeEventListener('pointerdown', onFirstGesture, true)
    window.removeEventListener('keydown', onFirstGesture, true)
    if (audioContext) {
      audioContext.close().catch(() => {})
      audioContext = null
    }
    clickBuffer = null
    loadPromise = null
  }
}
