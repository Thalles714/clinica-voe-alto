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
let unlocked = false
let htmlAudio = null

function getAudioContext() {
  if (audioContext) return audioContext
  const Ctx = window.AudioContext || window.webkitAudioContext
  if (!Ctx) return null
  audioContext = new Ctx()
  return audioContext
}

function getHtmlAudio() {
  if (htmlAudio) return htmlAudio
  htmlAudio = new Audio(CLICK_SOUND_URL)
  htmlAudio.preload = 'auto'
  htmlAudio.setAttribute('playsinline', '')
  htmlAudio.volume = 0.9
  return htmlAudio
}

function loadClickBuffer() {
  if (clickBuffer) return Promise.resolve(clickBuffer)
  if (loadPromise) return loadPromise

  const ctx = getAudioContext()
  if (!ctx) return Promise.reject(new Error('Web Audio unavailable'))

  loadPromise = fetch(CLICK_SOUND_URL, { cache: 'force-cache' })
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

function unlockAudioFromGesture() {
  const ctx = getAudioContext()
  if (!ctx) return Promise.resolve(false)

  const resume =
    ctx.state === 'suspended' || ctx.state === 'interrupted'
      ? ctx.resume()
      : Promise.resolve()

  return resume
    .then(() => {
      if (!unlocked && ctx.state === 'running') {
        try {
          const silence = ctx.createBuffer(1, 1, ctx.sampleRate || 22050)
          const source = ctx.createBufferSource()
          source.buffer = silence
          source.connect(ctx.destination)
          source.start(0)
        } catch {
          /* ignore */
        }
        unlocked = true
      }
      // Warm HTMLAudio unlock in the same gesture (iOS / some Android).
      try {
        const audio = getHtmlAudio()
        audio.muted = true
        const playPromise = audio.play()
        if (playPromise?.then) {
          playPromise
            .then(() => {
              audio.pause()
              audio.currentTime = 0
              audio.muted = false
            })
            .catch(() => {
              audio.muted = false
            })
        } else {
          audio.muted = false
        }
      } catch {
        /* ignore */
      }
      return ctx.state === 'running'
    })
    .catch(() => false)
}

function playBufferedClick() {
  const ctx = getAudioContext()
  if (!ctx || !clickBuffer || ctx.state !== 'running') return false

  try {
    const source = ctx.createBufferSource()
    source.buffer = clickBuffer
    const gain = ctx.createGain()
    const isCoarse =
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: coarse)').matches
    gain.gain.setValueAtTime(isCoarse ? 0.95 : 0.72, ctx.currentTime)
    source.connect(gain)
    gain.connect(ctx.destination)
    source.start(0)
    source.onended = () => {
      try {
        source.disconnect()
        gain.disconnect()
      } catch {
        /* already disconnected */
      }
    }
    return true
  } catch {
    return false
  }
}

function playHtmlClick() {
  try {
    const audio = getHtmlAudio()
    audio.muted = false
    audio.currentTime = 0
    const playPromise = audio.play()
    if (playPromise?.catch) playPromise.catch(() => {})
    return true
  } catch {
    return false
  }
}

/**
 * Plays one click sample. Call from a real user gesture on mobile.
 */
export function playClickSound() {
  const ctx = getAudioContext()

  const finish = () => {
    if (playBufferedClick()) return
    playHtmlClick()
  }

  const afterReady = () => {
    if (clickBuffer) {
      finish()
      return
    }
    loadClickBuffer()
      .then(finish)
      .catch(() => {
        playHtmlClick()
      })
  }

  if (!ctx) {
    playHtmlClick()
    return
  }

  unlockAudioFromGesture().then(() => afterReady())
}

function isClickableTarget(target) {
  if (!(target instanceof Element) && !(target instanceof Text)) return false
  const el =
    target instanceof Element
      ? target
      : target.parentElement
  if (!(el instanceof Element)) return false
  const hit = el.closest(CLICKABLE_SELECTOR)
  if (!hit) return false
  if (hit.closest('[data-no-click-sound]')) return false
  return hit
}

function shouldIgnoreMouse(event) {
  return event.pointerType === 'mouse' && event.button !== 0
}

/**
 * Global delegation for keyboard + pointer/touch activation.
 */
export function initGlobalClickSound() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return () => {}

  // Click sound is intentional UI feedback — do not disable for reduced motion.
  try {
    if (navigator.connection?.saveData) return () => {}
  } catch {
    /* ignore */
  }

  const warmFromGesture = () => {
    unlockAudioFromGesture().finally(() => {
      loadClickBuffer().catch(() => {})
      try {
        getHtmlAudio().load()
      } catch {
        /* ignore */
      }
    })
  }

  // Prefetch decode early (playback still needs gesture unlock).
  loadClickBuffer().catch(() => {})
  try {
    getHtmlAudio().load()
  } catch {
    /* ignore */
  }

  const onActivate = (event) => {
    if (!isClickableTarget(event.target)) return
    playClickSound()
  }

  const onPointerDown = (event) => {
    if (typeof event.isPrimary === 'boolean' && !event.isPrimary) return
    if (shouldIgnoreMouse(event)) return
    onActivate(event)
  }

  const onTouchStart = (event) => {
    onActivate(event)
  }

  const onKeyDown = (event) => {
    if (event.repeat) return
    if (event.key !== 'Enter' && event.key !== ' ') return
    onActivate(event)
  }

  const supportsPointer = typeof window.PointerEvent !== 'undefined'

  if (supportsPointer) {
    document.addEventListener('pointerdown', onPointerDown, { capture: true, passive: true })
    window.addEventListener('pointerdown', warmFromGesture, {
      capture: true,
      once: true,
      passive: true,
    })
  } else {
    document.addEventListener('touchstart', onTouchStart, { capture: true, passive: true })
    window.addEventListener('touchstart', warmFromGesture, {
      capture: true,
      once: true,
      passive: true,
    })
  }

  document.addEventListener('keydown', onKeyDown, { capture: true })
  window.addEventListener('keydown', warmFromGesture, { capture: true, once: true })

  return () => {
    if (supportsPointer) {
      document.removeEventListener('pointerdown', onPointerDown, true)
      window.removeEventListener('pointerdown', warmFromGesture, true)
    } else {
      document.removeEventListener('touchstart', onTouchStart, true)
      window.removeEventListener('touchstart', warmFromGesture, true)
    }
    document.removeEventListener('keydown', onKeyDown, true)
    window.removeEventListener('keydown', warmFromGesture, true)
    if (audioContext) {
      audioContext.close().catch(() => {})
      audioContext = null
    }
    clickBuffer = null
    loadPromise = null
    unlocked = false
    htmlAudio = null
  }
}
