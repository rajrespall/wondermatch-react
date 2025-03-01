import { create } from 'zustand'
import axios from 'axios'

const useGameStore = create((set, get) => ({
  score: 0,
  round: 1,
  time: 0,
  startTime: null,
  selectedAnswer: null,
  isCorrect: null,
  isFlipping: false,
  selectedAnimals: [],
  correctAnimal: null,
  audio: null,
  matches: [],

  // Actions
  setScore: (score) => set({ score }),
  incrementScore: () => set((state) => ({ score: state.score + 1 })),
  setRound: (round) => set({ round }),
  incrementRound: () => set((state) => ({ round: state.round + 1 })),
  setTime: (time) => set({ time }),
  startTimer: () => set({ startTime: Date.now() }),
  endTimer: () => {
    const startTime = get().startTime
    if (startTime) {
      const endTime = Date.now()
      const timeInSeconds = Math.floor((endTime - startTime) / 1000)
      set({ time: timeInSeconds })
    }
  },
  setSelectedAnswer: (answer) => set({ selectedAnswer: answer }),
  setIsCorrect: (isCorrect) => set({ isCorrect }),
  setIsFlipping: (isFlipping) => set({ isFlipping }),
  setSelectedAnimals: (animals) => set({ selectedAnimals: animals }),
  setCorrectAnimal: (animal) => set({ correctAnimal: animal }),
  setAudio: (audio) => set({ audio }),
  resetGame: () => set({
    score: 0,
    round: 1,
    time: 0,
    startTime: null,
    selectedAnswer: null,
    isCorrect: null,
    isFlipping: false,
    selectedAnimals: [],
    correctAnimal: null,
    audio: null,
  }),

  // Add match
  addMatch: async (match) => {
    try {
      const response = await axios.post('http://localhost:5000/api/match', match, 
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      console.log('Match added:', response);
      set((state) => ({ matches: [...state.matches, response.data] }));
    } catch (error) {
      console.error('Failed to add match:', error);
    }
  },

}))

export default useGameStore