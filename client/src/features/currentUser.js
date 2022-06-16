import { createSlice } from "@reduxjs/toolkit";

export const currentUser = createSlice({
  name: "currentUser",
  initialState: { user: {} },
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = action.payload;
      console.log(state.user);
    },
  },
});

export const currentUserActions = currentUser.actions;

export default currentUser.reducer;
