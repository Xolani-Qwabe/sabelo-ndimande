'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { darkTheme, lightTheme } from './theme'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('dark')

  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') || 'dark'
    setMode(savedMode)
  }, [])

  const theme = mode === 'dark' ? darkTheme : lightTheme

  const toggleMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark'
    setMode(newMode)
    localStorage.setItem('themeMode', newMode)
  }

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => useContext(ThemeContext)
