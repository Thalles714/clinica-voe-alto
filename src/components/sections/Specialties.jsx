import { useEffect, useRef, useState } from 'react'
import Container from '../ui/Container'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import SectionTitle from '../ui/SectionTitle'
import { specialties, specialtyWhatsappMessage } from '../../data/specialties'
import { whatsappUrl } from '../../data/clinic'

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function SpecialtyCard({ specialty, decorative = false }) {
  return (
    <Card
      hover={!decorative}
      className="flex h-full w-[16.5rem] shrink-0 flex-col p-4 sm:w-[20rem] sm:p-5 lg:w-[21.25rem] lg:p-6"
    >
      <Badge variant="blue" className="w-fit px-3 py-1 text-xs">
        {specialty.category}
      </Badge>

      <h3 className="mt-3 text-base font-semibold leading-snug text-brand-dark sm:text-lg">
        {specialty.title}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-dark/70">
        {specialty.description}
      </p>

      {decorative ? (
        <span
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue"
          aria-hidden="true"
        >
          Falar sobre este atendimento
          <ArrowIcon />
        </span>
      ) : (
        <a
          href={whatsappUrl(specialtyWhatsappMessage(specialty.title))}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition-colors duration-200 hover:text-brand-pink focus:outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-brand-blue/30 focus-visible:ring-offset-2"
          aria-label={`Falar sobre ${specialty.title} pelo WhatsApp`}
        >
          Falar sobre este atendimento
          <ArrowIcon />
        </a>
      )}
    </Card>
  )
}

function SpecialtySet({ decorative = false }) {
  return (
    <div
      className="specialties-marquee-set"
      role={decorative ? undefined : 'list'}
      aria-label={decorative ? undefined : 'Lista de especialidades'}
      aria-hidden={decorative ? true : undefined}
    >
      {specialties.map((specialty) => (
        <div
          key={`${decorative ? 'dup-' : ''}${specialty.title}`}
          className="shrink-0"
          role={decorative ? undefined : 'listitem'}
        >
          <SpecialtyCard specialty={specialty} decorative={decorative} />
        </div>
      ))}
    </div>
  )
}

export default function Specialties() {
  const trackRef = useRef(null)
  const pausedRef = useRef(false)
  const [paused, setPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMotion = () => setReduceMotion(media.matches)
    syncMotion()
    media.addEventListener('change', syncMotion)
    return () => media.removeEventListener('change', syncMotion)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track || reduceMotion) return undefined

    let frameId = 0
    let offset = 0
    let lastTime = 0
    const speed = window.matchMedia('(max-width: 767px)').matches ? 38 : 46

    const tick = (time) => {
      if (!lastTime) lastTime = time
      const delta = Math.min(time - lastTime, 32)
      lastTime = time

      if (!pausedRef.current) {
        offset -= (speed * delta) / 1000
        const loopWidth = track.scrollWidth / 2
        if (loopWidth > 0 && Math.abs(offset) >= loopWidth) {
          offset += loopWidth
        }
        track.style.transform = `translate3d(${offset}px, 0, 0)`
      }

      frameId = window.requestAnimationFrame(tick)
    }

    frameId = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(frameId)
      track.style.transform = ''
    }
  }, [reduceMotion])

  const pause = () => setPaused(true)
  const resume = () => setPaused(false)

  return (
    <section
      id="especialidades"
      className="section-atmosphere-specialties relative overflow-hidden py-14 sm:py-20 lg:py-24"
      aria-label="Especialidades da clínica"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-56 w-[36rem] -translate-x-1/2 rounded-full bg-brand-light-pink/20 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <SectionTitle
          eyebrow="Especialidades"
          title="Cuidado multidisciplinar para desenvolvimento, autonomia e bem-estar"
          description="Da aprendizagem ao comportamento, da comunicação ao suporte familiar, reunimos especialidades que ajudam a compreender necessidades e orientar o cuidado mais adequado. Você não precisa saber exatamente qual atendimento procurar antes de entrar em contato."
          eyebrowVariant="blue"
        />
      </Container>

      <div className="relative z-10 mt-2">
        <div
          className={[
            'specialties-marquee',
            reduceMotion ? 'is-static' : '',
            paused ? 'is-paused' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          onPointerDown={pause}
          onPointerUp={resume}
          onPointerCancel={resume}
          onPointerLeave={resume}
          onMouseEnter={() => {
            if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
              pause()
            }
          }}
          onMouseLeave={resume}
          onFocusCapture={pause}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              resume()
            }
          }}
        >
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#faf7f8] to-transparent sm:w-14 xl:w-20"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#faf7f8] to-transparent sm:w-14 xl:w-20"
            aria-hidden="true"
          />

          <div ref={trackRef} className="specialties-marquee-track">
            <SpecialtySet />
            <SpecialtySet decorative />
          </div>
        </div>

        <p className="mt-3 px-4 text-center text-xs leading-snug text-brand-dark/50 sm:mt-4 sm:text-sm">
          {reduceMotion
            ? 'Deslize para ver mais especialidades.'
            : 'Desliza automaticamente. Toque para pausar.'}
        </p>
      </div>
    </section>
  )
}
