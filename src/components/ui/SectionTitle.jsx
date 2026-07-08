import Badge from './Badge'

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
    <div className={`mb-12 max-w-3xl lg:mb-16 ${alignClass} ${className}`}>
      {label && (
        <div className={isCentered ? 'flex justify-center' : ''}>
          <Badge variant={eyebrowVariant}>{label}</Badge>
        </div>
      )}
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
        {title}
      </h2>
      {desc && (
        <p
          className={`mt-4 max-w-2xl text-lg leading-relaxed text-brand-dark/70 ${isCentered ? 'mx-auto' : ''}`}
        >
          {desc}
        </p>
      )}
    </div>
  )
}
