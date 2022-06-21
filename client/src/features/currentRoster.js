import { createSlice } from "@reduxjs/toolkit";

export const currentRoster = createSlice({
  name: "StudentInRoster",
  initialState: { student: {} },
  reducers: {
    setStudent: (state, action) => {
      state.student = action.payload;
      console.log(state.student.fName);
    },
  },
});

export const currentRosterActions = currentRoster.actions;

export default currentRoster.reducer;
