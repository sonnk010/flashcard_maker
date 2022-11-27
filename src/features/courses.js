import {createSlice} from '@reduxjs/toolkit'

export const courses = createSlice({
  name: 'courses',
  initialState: {
    courseId: ""
  },
  reducers: {
    setCourseID: (state, data) => {
      state.courseId = data.payload
    },
  },
})

export const {
  setCourseID,
} = courses.actions

export default courses.reducer