export default function Card({ children, className = '', hover = false, tone = 'default' }) {
  const tones = {
    default: 'bg-surface',
    muted: 'bg-surface-muted',
    elevated: 'bg-surface-elevated',
  }

  return (
    <div
      className={[
        'group rounded-3xl border border-line text-ink p-6 shadow-sm shadow-brand-dark/5',
        tones[tone] ?? tones.default,
        hover && 'card-hover',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}
