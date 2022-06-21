import { createSlice } from "@reduxjs/toolkit";

export const wrapper = createSlice({
  name: "Wrapper",
  initialState: { form: false, main: true, confirm: false, roster: false },
  reducers: {
    setForm: (state, action) => {
      state.form = action.payload;
    },
    setMain: (state, action) => {
      state.main = action.payload;
    },
    setConfirm: (state, action) => {
      state.confirm = action.payload;
    },
    setRoster: (state, action) => {
      state.roster = action.payload;
    },
  },
});

export const wrapperActions = wrapper.actions;

export default wrapper.reducer;
