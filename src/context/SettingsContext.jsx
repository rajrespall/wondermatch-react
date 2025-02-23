import { createContext, useContext, useState } from 'react'

const SettingsContext = createContext()

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    soundEffects: true,
    backgroundMusic: true,
  })

  const toggleSoundEffects = () => {
    setSettings(prev => ({
      ...prev,
      soundEffects: !prev.soundEffects
    }))
  }

  const toggleBackgroundMusic = () => {
    setSettings(prev => ({
      ...prev,
      backgroundMusic: !prev.backgroundMusic
    }))
  }

  return (
    <SettingsContext.Provider value={{
      settings,
      toggleSoundEffects,
      toggleBackgroundMusic
    }}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => useContext(SettingsContext)