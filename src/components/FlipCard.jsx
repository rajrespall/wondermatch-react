import { Box } from '@mui/material'

const FlipCard = ({ 
  image, 
  isFlipped, 
  onClick, 
  border,
  width = '200px',
  height = '300px' 
}) => {
  return (
    <Box
      sx={{
        width,
        height,
        perspective: '1000px',
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'translateY(-10px) scale(1.05)',
          '& .card-shadow': {
            opacity: 0.5,
            transform: 'translateY(10px) scale(0.95)'
          }
        }
      }}
      onClick={onClick}
    >
      {/* Card shadow */}
      <Box
        className="card-shadow"
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '8px',
          filter: 'blur(10px)',
          transition: 'all 0.3s ease',
          opacity: 0,
          zIndex: -1
        }}
      />

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
        }}
      >
        {/* Front of card */}
        <Box
          component="img"
          src={image}
          alt="animal"
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            objectFit: 'contain',
            border,
            borderRadius: '8px',
            backgroundColor: 'white',
            padding: 2,
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          }}
        />
        
        {/* Back of card */}
        <Box
          component="img"
          src="/assets/game_images/backcard.png"
          alt="card back"
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: '8px',
            objectFit: 'contain',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          }}
        />
      </Box>
    </Box>
  )
}

export default FlipCard