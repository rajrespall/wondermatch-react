import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const GameComplete = ({ score, difficulty }) => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        padding: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 4,
        boxShadow: 3,
        animation: 'fadeIn 0.5s ease-in',
        '@keyframes fadeIn': {
          '0%': {
            opacity: 0,
            transform: 'scale(0.9)',
          },
          '100%': {
            opacity: 1,
            transform: 'scale(1)',
          },
        },
      }}
    >
      <Typography 
        variant="h2" 
        color="primary"
        sx={{ 
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)'
        }}
      >
        Game Over!
      </Typography>

      <Box sx={{ textAlign: 'center', my: 2 }}>
        <Typography variant="h3" gutterBottom>
          Your Score
        </Typography>
        <Typography 
          variant="h1" 
          color="primary"
          sx={{ 
            fontWeight: 'bold',
            animation: 'scoreReveal 1s ease-out',
            '@keyframes scoreReveal': {
              '0%': { transform: 'scale(0)' },
              '70%': { transform: 'scale(1.1)' },
              '100%': { transform: 'scale(1)' },
            }
          }}
        >
          {score}/10
        </Typography>
        <Typography variant="h5" sx={{ mt: 2, textTransform: 'capitalize' }}>
          {difficulty} Mode
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
        <Button 
          variant="contained"
          size="large"
          onClick={() => window.location.reload()}
          sx={{ 
            fontSize: '1.2rem', 
            padding: '12px 32px',
            borderRadius: '50px',
            backgroundColor: '#4caf50',
            '&:hover': {
              backgroundColor: '#45a049'
            }
          }}
        >
          Play Again
        </Button>
        <Button 
          variant="outlined"
          size="large"
          onClick={() => navigate('/')}
          sx={{ 
            fontSize: '1.2rem', 
            padding: '12px 32px',
            borderRadius: '50px',
          }}
        >
          Main Menu
        </Button>
      </Box>
    </Box>
  )
}

export default GameComplete