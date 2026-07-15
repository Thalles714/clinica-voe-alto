import { useEffect, useRef, useState } from 'react'
import Container from '../ui/Container'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import SectionTitle from '../ui/SectionTitle'
import InteractiveImage from '../ui/InteractiveImage'
import { whatsappUrl } from '../../data/clinic'

const teamMessage = 'Olá, gostaria de falar com a equipe da Clínica Voe Alto.'

const teamAreas = [
  {
    area: 'Aprendizagem e Neurodesenvolvimento',
    description:
      'Apoio a dificuldades escolares, desenvolvimento cognitivo e processos de aprendizagem.',
    image: '/imagens/equipe/area-aprendizagem-neurodesenvolvimento.webp',
    alt: 'Área de aprendizagem e neurodesenvolvimento da Clínica Voe Alto',
  },
  {
    area: 'Psicologia e Comportamento',
    description:
      'Cuidado emocional e comportamental em diferentes fases da vida, com escuta individualizada.',
    image: '/imagens/equipe/area-psicologia-comportamento.webp',
    alt: 'Área de psicologia e comportamento da Clínica Voe Alto',
  },
  {
    area: 'Comunicação e Linguagem',
    description:
      'Acompanhamento da comunicação, linguagem e fala para favorecer a expressão e a interação.',
    image: '/imagens/equipe/area-comunicacao-linguagem.webp',
    alt: 'Área de comunicação e linguagem da Clínica Voe Alto',
  },
  {
    area: 'Autonomia e Terapias Integradas',
    description:
      'Fortalecimento de rotina, habilidades funcionais e participação nas atividades do dia a dia.',
    image: '/imagens/equipe/area-autonomia-terapias-integradas.webp',
    alt: 'Área de autonomia e terapias integradas da Clínica Voe Alto',
  },
  {
    area: 'Acolhimento Familiar',
    description:
      'Orientação para famílias que querem compreender melhor as necessidades de quem amam.',
    image: '/imagens/equipe/area-acolhimento-familiar.webp',
    alt: 'Área de acolhimento familiar da Clínica Voe Alto',
  },
  {
    area: 'Orientação e Inclusão',
    description:
      'Suporte para construir caminhos mais seguros de desenvolvimento, inclusão e convivência.',
    image: '/imagens/equipe/area-orientacao-inclusao.webp',
    alt: 'Área de orientação e inclusão da Clínica Voe Alto',
  },
]

/** Base autoplay speed in px/s. */
const BASE_SPEED = 28
/** Floor while returning after a quiet scroll window. */
const MIN_SPEED = 16
/** Soft ceiling when scroll velocity is high. */
const MAX_SPEED = 86
/** Maps |ΔscrollY / Δt| into temporary speed boost. */
const SCROLL_BOOST = 0.42
/** How quickly speed eases back toward BASE_SPEED. */
const SPEED_RETURN = 1.25
const DRAG_CLICK_THRESHOLD = 8
const MAX_DRAG_VELOCITY = 2200
const DRAG_VELOCITY_BLEND = 0.38
const MOMENTUM_FRICTION = 3.2
const MOMENTUM_STOP_SPEED = 10

