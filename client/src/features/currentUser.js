import { createSlice } from "@reduxjs/toolkit";

export const currentUser = createSlice({
  name: "currentUser",
  initialState: { user: { classes: [] } },
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = action.payload;
    },
    addNewClass: (state, action) => {
      state.user.classes = [...state.user.classes, action.payload];
    },
    insertAllClasses: (state, action) => {
      state.user.classes = action.payload;
    },
    clearCurrentUser: (state) => {
      state.user = { user: { classes: [] } };
    },
    removeClass: (state, action) => {
      const clearList = state.user.classes.filter((obj, index) => {
        return obj._id !== action.payload._id;
      });
      state.user.classes = clearList;
    },
  },
});

export const currentUserActions = currentUser.actions;

export default currentUser.reducer;
