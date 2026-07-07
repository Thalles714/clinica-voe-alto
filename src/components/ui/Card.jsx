export default function Card({ children, className = '', hover = false }) {
  return (
    <div
      className={[
        'rounded-2xl border border-slate-100 bg-white p-6 shadow-sm',
        hover && 'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/50',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}
