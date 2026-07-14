import useTheme from '../../hooks/useTheme'

export default function ThemeToggle({ className = '' }) {
  const { toggleTheme, isDark } = useTheme()

  return (
    <button
      type="button"
      className={['theme-toggle', isDark ? 'is-dark' : 'is-light', className]
        .filter(Boolean)
        .join(' ')}
      onClick={toggleTheme}
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      aria-pressed={isDark}
      title={isDark ? 'Modo claro' : 'Modo escuro'}
    >
      <span className="theme-toggle__track" aria-hidden="true">
        <span className="theme-toggle__thumb" />
      </span>
    </button>
  )
}
