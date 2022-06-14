import { configureStore } from "@reduxjs/toolkit";
import DarkMode from "../features/darkModeSlice";
import LogRegModal from "../features/toggleLogRegModal";
import IsRegistering from "../features/isRegistering";
import IsTeacher from "../features/isTeacher";
const reduxStore = configureStore({
  reducer: { DarkMode, LogRegModal, IsRegistering, IsTeacher },
});

export default reduxStore;
