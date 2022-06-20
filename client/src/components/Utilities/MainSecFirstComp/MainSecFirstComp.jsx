import classes from "./MainSecFirstComp.module.css";
import Link from "../Link/Link";
import { useSelector, useDispatch } from "react-redux";
import { chatActions } from "../../../features/chat";
import React from "react";
import Chat from "../Chat/Chat";
// import io from "socket.io-client";

// const socket = io.connect("/");
const MainSecFirstComp = ({ socket }) => {
  const isChat = useSelector((state) => state.ChatModal.isChat);

  const dispatch = useDispatch();
  const currentClass = useSelector((state) => state.CurrentClass.class);
  const role = useSelector((state) => state.WhatRole.role);
  const user = useSelector((state) => state.CurrentUser.user);

  // TEST SOCKET
  const enterChatHandler = () => {
    socket.emit("join_room", currentClass.secretKey);
    dispatch(chatActions.setIsChat(true));
  };

  {
    if (!isChat) {
      return (
        <div className={classes.div}>
          <h4 className={classes.h4}>{currentClass.className}</h4>
          {role === "Mentor" ? (
            <p className={classes.pKey}>Key: {currentClass.secretKey}</p>
          ) : (
            <p className={classes.p}>Grade: C</p>
          )}
          {role === "Mentor" && (
            <select className={classes.select}>
              <option className={classes.option}>Roster</option>
              {currentClass.roster.map((obj, index) => {
                return (
                  <option key={`ROSTER_${index}`} className={classes.option}>
                    {`${obj.fName}`.toUpperCase()}{" "}
                    {`${obj.lName}`.toUpperCase()}
                  </option>
                );
              })}
            </select>
          )}
          {role === "Student" && currentClass.whoTeach && (
            <React.Fragment>
              <p className={classes.p}>Mentor: {currentClass.whoTeach.lName}</p>
              <p className={classes.p}>Email: {currentClass.whoTeach.email}</p>
            </React.Fragment>
          )}
          <Link innerTxt={"Chat"} clickMe={enterChatHandler} />
        </div>
      );
    } else if (isChat) {
      return (
        <Chat
          socket={socket}
          secretKey={currentClass.secretKey}
          user={`${user.fName} ${user.lName}`}
        />
      );
    }
  }
};

export default MainSecFirstComp;
