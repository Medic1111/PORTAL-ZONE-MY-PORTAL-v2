import { configureStore } from "@reduxjs/toolkit";
import DarkMode from "../features/darkModeSlice";

const reduxStore = configureStore({
  reducer: { DarkMode },
});

export default reduxStore;
