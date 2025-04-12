// app/ThemeRegistry.jsx
'use client'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from './ThemeContext'

export default function ThemeRegistry({ children }) {
  return (
    <AppRouterCacheProvider options={{ key: 'css' }}>
      <ThemeProvider>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}
