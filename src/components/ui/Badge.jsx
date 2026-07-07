export default function Badge({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-700 ring-1 ring-primary-100 ${className}`}
    >
      {children}
    </span>
  )
}
