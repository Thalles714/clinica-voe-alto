export default function ImagePlaceholder({
  label = 'Imagem',
  aspectRatio = 'aspect-video',
  className = '',
  icon: Icon,
}) {
  return (
    <div
      className={[
        'relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-100 via-primary-50 to-slate-100',
        aspectRatio,
        className,
      ].join(' ')}
      role="img"
      aria-label={label}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.8),transparent_50%)]" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
        {Icon && (
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/80 text-primary-600 shadow-sm">
            <Icon className="h-7 w-7" strokeWidth={1.5} />
          </div>
        )}
        <span className="text-sm font-medium text-primary-700/70">{label}</span>
      </div>
    </div>
  )
}
