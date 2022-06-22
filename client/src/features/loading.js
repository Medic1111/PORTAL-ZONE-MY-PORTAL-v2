import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false };

export const isLoading = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const isLoadingActions = isLoading.actions;

export default isLoading.reducer;
