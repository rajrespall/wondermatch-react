import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const GameComplete = ({ score }) => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        padding: 6,
        borderRadius: 4,
        animation: 'fadeIn 0.5s ease-in',
        backgroundImage: 'url(/assets/game_images/gameover.png)',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minWidth: '800px',
        minHeight: '600px',
        position: 'relative',
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
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          mt: 15,
        }}
      >
        <Typography 
          variant="h1" 
          sx={{ 
            fontWeight: 'bold',
            animation: 'scoreReveal 1s ease-out',
            fontSize: '3rem',
            color: '#380f00',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
            '@keyframes scoreReveal': {
              '0%': { transform: 'scale(0)' },
              '70%': { transform: 'scale(1.1)' },
              '100%': { transform: 'scale(1)' },
            }
          }}
        >
          {score}/10
        </Typography>

        <Box 
          sx={{ 
            display: 'flex', 
            gap: 1, 
            mt: 2, 
            mb: 6,
            justifyContent: 'center' 
          }}
        >
          <Box
            component="img"
            src="/assets/game_images/playagain.png"
            alt="Play Again"
            onClick={() => window.location.reload()}
            sx={{
              width: '120px',
              height: 'auto',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          />
          <Box
            component="img"
            src="/assets/game_images/menu.png"
            alt="Main Menu"
            onClick={() => navigate('/')}
            sx={{
              width: '120px',
              height: 'auto',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default GameComplete