function lerp(current, target, amount) {
  return current + (target - current) * amount
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function ChevronIcon({ direction = 'next' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-5 w-5"
      aria-hidden="true"
    >
      {direction === 'prev' ? (
        <path
          fillRule="evenodd"
          d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
          clipRule="evenodd"
        />
      ) : (
        <path
          fillRule="evenodd"
          d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
          clipRule="evenodd"
        />
      )}
    </svg>
  )
}

function TeamCard({ item, decorative = false }) {
  return (
    <article
      className="team-carousel__card flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-sm shadow-brand-dark/5"
      aria-hidden={decorative ? true : undefined}
    >
      <InteractiveImage
        src={item.image}
        alt={decorative ? '' : item.alt}
        width={640}
        height={400}
        intensity="soft"
        reveal={decorative ? 'none' : 'fade-scale'}
        className="team-carousel__media relative aspect-[16/10] bg-surface-muted"
        objectPosition="object-center"
      />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-semibold leading-snug text-ink sm:text-xl">
          {item.area}
        </h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-muted sm:text-[0.95rem]">
          {item.description}
        </p>
      </div>
    </article>
  )
}

function TeamSet({ decorative = false }) {
  return (
    <div
      className="team-carousel__set"
      role={decorative ? undefined : 'list'}
      aria-label={decorative ? undefined : 'Áreas da equipe multidisciplinar'}
      aria-hidden={decorative ? true : undefined}
    >
      {teamAreas.map((item) => (
        <div
          key={`${decorative ? 'dup-' : ''}${item.area}`}
          className="team-carousel__item"
          role={decorative ? undefined : 'listitem'}
        >
          <TeamCard item={item} decorative={decorative} />
        </div>
      ))}
    </div>
  )
}

export default function Team() {
  const rootRef = useRef(null)
  const trackRef = useRef(null)
  const offsetRef = useRef(0)
  const pausedRef = useRef(false)
  const reduceMotionRef = useRef(false)
  const nudgeRef = useRef(() => {})
  const momentumRef = useRef(0)
  const dragRef = useRef({
    active: false,
    pointerId: null,
    startX: 0,
    startOffset: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
    moved: false,
  })

  const [paused, setPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  useEffect(() => {
    reduceMotionRef.current = reduceMotion
  }, [reduceMotion])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMotion = () => setReduceMotion(media.matches)
    syncMotion()
    media.addEventListener('change', syncMotion)
    return () => media.removeEventListener('change', syncMotion)
  }, [])

  useEffect(() => {
    const root = rootRef.current
    const track = trackRef.current
    if (!root || !track) return undefined

    let raf = 0
    let speed = BASE_SPEED
    let lastTime = 0
    let inView = true
    let lastScrollY = window.scrollY
    let lastScrollSample = performance.now()

    const applyTransform = () => {
      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`
    }

    const getLoopWidth = () => {
      if (reduceMotionRef.current) return 0
      return track.scrollWidth / 2
    }

    const normalizeOffset = () => {
      const loopWidth = getLoopWidth()
      if (loopWidth <= 0) return
      while (offsetRef.current <= -loopWidth) offsetRef.current += loopWidth
      while (offsetRef.current > 0) offsetRef.current -= loopWidth
    }

    const getStep = () => {
      const firstCard = track.querySelector('.team-carousel__item')
      if (!firstCard) return 280
      const set = track.querySelector('.team-carousel__set')
      const gap = set ? Number.parseFloat(window.getComputedStyle(set).columnGap) || 0 : 0
      return firstCard.getBoundingClientRect().width + gap
    }

    nudgeRef.current = (direction) => {
      if (reduceMotionRef.current) {
        const viewport = root.querySelector('.team-carousel__viewport')
        if (viewport) {
          viewport.scrollBy({ left: -direction * getStep(), behavior: 'smooth' })
        }
        return
      }
      offsetRef.current += direction * getStep()
      normalizeOffset()
      applyTransform()
    }

    const loop = (time) => {
      if (!lastTime) lastTime = time
      const dt = Math.min((time - lastTime) / 1000, 0.048)
      lastTime = time

      const canAnimate =
        inView &&
        !reduceMotionRef.current &&
        !dragRef.current.active &&
        document.visibilityState === 'visible'

      if (canAnimate && Math.abs(momentumRef.current) > MOMENTUM_STOP_SPEED) {
        offsetRef.current += momentumRef.current * dt
        momentumRef.current *= Math.exp(-MOMENTUM_FRICTION * dt)
        speed = lerp(speed, BASE_SPEED, Math.min(1, dt * SPEED_RETURN))
        normalizeOffset()
        applyTransform()
      } else if (canAnimate && !pausedRef.current) {
        momentumRef.current = 0
        speed = lerp(speed, BASE_SPEED, Math.min(1, dt * SPEED_RETURN))
        speed = clamp(speed, MIN_SPEED, MAX_SPEED)
        offsetRef.current -= speed * dt
        normalizeOffset()
        applyTransform()
      } else if (!dragRef.current.active) {
        if (Math.abs(momentumRef.current) <= MOMENTUM_STOP_SPEED) {
          momentumRef.current = 0
        }
        speed = lerp(speed, BASE_SPEED, Math.min(1, dt * SPEED_RETURN))
      }

      if (inView && !reduceMotionRef.current) {
        raf = window.requestAnimationFrame(loop)
      } else {
        raf = 0
        lastTime = 0
      }
    }

    const start = () => {
      if (!raf && !reduceMotionRef.current) {
        lastTime = 0
        raf = window.requestAnimationFrame(loop)
      }
    }

    const stop = () => {
      if (raf) {
        window.cancelAnimationFrame(raf)
        raf = 0
      }
      lastTime = 0
    }

    const onScroll = () => {
      const now = performance.now()
      const y = window.scrollY
      const elapsed = Math.max(now - lastScrollSample, 1)
      const velocity = Math.abs(y - lastScrollY) / (elapsed / 1000)
      lastScrollY = y
      lastScrollSample = now

      if (reduceMotionRef.current || dragRef.current.active) return
      // speed = clamp(BASE + |Δy|/Δt * BOOST, MIN, MAX)
      speed = clamp(BASE_SPEED + velocity * SCROLL_BOOST, MIN_SPEED, MAX_SPEED)
    }

    const onResize = () => {
      normalizeOffset()
      applyTransform()
      speed = BASE_SPEED
      momentumRef.current = 0
    }

    const onVisibility = () => {
      if (document.visibilityState === 'visible' && inView) start()
      else stop()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        if (inView) start()
        else stop()
      },
      { threshold: 0.08 },
    )
    observer.observe(root)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)

    if (!reduceMotionRef.current) start()
    applyTransform()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
      stop()
      nudgeRef.current = () => {}
      momentumRef.current = 0
      track.style.transform = ''
    }
  }, [reduceMotion])

  const pause = () => setPaused(true)
  const resume = () => setPaused(false)

  const onPointerDown = (event) => {
    if (reduceMotion) return
    if (event.button !== undefined && event.button !== 0) return
    const track = trackRef.current
    if (!track) return

    const now = performance.now()
    momentumRef.current = 0
    dragRef.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startOffset: offsetRef.current,
      lastX: event.clientX,
      lastTime: now,
      velocity: 0,
      moved: false,
    }
    pause()
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }

  const onPointerMove = (event) => {
    const drag = dragRef.current
    if (!drag.active || drag.pointerId !== event.pointerId) return
    const track = trackRef.current
    if (!track) return

    const delta = event.clientX - drag.startX
    if (Math.abs(delta) > DRAG_CLICK_THRESHOLD) drag.moved = true

    const now = performance.now()
    const elapsed = Math.max((now - drag.lastTime) / 1000, 0.001)
    const instantVelocity = clamp(
      (event.clientX - drag.lastX) / elapsed,
      -MAX_DRAG_VELOCITY,
      MAX_DRAG_VELOCITY,
    )
    drag.velocity = lerp(
      drag.velocity,
      instantVelocity,
      DRAG_VELOCITY_BLEND,
    )
    drag.lastX = event.clientX
    drag.lastTime = now

    let next = drag.startOffset + delta
    const loopWidth = track.scrollWidth / 2
    if (loopWidth > 0) {
      while (next <= -loopWidth) next += loopWidth
      while (next > 0) next -= loopWidth
    }
    offsetRef.current = next
    track.style.transform = `translate3d(${next}px, 0, 0)`
  }

  const endDrag = (event) => {
    const drag = dragRef.current
    if (!drag.active || (event && drag.pointerId !== event.pointerId)) return

    const cancelled = event?.type === 'pointercancel'
    const releaseDelay = Math.max((performance.now() - drag.lastTime) / 1000, 0)
    const releaseVelocity = drag.velocity * Math.exp(-8 * releaseDelay)
    momentumRef.current = !cancelled && drag.moved ? releaseVelocity : 0
    drag.active = false
    drag.pointerId = null
    if (event?.currentTarget?.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    if (!reduceMotion) resume()
  }

  const onClickCapture = (event) => {
    if (dragRef.current.moved) {
      event.preventDefault()
      event.stopPropagation()
      dragRef.current.moved = false
    }
  }

  return (
    <section
      id="equipe"
      className="section-atmosphere-soft-gray relative overflow-hidden py-14 sm:py-20 lg:py-24"
      aria-label="Nossa equipe"
    >
      <div
        className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-brand-light-pink/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-56 w-56 rounded-full bg-brand-blue/[0.04] blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <SectionTitle
          eyebrow="Nossa equipe"
          title="Profissionais de diferentes áreas trabalhando pelo mesmo cuidado"
          description="A Clínica Voe Alto reúne uma equipe multidisciplinar preparada para acolher, orientar e acompanhar cada paciente de forma individualizada."
          eyebrowVariant="blue"
        />

        <div className="team-banner mb-8 overflow-hidden rounded-3xl border border-line bg-surface shadow-md shadow-brand-dark/10 lg:mb-10 lg:grid lg:grid-cols-2 lg:items-stretch">
          <InteractiveImage
            src="/imagens/equipe/equipe-multidisciplinar-voe-alto.webp"
            alt="Equipe multidisciplinar da Clínica Voe Alto"
            width={1000}
            height={625}
            intensity="soft"
            reveal="wipe-up"
            className="relative aspect-[16/10] h-full min-h-[14rem] lg:aspect-auto lg:min-h-[20rem]"
            objectPosition="object-center"
          >
            <div className="team-banner__edge" aria-hidden="true" />
          </InteractiveImage>
          <div className="team-banner__copy flex flex-col justify-center p-6 sm:p-8 lg:p-9">
            <Badge variant="blue" className="w-fit px-3 py-1 text-xs">
              Equipe multidisciplinar
            </Badge>
            <h3 className="mt-3 text-xl font-semibold leading-snug text-ink sm:text-2xl">
              Cuidado coordenado, com olhar individualizado
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted sm:text-base">
              Diferentes áreas atuam juntas para compreender cada necessidade e indicar
              o acompanhamento mais adequado, com clareza, respeito e segurança.
            </p>
          </div>
        </div>
      </Container>

      <div className="relative z-10">
        <div
          ref={rootRef}
          className={[
            'team-carousel',
            reduceMotion ? 'is-static' : '',
            paused ? 'is-paused' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          tabIndex={0}
          role="region"
          aria-roledescription="carrossel"
          aria-label="Áreas da equipe multidisciplinar"
          onMouseEnter={() => {
            if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
              pause()
            }
          }}
          onMouseLeave={() => {
            if (!reduceMotion && !dragRef.current.active) resume()
          }}
          onFocusCapture={pause}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget) && !reduceMotion) {
              resume()
            }
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') {
              event.preventDefault()
              nudgeRef.current(1)
            }
            if (event.key === 'ArrowRight') {
              event.preventDefault()
              nudgeRef.current(-1)
            }
          }}
        >
          <div className="team-carousel__controls">
            <button
              type="button"
              className="team-carousel__control"
              aria-label="Ver áreas anteriores da equipe"
              onClick={() => nudgeRef.current(1)}
            >
              <ChevronIcon direction="prev" />
            </button>
            <button
              type="button"
              className="team-carousel__control"
              aria-label="Ver próximas áreas da equipe"
              onClick={() => nudgeRef.current(-1)}
            >
              <ChevronIcon direction="next" />
            </button>
          </div>

          <div
            className="team-carousel__viewport"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onClickCapture={onClickCapture}
          >
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[var(--surface-muted)] to-transparent sm:w-14 xl:w-20"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[var(--surface-muted)] to-transparent sm:w-14 xl:w-20"
              aria-hidden="true"
            />

            <div ref={trackRef} className="team-carousel__track">
              <TeamSet />
              {!reduceMotion ? <TeamSet decorative /> : null}
            </div>
          </div>

          <p className="team-carousel__hint">
            {reduceMotion
              ? 'Use as setas ou deslize para explorar as áreas da equipe.'
              : 'O carrossel se move suavemente. Arraste, use as setas ou toque para navegar.'}
          </p>
        </div>
      </div>

      <Container className="relative z-10">
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-ink-muted sm:mt-10 sm:text-base">
          Nomes e registros dos profissionais serão publicados assim que a clínica
          validar oficialmente cada informação.
        </p>

        <div className="mt-7 flex justify-center sm:mt-8">
          <Button
            href={whatsappUrl(teamMessage)}
            variant="primary"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Agendar pelo WhatsApp com a equipe da Clínica Voe Alto"
          >
            Agendar pelo WhatsApp
          </Button>
        </div>
      </Container>
    </section>
  )
}
