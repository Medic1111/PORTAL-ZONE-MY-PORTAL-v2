import { createSlice } from "@reduxjs/toolkit";

export const currentUser = createSlice({
  name: "currentUser",
  initialState: { user: {} },
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = action.payload;
    },
    addNewClass: (state, action) => {
      state.user = {
        ...state.user,
        classes: action.payload,
      };
    },
  },
});

export const currentUserActions = currentUser.actions;

export default currentUser.reducer;
