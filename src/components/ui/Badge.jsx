const variants = {
  pink: 'bg-brand-light-pink/70 text-brand-blue ring-1 ring-brand-light-pink',
  blue: 'bg-brand-blue/10 text-brand-blue ring-1 ring-brand-blue/15',
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
