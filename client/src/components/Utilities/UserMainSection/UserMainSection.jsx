import classes from "./UserMainSection.module.css";
import MainSecFirstComp from "../MainSecFirstComp/MainSecFirstComp";
import MainSecCompTwo from "../MainSecCompTwo/MainSecCompTwo";
import MainSecCompThree from "../MainSecCompThree/MainSecCompThree";
import { useSelector } from "react-redux";
import React from "react";
import Chat from "../Chat/Chat";

const UserMainSection = ({ socket }) => {
  const isChat = useSelector((state) => state.ChatModal.isChat);
  const user = useSelector((state) => state.CurrentUser.user);
  const currentClass = useSelector((state) => state.CurrentClass.class);

  return (
    <section className={classes.section}>
      {!isChat ? (
        <React.Fragment>
          <MainSecFirstComp socket={socket} />
          <MainSecCompTwo />
          <MainSecCompThree />
        </React.Fragment>
      ) : (
        <Chat
          socket={socket}
          secretKey={currentClass.secretKey}
          user={`${user.fName} ${user.lName}`}
        />
      )}
    </section>
  );
};
export default UserMainSection;
