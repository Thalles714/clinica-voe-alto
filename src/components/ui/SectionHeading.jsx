import Badge from './Badge'

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = 'center',
  className = '',
}) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`max-w-2xl mb-12 lg:mb-16 ${alignClass} ${className}`}>
      {badge && (
        <div className={align === 'center' ? 'flex justify-center' : ''}>
          <Badge>{badge}</Badge>
        </div>
      )}
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg leading-relaxed text-slate-600">{subtitle}</p>
      )}
    </div>
  )
}
