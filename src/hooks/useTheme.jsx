import { createContext, useContext, useEffect, useMemo, useState, useSyncExternalStore } from 'react'
import {
  applyTheme,
  getStoredTheme,
  getSystemTheme,
  persistTheme,
  resolveTheme,
} from '../utils/theme'

const ThemeContext = createContext(null)

function subscribeSystem(callback) {
  const media = window.matchMedia('(prefers-color-scheme: dark)')
  media.addEventListener('change', callback)
  return () => media.removeEventListener('change', callback)
}

function getServerSnapshot() {
  return 'light'
}

export function ThemeProvider({ children }) {
  const systemTheme = useSyncExternalStore(
    subscribeSystem,
    getSystemTheme,
    getServerSnapshot,
  )

  const [preference, setPreference] = useState(() => getStoredTheme())

  const theme = preference ?? systemTheme ?? resolveTheme()

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const value = useMemo(() => {
    const setTheme = (next) => {
      const resolved = applyTheme(next)
      persistTheme(resolved)
      setPreference(resolved)
    }

    return {
      theme,
      isDark: theme === 'dark',
      setTheme,
      toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    }
  }, [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// Hook co-located with provider for a single theme module API.
export default function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return ctx
}
