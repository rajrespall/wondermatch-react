import { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Container, Grid, Typography, IconButton, Snackbar, Alert } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { animals } from '../constants/animals';
import { useSettings } from '../context/SettingsContext';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import FlipCard from './FlipCard';
import GameComplete from './GameComplete';
import useGameStore from '../../store/gameStore';
import axios from 'axios';

const GamePage = () => {
  const location = useLocation();
  const difficulty = location.state?.difficulty || 'easy';
  const { settings } = useSettings();
  const navigate = useNavigate();
  const [showPlayPrompt, setShowPlayPrompt] = useState(false);

  const {
    score,
    round,
    selectedAnswer,
    isCorrect,
    isFlipping,
    selectedAnimals,
    correctAnimal,
    audio,
    setScore,
    incrementScore,
    setRound,
    incrementRound,
    startTimer,
    endTimer,
    setSelectedAnswer,
    setIsCorrect,
    setIsFlipping,
    setSelectedAnimals,
    setCorrectAnimal,
    setAudio,
    resetGame,
    addMatch,
  } = useGameStore();

  const successSound = '/assets/sound_effects/correct_ans.mp3';
  const failureSound = '/assets/sound_effects/wrong_ans.mp3';

  const getCardCount = () => {
    switch(difficulty) {
      case 'medium': return 6;
      case 'hard': return 8;
      default: return 3;
    }
  };
  const cardCount = getCardCount();

  const playFeedbackSound = (isCorrect) => {
    if (settings.soundEffects) {
      const feedbackAudio = new Audio(isCorrect ? successSound : failureSound);
      feedbackAudio.play().catch(console.error);
    }
  };

  const playSound = useCallback(() => {
    if (correctAnimal && settings.soundEffects && audio) {
      audio.currentTime = 0;
      audio.play().catch(error => {
        console.log('Audio playback failed:', error);
        setShowPlayPrompt(true);
      });
    }
  }, [correctAnimal, settings.soundEffects, audio]);

  // Attempt to autoplay audio when a new round starts
  useEffect(() => {
    if (correctAnimal && settings.soundEffects && audio && !isFlipping) {
      // Short delay to ensure audio is ready
      setTimeout(() => {
        playSound();
      }, 1000);
    }
  }, [correctAnimal, isFlipping]);

  const loadNewAnimals = useCallback(() => {
    if (round >= 10) return;

    setIsFlipping(true);

    setTimeout(() => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }

      const shuffled = [...animals].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, cardCount);
      setSelectedAnimals(selected);

      const randomIndex = Math.floor(Math.random() * cardCount);
      const selectedAnimal = selected[randomIndex];
      setCorrectAnimal(selectedAnimal);

      const newAudio = new Audio(selectedAnimal.audio);
      // Preload audio
      newAudio.load();
      setAudio(newAudio);

      setSelectedAnswer(null);
      setIsCorrect(null);

      setTimeout(() => {
        setIsFlipping(false);
      }, 600);
    }, 600);
  }, [audio, round, cardCount]);

  useEffect(() => {
    resetGame();
    startTimer();
    loadNewAnimals();
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  const handleAnimalClick = async (animal) => {
    if (selectedAnswer) return;

    setSelectedAnswer(animal.name);
    const correct = animal.name === correctAnimal.name;
    setIsCorrect(correct);

    if (correct) {
      incrementScore();
    }

    playFeedbackSound(correct);

    if (round === 10) {
      endTimer();
      setTimeout(() => {
        setRound(11);
        addMatch({
          score,
          difficulty,
          timeSpent: useGameStore.getState().time,
        });
      }, 1500);
      return;
    }

    setTimeout(() => {
      incrementRound();
      loadNewAnimals();
    }, 1500);
  };

  return (
    <Box sx={{
      position: 'relative',
      minHeight: '100vh',
      backgroundImage: 'url(/assets/game_images/matchgamebg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
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
              <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }}>
                {difficulty} Mode
              </Typography>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2 
            }}>
              <Typography variant="h4" color='white'>
                Select the correct animal
              </Typography>
              <IconButton onClick={playSound}>
                <VolumeUpIcon />
              </IconButton>
            </Box>

            <Grid container spacing={3} justifyContent="center">
              {selectedAnimals.map((animal) => (
                <Grid 
                  item 
                  xs={12} 
                  sm={6} 
                  md={difficulty === 'hard' ? 3 : 4}
                  key={animal.name}
                >
                  <FlipCard
                    image={animal.image}
                    isFlipped={isFlipping}
                    onClick={() => handleAnimalClick(animal)}
                    border={selectedAnswer === animal.name ? 
                      `4px solid ${isCorrect ? '#4caf50' : '#f44336'}` : 
                      'none'
                    }
                    width={difficulty === 'hard' ? '150px' : '200px'}
                    height={difficulty === 'hard' ? '200px' : '250px'}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <GameComplete score={score} difficulty={difficulty} />
        )}
      </Box>
    </Container>
    <Snackbar 
      open={showPlayPrompt} 
      autoHideDuration={6000} 
      onClose={() => setShowPlayPrompt(false)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert severity="info" onClose={() => setShowPlayPrompt(false)}>
        Click the sound button to hear the animal sound
      </Alert>
    </Snackbar>
    </Box>
  );
};

export default GamePage;