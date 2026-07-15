import { useEffect, useRef } from 'react'
import Container from '../ui/Container'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import InteractiveImage from '../ui/InteractiveImage'
import { whatsappUrl } from '../../data/clinic'

const heroWhatsappMessage =
  'Olá, gostaria de falar com a equipe da Clínica Voe Alto para entender qual atendimento procurar.'

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
      {/* Dedicated clip keeps the photo radius stable during parallax. */}
      <div className="hero-visual__clip">
        <InteractiveImage
          src="/imagens/hero/hero-clinica-voe-alto-hq.webp"
          alt="Ambiente acolhedor da Clínica Voe Alto em Aparecida de Goiânia"
          width={1672}
          height={941}
          priority
          intensity="hero"
          reveal="mask"
          glow
          className="hero-visual__frame relative aspect-[16/10] lg:aspect-[4/3] xl:aspect-[16/11]"
          objectPosition="object-center"
        >
          <div
            className="hero-visual__shade pointer-events-none absolute inset-0"
            aria-hidden="true"
          />
          <div
            className="hero-visual__grade pointer-events-none absolute inset-0"
            aria-hidden="true"
          />
          <div
            className="hero-visual__tech-grid pointer-events-none absolute inset-0"
            aria-hidden="true"
          />
          <div
            className="hero-visual__sheen pointer-events-none absolute inset-0"
            aria-hidden="true"
          />
        </InteractiveImage>
      </div>

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

      <Container className="hero-shell relative z-10">
        <div className="hero-layout grid w-full items-center gap-10 lg:grid-cols-2">
          <div className="hero-copy max-w-xl">
            <div className="hero-enter hero-enter--1">
              <Badge variant="blue">Clínica multidisciplinar</Badge>
            </div>

            <h1 className="hero-title hero-enter hero-enter--2 text-balance text-[1.5rem] font-bold leading-[1.12] tracking-tight text-ink min-[360px]:text-[1.8rem] sm:text-[2.65rem] lg:text-[2.45rem] xl:text-[3.05rem]">
              Atendimento multidisciplinar para crianças, adolescentes, adultos e
              famílias
            </h1>

            <p className="hero-description hero-enter hero-enter--3 max-w-lg text-pretty text-base leading-relaxed text-ink-muted sm:text-lg">
              Psicologia, Psicopedagogia, Fonoaudiologia, Terapia ABA, Neurologia e
              outras especialidades reunidas para ouvir cada necessidade e orientar o
              próximo passo.
            </p>

            <div className="hero-actions hero-enter hero-enter--4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button
                href={whatsappUrl(heroWhatsappMessage)}
                variant="primary"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Falar com a equipe da Clínica Voe Alto pelo WhatsApp"
              >
                Falar com a equipe
              </Button>
              <Button
                href="#especialidades"
                variant="secondary"
                size="lg"
                aria-label="Conhecer as especialidades da Clínica Voe Alto"
              >
                Conhecer especialidades
              </Button>
            </div>
          </div>

          <HeroVisual />
        </div>
      </Container>
    </section>
  )
}
