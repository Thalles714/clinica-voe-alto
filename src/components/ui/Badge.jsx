const variants = {
  pink: 'bg-brand-light-pink/60 text-brand-blue ring-1 ring-brand-pink/30',
  blue: 'bg-brand-blue/10 text-brand-blue ring-1 ring-brand-blue/20',
}

export default function Badge({ children, variant = 'pink', className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold tracking-wide ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
