import Badge from './Badge'
import Reveal from './Reveal'

export default function SectionTitle({
  eyebrow,
  badge,
  title,
  description,
  subtitle,
  align = 'center',
  eyebrowVariant = 'pink',
  className = '',
}) {
  const label = eyebrow ?? badge
  const desc = description ?? subtitle
  const isCentered = align === 'center'
  const alignClass = isCentered ? 'mx-auto text-center' : 'text-left'

  return (
    <Reveal className={`mb-10 max-w-3xl sm:mb-12 lg:mb-16 ${alignClass} ${className}`}>
      {label && (
        <div className={isCentered ? 'flex justify-center' : ''}>
          <Badge variant={eyebrowVariant}>{label}</Badge>
        </div>
      )}
      <h2 className="mt-4 text-[1.7rem] font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
        {title}
      </h2>
      {desc && (
        <p
          className={`mt-3 max-w-2xl text-base leading-relaxed text-ink-muted sm:mt-4 sm:text-lg ${isCentered ? 'mx-auto' : ''}`}
        >
          {desc}
        </p>
      )}
    </Reveal>
  )
}
