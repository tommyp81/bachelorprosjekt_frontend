import { createContext } from "react"

export const themes = {
  dark: {
    background: 'bg-dark',
    text: 'text-light'
  },
  light: {
    background: 'bg-light',
    text: 'text-dark'
  }
}

export const ThemeContext = createContext(themes.dark)