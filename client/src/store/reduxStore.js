import { configureStore } from "@reduxjs/toolkit";
import DarkMode from "../features/darkModeSlice";
import LogRegModal from "../features/toggleLogRegModal";
import IsRegistering from "../features/isRegistering";
import IsTeacher from "../features/isTeacher";
import IsLoggedIn from "../features/isLoggedIn";
import WhatRole from "../features/whatRole";
import CurrentUser from "../features/currentUser";
import CurrentClass from "../features/currentClass";
import ChatModal from "../features/chat";
import Wrapper from "../features/wrapper";
import CurrentRoster from "../features/currentRoster";
import IsLoading from "../features/loading";
import Error from "../features/error";

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
    ChatModal,
    Wrapper,
    CurrentRoster,
    IsLoading,
    Error,
  },
});

export default reduxStore;
