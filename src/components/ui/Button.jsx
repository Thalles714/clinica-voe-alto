const variants = {
  primary:
    'bg-brand-pink text-brand-dark hover:bg-brand-pink/90 focus:ring-brand-pink/40 shadow-sm shadow-brand-pink/20',
  secondary:
    'bg-transparent text-brand-blue border border-brand-blue hover:bg-brand-blue/5 focus:ring-brand-blue/30',
  ghost:
    'bg-transparent text-brand-dark hover:bg-brand-light-gray focus:ring-brand-blue/20',
  outline:
    'bg-transparent text-brand-dark border border-brand-light-gray hover:bg-brand-light-gray focus:ring-brand-blue/20',
  whatsapp:
    'bg-brand-pink text-brand-dark hover:bg-brand-pink/90 focus:ring-brand-pink/40 shadow-sm shadow-brand-pink/20',
}

const sizes = {
  sm: 'px-4 py-2 text-sm gap-2',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-3',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  ...props
}) {
  const classes = [
    'inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white',
    variants[variant],
    sizes[size],
    className,
  ].join(' ')

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
