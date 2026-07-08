export default function Card({ children, className = '', hover = false }) {
  return (
    <div
      className={[
        'rounded-3xl border border-brand-light-gray bg-brand-white p-6 shadow-sm shadow-brand-dark/5',
        hover &&
          'transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-light-pink/60 hover:shadow-md hover:shadow-brand-dark/5',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}
