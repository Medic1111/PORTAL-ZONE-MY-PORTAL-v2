import { configureStore } from "@reduxjs/toolkit";
import DarkMode from "../features/darkModeSlice";
import LogRegModal from "../features/toggleLogRegModal";
import IsRegistering from "../features/isRegistering";
import IsTeacher from "../features/isTeacher";
import IsLoggedIn from "../features/isLoggedIn";
const reduxStore = configureStore({
  reducer: { DarkMode, LogRegModal, IsRegistering, IsTeacher, IsLoggedIn },
});

export default reduxStore;
