import {configureStore} from '@reduxjs/toolkit'
import flashCardSlice from './features/runFlashCard'

export default configureStore({
  reducer: {
    overviewFlashCard: flashCardSlice
  },
})