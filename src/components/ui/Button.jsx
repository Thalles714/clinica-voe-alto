const variants = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-lg shadow-primary-600/20',
  secondary:
    'bg-white text-primary-700 border border-primary-200 hover:bg-primary-50 focus:ring-primary-500',
  outline:
    'bg-transparent text-slate-700 border border-slate-200 hover:bg-slate-50 focus:ring-slate-400',
  whatsapp:
    'bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-500 shadow-lg shadow-emerald-500/20',
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
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
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
