import classes from "./MainSecFirstComp.module.css";
import Link from "../Link/Link";
import { useSelector, useDispatch } from "react-redux";
import { chatActions } from "../../../features/chat";
import React from "react";
import { wrapperActions } from "../../../features/wrapper";
import axios from "axios";
import { currentClassActions } from "../../../features/currentClass";

const MainSecFirstComp = ({ socket }) => {
  const dispatch = useDispatch();
  const currentClass = useSelector((state) => state.CurrentClass.class);
  const role = useSelector((state) => state.WhatRole.role);

  const enterChatHandler = async () => {
    socket.emit("join_room", currentClass.secretKey);
    dispatch(chatActions.setIsChat(true));

    // THIS CALL UPDATES ALL MESSAGES

    await axios
      .get(`/api/classes/${currentClass._id}`)
      .then((serverRes) => {
        console.log("UPDATING CLASS");
        dispatch(currentClassActions.setCurrentClass(serverRes.data));
      })
      .catch((err) => console.log(err));
  };

  const openRosterHandler = () => {
    dispatch(wrapperActions.setRoster(true));
    dispatch(wrapperActions.setMain(false));
  };

  return (
    <div className={classes.div}>
      <h4 className={classes.h4}>{currentClass.className}</h4>
      {role === "Mentor" ? (
        <p className={classes.pKey}>Key: {currentClass.secretKey}</p>
      ) : (
        <React.Fragment>
          <p className={classes.p}>Mentor: {currentClass.whoTeach.lName}</p>
          <p className={classes.p}>Email: {currentClass.whoTeach.email}</p>
        </React.Fragment>
      )}

      {role === "Mentor" && (
        <Link innerTxt={"ROSTER"} clickMe={openRosterHandler} />
      )}
      {role === "Student" && currentClass.whoTeach && (
        <p className={classes.p}>Grade: C</p>
      )}
      <Link innerTxt={"Chat"} clickMe={enterChatHandler} />
    </div>
  );
};

export default MainSecFirstComp;
