import classes from "./MainSecFirstComp.module.css";
import Link from "../Link/Link";
import { useSelector, useDispatch } from "react-redux";
import { chatActions } from "../../../features/chat";
import React from "react";
import { wrapperActions } from "../../../features/wrapper";

const MainSecFirstComp = ({ socket }) => {
  const dispatch = useDispatch();
  const currentClass = useSelector((state) => state.CurrentClass.class);
  const role = useSelector((state) => state.WhatRole.role);

  const enterChatHandler = () => {
    socket.emit("join_room", currentClass.secretKey);
    dispatch(chatActions.setIsChat(true));
  };

  // ROSTER TEST

  const openRosterHandler = () => {
    dispatch(wrapperActions.setRoster(true));
    dispatch(wrapperActions.setForm(false));
    dispatch(wrapperActions.setMain(false));
    dispatch(wrapperActions.setConfirm(false));
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
        /* <select onChange={showStudentHandler} className={classes.select}>
          <option className={classes.option}>Roster</option>
          {currentClass.roster.map((obj, index) => {
            return (
              <RosterOption value={obj} key={`ROSTER_${index}`} obj={obj} />
            );
          })}
        </select> */

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
