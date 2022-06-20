import { createSlice } from "@reduxjs/toolkit";

export const chat = createSlice({
  name: "Chat",
  initialState: { isChat: false },
  reducers: {
    setIsChat: (state, action) => {
      state.isChat = action.payload;
    },
  },
});

export const chatActions = chat.actions;

export default chat.reducer;
