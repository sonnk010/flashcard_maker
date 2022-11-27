import {configureStore} from '@reduxjs/toolkit'
import courses from './features/courses';
import flashCardSlice from './features/runFlashCard'

const store = configureStore({
  reducer: {
    overviewFlashCard: flashCardSlice,
    courses: courses
  },
});

export default store