import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Container, IconButton } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import Settings from './Settings'

const StartPage = () => {
  const navigate = useNavigate()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [difficulty, setDifficulty] = useState('easy')

  const handleOpenSettings = () => setSettingsOpen(true)
  const handleCloseSettings = () => setSettingsOpen(false)

  const handleStartGame = () => {
    navigate('/game', { state: { difficulty } })
  }

  const getDifficultyImage = (level) => {
    if (difficulty === level) {
      return `/assets/game_images/${level}green.png`
    }
    return `/assets/game_images/${level}blue.png`
  }

  return (
    <Box sx={{ 
      position: 'relative', 
      minHeight: '100vh',
      backgroundImage: 'url(/assets/game_images/wondermatchbg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat' 
    }}>
      <IconButton
        aria-label="settings"
        onClick={handleOpenSettings}
        sx={{
          position: 'fixed',
          top: 16,
          right: 16,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.9)'
          },
          zIndex: 1000
        }}
      >
        <SettingsIcon />
      </IconButton>

      <Settings 
        open={settingsOpen} 
        onClose={handleCloseSettings}
      />

      <Container maxWidth="sm">
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Box
            component="img"
            src='/assets/game_images/wondermatch.png'
            alt="Wonder Match"
            sx={{
              width: '200%',
              maxWidth: '1200px',
              height: 'auto',
              marginBottom: 0,
              marginTop: -15
            }}
          />
          
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            justifyContent: 'center',
            mb: 2,
            mt: -15
          }}>
            {['easy', 'medium', 'hard'].map((level) => (
              <Box
                key={level}
                component="img"
                src={getDifficultyImage(level)}
                alt={`${level} difficulty`}
                onClick={() => setDifficulty(level)}
                sx={{
                  width: '200px',
                  height: 'auto',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
              />
            ))}
          </Box>

          <Box
            component="img"
            src="/assets/game_images/startgame.png"
            alt="Start Game"
            onClick={handleStartGame}
            sx={{
              width: '200px',
              height: 'auto',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          />
          
        </Box>
      </Container>
    </Box>
  )
}

export default StartPage