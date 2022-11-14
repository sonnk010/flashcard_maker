import {createSlice} from '@reduxjs/toolkit'

export const flashCardSlice = createSlice({
  name: 'overviewFlashCard',
  initialState: {
    isPlaying: false,
    isFlip: false,
    skipFlip: true,
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
      console.log(state.index);
      state.index += 1
    },
    decrement: (state) => {
      console.log(state.index);
      state.index -= 1
    },
    incrementInterval: (state) => {
      console.log(state.index);
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
      if (data.payload) {
        state.isPlaying = data.payload
      } else {
        state.isPlaying = !state.isPlaying
      }
    },
    setFlip: (state) => {
      state.isFlip = !state.isFlip
    },
    setSkipFlip: (state) => {
      state.skipFlip = !state.skipFlip
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
  setSkipFlip,
} = flashCardSlice.actions

export default flashCardSlice.reducer