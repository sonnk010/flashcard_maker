import {createSlice} from '@reduxjs/toolkit'

export const flashCardSlice = createSlice({
  name: 'overviewFlashCard',
  initialState: {
    isPlaying: false,
    isFlip: false,
    delayFlip: true,
    index: 0,
    termi: '',
    defi: '',
    sources: [
      {
        defi: "1234",
        termi: "Mot hai ba bon"
      },
      {
        defi: "12345",
        termi: "Mot hai ba bon nam"
      },
      {
        defi: "123456",
        termi: "Mot hai ba bon nam sau"
      },
    ]
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
      state.defi = state.sources[state.index]?.defi
      state.termi = state.sources[state.index]?.termi
    },
    setDefaultFlashCard: (state) => {
      state.defi = state.sources[0]?.defi
      state.termi = state.sources[0]?.termi
    },
    setEmptyFlashCard: (state) => {
      state.defi = ""
      state.termi = ""
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
    }
  },
})

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
} = flashCardSlice.actions

export default flashCardSlice.reducer