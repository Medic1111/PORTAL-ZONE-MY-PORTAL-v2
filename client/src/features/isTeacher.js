import { createSlice } from "@reduxjs/toolkit";

export const isTeacher = createSlice({
  name: "isTeacher",
  initialState: { isTeacher: true },
  reducers: {
    setIsTeacher: (state, action) => {
      state.isTeacher = action.payload;
    },
  },
});

export const isTeacherActions = isTeacher.actions;

export default isTeacher.reducer;
