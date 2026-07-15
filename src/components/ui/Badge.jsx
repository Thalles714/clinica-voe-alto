const variants = {
  pink: 'badge--pink',
  blue: 'badge--blue',
}

export default function Badge({ children, variant = 'pink', className = '' }) {
  return (
    <span
      className={`badge inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold tracking-wide ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
