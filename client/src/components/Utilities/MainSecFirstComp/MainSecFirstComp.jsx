import classes from "./MainSecFirstComp.module.css";
import Link from "../Link/Link";
import { useSelector, useDispatch } from "react-redux";
import { chatActions } from "../../../features/chat";
import React from "react";
import { wrapperActions } from "../../../features/wrapper";
import axios from "axios";
import { currentClassActions } from "../../../features/currentClass";
import { currentUserActions } from "../../../features/currentUser";
import { isLoadingActions } from "../../../features/loading";
import { errorActions } from "../../../features/error";
const MainSecFirstComp = ({ socket }) => {
  const dispatch = useDispatch();
  const currentClass = useSelector((state) => state.CurrentClass.class);
  const role = useSelector((state) => state.WhatRole.role);
  const dark = useSelector((state) => state.DarkMode.isDarkMode);

  if (!currentClass) {
    dispatch(isLoadingActions.setIsLoading(true));
    dispatch(errorActions.setIsError(true));
    dispatch(
      errorActions.setMsg("Class no longer exists, we are updating your list")
    );
    dispatch(wrapperActions.setInitial());
    dispatch(currentClassActions.setCurrentClass({ className: "" }));

    // REFETCH CLASSES FROM MAINUSER, or FILTER CURRENT USER CLASSES
  }

  const enterChatHandler = async () => {
    dispatch(isLoadingActions.setIsLoading(true));
    await axios
      .get(`/api/classes/${currentClass._id}`)
      .then((serverRes) => {
        if (serverRes.data) {
          dispatch(currentClassActions.setCurrentClass(serverRes.data));
          dispatch(isLoadingActions.setIsLoading(false));
        } else if (!serverRes.data) {
          dispatch(errorActions.setIsError(true));
          dispatch(errorActions.setMsg("Class is no longer available"));
          dispatch(currentUserActions.removeClass(currentClass));
          dispatch(wrapperActions.setInitial());
          dispatch(currentClassActions.setCurrentClass({ className: "" }));
        }
      })
      .catch((err) => console.log(err));

    socket.emit("join_room", currentClass.secretKey);
    dispatch(chatActions.setIsChat(true));
  };

  const openRosterHandler = () => {
    dispatch(wrapperActions.setRoster(true));
    dispatch(wrapperActions.setMain(false));
  };

  return (
    <div className={classes.div}>
      <h4 className={dark ? `${classes.darkH2}` : `${classes.lightH2}`}>
        {currentClass.className}
      </h4>
      {role === "Mentor" ? (
        <p className={dark ? `${classes.pDark}` : `${classes.pLight}`}>
          Key: {currentClass.secretKey}
        </p>
      ) : (
        <React.Fragment>
          <p className={dark ? `${classes.pDark}` : `${classes.pLight}`}>
            Mentor: {currentClass.whoTeach.lName}
          </p>
          <p className={dark ? `${classes.pDark}` : `${classes.pLight}`}>
            Email: {currentClass.whoTeach.email}
          </p>
        </React.Fragment>
      )}

      {role === "Mentor" && (
        <Link innerTxt={"ROSTER"} clickMe={openRosterHandler} />
      )}

      <Link innerTxt={"Chat"} clickMe={enterChatHandler} />
    </div>
  );
};

export default MainSecFirstComp;
