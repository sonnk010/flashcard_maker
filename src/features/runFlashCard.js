import { createSlice } from '@reduxjs/toolkit'

export const flashCardSlice = createSlice({
  name: 'counter',
  initialState: {
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
    }
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, setFlashCardState, incrementInterval, setDefaultFlashCard } = flashCardSlice.actions

export default flashCardSlice.reducer