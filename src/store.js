import {configureStore} from '@reduxjs/toolkit'
import flashCardSlice from './features/runFlashCard'

const store = configureStore({
  reducer: {
    overviewFlashCard: flashCardSlice
  },
});

export default store