import {createSlice} from '@reduxjs/toolkit'

export const flashCardSlice = createSlice({
  name: 'overviewFlashCard',
  initialState: {
    isPlaying: false,
    isFlip: false,
    delayFlip: true,
    useShuffledSources: true,
    index: 0,
    terminology: '',
    definition: '',
    rootSources: [],
    sources: [],
  },
  reducers: {
    increment: (state) => {
      state.index += 1
    },
    decrement: (state) => {
      state.index -= 1
    },
    incrementInterval: (state) => {
      if (state.index === state.sources.length - 1) {
        state.index = 0
      } else {
        state.index += 1
      }
    },
    setFlashCardState: (state) => {
      state.definition = state.sources[state.index]?.definition
      state.terminology = state.sources[state.index]?.terminology
    },
    setDefaultFlashCard: (state) => {
      state.definition = state.sources[0]?.definition
      state.terminology = state.sources[0]?.terminology
    },
    setEmptyFlashCard: (state) => {
      state.definition = ""
      state.terminology = ""
    },
    setPlaying: (state, data) => {
      if (data.payload !== undefined) {
        state.isPlaying = data.payload
      } else {
        state.isPlaying = !state.isPlaying
      }
    },
    setFlip: (state) => {
      state.isFlip = !state.isFlip
    },
    setDelayFlip: (state, data) => {
      state.skipFlip = data.payload.delayFlip
    },
    setSources: (state, data) => {
      state.sources = data.payload
      return state
    },
    addSources: (state, data) => {
      state.sources = [
        ...state.sources,
        data.payload,
      ]
    },
    setRootSources: (state, data) => {
      state.rootSources = data.payload
      return state
    },
    shuffle: (state) => {
      let sources = shuffleArray([...state.rootSources])
      state.sources = [
        ...sources,
      ]
    },
    setUseShuffledSources: (state, data) => {
      state.useShuffledSources = data.payload
    }
  },
})

function shuffleArray(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

// Action creators are generated for each case reducer function
export const {
  increment,
  decrement,
  setFlashCardState,
  setEmptyFlashCard,
  incrementInterval,
  setDefaultFlashCard,
  setPlaying,
  setFlip,
  setDelayFlip,
  setSources,
  addSources,
  shuffle,
  setUseShuffledSources,
  setRootSources,
} = flashCardSlice.actions

export default flashCardSlice.reducer