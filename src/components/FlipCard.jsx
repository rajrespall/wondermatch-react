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
        cursor: 'pointer'
      }}
      onClick={onClick}
    >
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
          }}
        />
        
        {/* Back of card */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            backgroundColor: '#2196f3',
            borderRadius: '8px',
          }}
        />
      </Box>
    </Box>
  )
}

export default FlipCard