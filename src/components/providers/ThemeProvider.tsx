'use client'

import { createContext, useContext, useEffect, useSyncExternalStore } from 'react'

import { THEME_CHANGE_EVENT, THEME_STORAGE_KEY } from '@/lib/theme'

interface ThemeContextValue {
  isDark: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function getIsDarkTheme() {
  try {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)

    return savedTheme
      ? savedTheme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches
  } catch {
    return false
  }
}

function subscribeToTheme(callback: () => void) {
  const colorScheme = window.matchMedia('(prefers-color-scheme: dark)')

  window.addEventListener('storage', callback)
  window.addEventListener(THEME_CHANGE_EVENT, callback)
  colorScheme.addEventListener('change', callback)

  return () => {
    window.removeEventListener('storage', callback)
    window.removeEventListener(THEME_CHANGE_EVENT, callback)
    colorScheme.removeEventListener('change', callback)
  }
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const isDark = useSyncExternalStore(subscribeToTheme, getIsDarkTheme, () => false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  function toggleTheme() {
    const nextThemeIsDark = !isDark

    document.documentElement.classList.toggle('dark', nextThemeIsDark)
    window.localStorage.setItem(THEME_STORAGE_KEY, nextThemeIsDark ? 'dark' : 'light')
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT))
  }

  return (
    <ThemeContext value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used inside <ThemeProvider>')
  }

  return context
}
