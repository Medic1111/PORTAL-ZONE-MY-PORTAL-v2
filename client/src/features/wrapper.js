import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  form: false,
  main: true,
  confirm: false,
  roster: false,
};

export const wrapper = createSlice({
  name: "Wrapper",
  initialState,
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
    setInitial: () => initialState,
  },
});

export const wrapperActions = wrapper.actions;

export default wrapper.reducer;
