import { createSlice } from "@reduxjs/toolkit";

export const toggleLogRegModal = createSlice({
  name: "toggleLogRegModal",
  initialState: { isModal: false },
  reducers: {
    setIsModal: (state) => {
      state.isModal = !state.isModal;
    },
  },
});

export const toggleLogRegModalActions = toggleLogRegModal.actions;

export default toggleLogRegModal.reducer;
