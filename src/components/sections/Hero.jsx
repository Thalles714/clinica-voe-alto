import { useEffect, useRef } from 'react'
import Container from '../ui/Container'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import InteractiveImage from '../ui/InteractiveImage'
import { clinic, whatsappUrl, locationUrl } from '../../data/clinic'

const benefits = [
  'Atendimento infantil, adolescente e adulto',
  'Equipe multidisciplinar',
  `${clinic.yearsOfExperience} anos de atuação`,
  'Orientação pelo WhatsApp',
]

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="mt-0.5 h-5 w-5 shrink-0 text-brand-pink"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function HeroVisual() {
  const wrapRef = useRef(null)

  useEffect(() => {
    const node = wrapRef.current
    if (!node) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    let raf = 0
    const update = () => {
      raf = 0
      const rect = node.getBoundingClientRect()
      const view = window.innerHeight || 1
      const center = rect.top + rect.height * 0.5
      const progress = Math.max(-1, Math.min(1, (center - view * 0.45) / view))
      node.style.setProperty('--hero-parallax', progress.toFixed(4))
    }

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      className="hero-visual hero-enter hero-enter--visual relative mx-auto w-full max-w-lg lg:max-w-none"
    >
      <div className="hero-visual__grid" aria-hidden="true" />
      <div className="hero-visual__plate" aria-hidden="true" />
      <div className="hero-visual__ring" aria-hidden="true" />

      <div
        className="pointer-events-none absolute -right-10 top-6 h-44 w-44 rounded-full bg-brand-light-pink/35 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-8 bottom-4 h-36 w-36 rounded-full bg-brand-blue/15 blur-3xl"
        aria-hidden="true"
      />

      <InteractiveImage
        src="/imagens/hero/hero-clinica-voe-alto.webp"
        alt="Ambiente acolhedor da Clínica Voe Alto em Goiânia"
        width={800}
        height={1000}
        priority
        intensity="hero"
        reveal="mask"
        glow
        className="hero-visual__frame relative z-10 aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]"
        objectPosition="object-[center_20%]"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-blue/45 via-brand-dark/10 to-transparent"
          aria-hidden="true"
        />
      </InteractiveImage>

      <span className="hero-visual__accent hero-enter hero-enter--accent" aria-hidden="true" />
    </div>
  )
}

export default function Hero() {
  return (
    <section
      id="inicio"
      className="section-atmosphere-hero relative overflow-hidden"
    >
      <div
        className="pointer-events-none absolute -right-16 top-24 h-72 w-72 rounded-full bg-brand-blue/[0.06] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-brand-light-pink/30 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="max-w-xl">
            <div className="hero-enter hero-enter--1">
              <Badge variant="blue">Clínica Voe Alto · Goiânia</Badge>
            </div>

            <h1 className="hero-enter hero-enter--2 mt-4 text-[1.85rem] font-bold leading-[1.15] tracking-tight text-ink sm:mt-6 sm:text-5xl lg:text-[3.05rem]">
              Orientação clara para cada fase da vida
            </h1>

            <p className="hero-enter hero-enter--3 mt-4 max-w-lg text-base leading-relaxed text-ink-muted sm:mt-6 sm:text-lg">
              Atendimento multidisciplinar para crianças, adolescentes, adultos e
              famílias no Setor Sul. Fale pelo WhatsApp: a equipe ouve sua necessidade
              e indica o caminho mais adequado.
            </p>

            <div className="hero-enter hero-enter--4 mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
              <Button
                href={whatsappUrl()}
                variant="primary"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Agendar pelo WhatsApp"
              >
                Agendar pelo WhatsApp
              </Button>
              <Button
                href={locationUrl()}
                variant="secondary"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ver localização da clínica no Google Maps"
              >
                Ver localização
              </Button>
            </div>

            <ul
              className="hero-enter hero-enter--5 mt-6 space-y-2.5 sm:mt-8 sm:space-y-3"
              aria-label="Diferenciais da clínica"
            >
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-sm leading-relaxed text-ink-muted sm:text-base">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <HeroVisual />
        </div>
      </Container>
    </section>
  )
}
