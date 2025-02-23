import { useState, useEffect, useCallback } from 'react'
import { Box, Container, Grid, Typography, IconButton, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { animals } from '../constants/animals'
import { useSettings } from '../context/SettingsContext'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import FlipCard from './FlipCard'
import GameComplete from './GameComplete'

const GamePage = () => {
  const [selectedAnimals, setSelectedAnimals] = useState([])
  const [correctAnimal, setCorrectAnimal] = useState(null)
  const [audio, setAudio] = useState(null)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)
  const { settings } = useSettings()
  const [isFlipping, setIsFlipping] = useState(false)
  const [round, setRound] = useState(1)
  const navigate = useNavigate()

  const successSound = '/assets/sound_effects/correct_ans.mp3'
  const failureSound = '/assets/sound_effects/wrong_ans.mp3'

  const playFeedbackSound = (isCorrect) => {
    if (settings.soundEffects) {
      const feedbackAudio = new Audio(isCorrect ? successSound : failureSound)
      feedbackAudio.play().catch(console.error)
    }
  }

  const playSound = useCallback(() => {
    if (correctAnimal && settings.soundEffects && audio) {
      audio.currentTime = 0
      audio.play().catch(error => {
        console.log('Audio playback failed:', error)
      })
    }
  }, [correctAnimal, settings.soundEffects, audio])

  const loadNewAnimals = useCallback(() => {
    if (round >= 10) return

    setIsFlipping(true)
    
    setTimeout(() => {
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }

      const shuffled = [...animals].sort(() => 0.5 - Math.random())
      const selected = shuffled.slice(0, 3)
      setSelectedAnimals(selected)
      
      const randomIndex = Math.floor(Math.random() * 3)
      const selectedAnimal = selected[randomIndex]
      setCorrectAnimal(selectedAnimal)
    
      const newAudio = new Audio(selectedAnimal.audio)
      setAudio(newAudio)

      setSelectedAnswer(null)
      setIsCorrect(null)
      
      // Remove audio play from here
      setTimeout(() => {
        setIsFlipping(false)
      }, 600)
    }, 600)
  }, [audio, round])

  useEffect(() => {
    if (correctAnimal && settings.soundEffects && !isFlipping) {
      const timeoutId = setTimeout(() => {
        audio?.play().catch(console.error)
      }, 1200) // Wait for flip animation to complete

      return () => clearTimeout(timeoutId)
    }
  }, [correctAnimal, settings.soundEffects, isFlipping, audio])
  
  useEffect(() => {
    loadNewAnimals()
    return () => {
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }
    }
  }, [])

  const handleAnimalClick = async (animal) => {
    if (selectedAnswer) return

    setSelectedAnswer(animal.name)
    const correct = animal.name === correctAnimal.name
    setIsCorrect(correct)

    playFeedbackSound(correct)

    if (correct) {
      setScore(prevScore => prevScore + 1)
    }

    if (round === 10) {
      setTimeout(() => {
        setRound(11)
      }, 1500)
      return
    }

    setTimeout(() => {
      setRound(prevRound => prevRound + 1)
      loadNewAnimals()
    }, 1500)
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
      }}>
        {round <= 10 ? (
          <>
            <Box sx={{ 
              position: 'absolute',
              top: 16,
              right: 16,
              padding: 2,
              borderRadius: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.9)'
            }}>
              <Typography variant="h5">
                Score: {score}
              </Typography>
              <Typography variant="subtitle1">
                Round: {round}/10
              </Typography>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2 
            }}>
              <Typography variant="h4">
                Select the correct animal
              </Typography>
              <IconButton onClick={playSound}>
                <VolumeUpIcon />
              </IconButton>
            </Box>

            <Grid container spacing={3} justifyContent="center">
              {selectedAnimals.map((animal) => (
                <Grid item xs={6} sm={3} key={animal.name}>
                  <FlipCard
                    image={animal.image}
                    isFlipped={isFlipping}
                    onClick={() => handleAnimalClick(animal)}
                    border={selectedAnswer === animal.name ? 
                      `4px solid ${isCorrect ? '#4caf50' : '#f44336'}` : 
                      'none'
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <GameComplete score={score} />
        )}
      </Box>
    </Container>
  )
}

export default GamePage