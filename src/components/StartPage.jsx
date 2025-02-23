import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Container, Typography, IconButton, ButtonGroup } from '@mui/material'
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

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
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
            gap: 4
          }}
        >
          <Box
            component="img"
            src='/assets/game_images/wondermatch.png'
            alt="Wonder Match"
            sx={{
              width: '100%',
              maxWidth: '700px',
              height: 'auto',
              marginBottom: 2
            }}
          />
          
          <ButtonGroup variant="contained" size="large">
            {['easy', 'medium', 'hard'].map((level) => (
              <Button
                key={level}
                onClick={() => setDifficulty(level)}
                sx={{ 
                  px: 4,
                  backgroundColor: difficulty === level ? '#4caf50' : 'primary.main',
                  '&:hover': {
                    backgroundColor: difficulty === level ? '#45a049' : 'primary.dark'
                  }
                }}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Button>
            ))}
          </ButtonGroup>

          <Button
            variant="contained"
            size="large"
            onClick={handleStartGame}
            sx={{ 
              fontSize: '1.2rem', 
              padding: '12px 32px',
              borderRadius: '50px' 
            }}
          >
            Start Game
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default StartPage