import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { SettingsProvider } from './context/SettingsContext'
import StartPage from './components/StartPage'
import GamePage from './components/GamePage'

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    background: {
      default: '#f5f5f5',
    },
  },
})

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <SettingsProvider>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/game" element={<GamePage />} />
          </Routes>
        </SettingsProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App