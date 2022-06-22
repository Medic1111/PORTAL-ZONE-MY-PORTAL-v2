import { createSlice } from "@reduxjs/toolkit";

export const currentRoster = createSlice({
  name: "StudentInRoster",
  initialState: { student: {} },
  reducers: {
    setStudent: (state, action) => {
      state.student = action.payload;
    },
  },
});

export const currentRosterActions = currentRoster.actions;

export default currentRoster.reducer;
