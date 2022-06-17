import { configureStore } from "@reduxjs/toolkit";
import DarkMode from "../features/darkModeSlice";
import LogRegModal from "../features/toggleLogRegModal";
import IsRegistering from "../features/isRegistering";
import IsTeacher from "../features/isTeacher";
import IsLoggedIn from "../features/isLoggedIn";
import WhatRole from "../features/whatRole";
import CurrentUser from "../features/currentUser";
import CurrentClass from "../features/currentClass";
import GetClassCount from "../features/getClassCount";
const reduxStore = configureStore({
  reducer: {
    DarkMode,
    LogRegModal,
    IsRegistering,
    IsTeacher,
    IsLoggedIn,
    WhatRole,
    CurrentUser,
    CurrentClass,
    GetClassCount,
  },
});

export default reduxStore;
