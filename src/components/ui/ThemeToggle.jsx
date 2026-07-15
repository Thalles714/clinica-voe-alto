import useTheme from '../../hooks/useTheme'

function SunIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M10 2.1v1.4M10 16.5v1.4M2.1 10h1.4M16.5 10h1.4M4.4 4.4l1 1M14.6 14.6l1 1M15.6 4.4l-1 1M5.4 14.6l-1 1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M15.8 12.3A6.1 6.1 0 0 1 7.7 4.2 6.25 6.25 0 1 0 15.8 12.3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ThemeToggle({ className = '' }) {
  const { toggleTheme, isDark } = useTheme()
  const nextThemeLabel = isDark ? 'Ativar modo claro' : 'Ativar modo escuro'

  return (
    <button
      type="button"
      className={['theme-toggle', isDark ? 'is-dark' : 'is-light', className]
        .filter(Boolean)
        .join(' ')}
      onClick={toggleTheme}
      aria-label={nextThemeLabel}
      aria-pressed={isDark}
      title={nextThemeLabel}
    >
      <span className="theme-toggle__track" aria-hidden="true">
        <span className="theme-toggle__icon theme-toggle__icon--sun">
          <SunIcon />
        </span>
        <span className="theme-toggle__icon theme-toggle__icon--moon">
          <MoonIcon />
        </span>
        <span className="theme-toggle__thumb" />
      </span>
    </button>
  )
}
