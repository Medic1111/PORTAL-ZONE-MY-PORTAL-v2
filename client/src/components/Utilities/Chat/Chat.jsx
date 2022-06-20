import classes from "./Chat.module.css";
import Button from "../Button/Button";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../../../features/chat";
import { currentClassActions } from "../../../features/currentClass";

const Chat = ({ socket, secretKey, user }) => {
  const [msg, setMsg] = useState("");
  const currentUser = useSelector((state) => state.CurrentUser.user);

  const [dummyArr, setDummyArr] = useState([]);

  const dispatch = useDispatch();
  const currentClass = useSelector((state) => state.CurrentClass.class);

  const closeChatHandler = () => {
    socket.disconnect();
    dispatch(chatActions.setIsChat(false));
  };
  const sendMsgHandler = async (event) => {
    event.preventDefault();
    const msgData = {
      secretKey,
      user,
      msg,
      time: `${new Date(Date.now()).getHours()}:${new Date(
        Date.now()
      ).getMinutes()}`,
    };

    await socket.emit("send_message", msgData);
    dispatch(currentClassActions.updateMessages(msgData));
    // setDummyArr((prev) => {
    //   return [...prev, msgData];
    // });
  };

  useEffect(() => {
    socket.on("receiving_msg", (data) => {
      dispatch(currentClassActions.updateMessages(data));
      // setDummyArr((prev) => {
      //   return [...prev, data];
      // });
    });
  }, [socket]);

  return (
    <section className={classes.section}>
      <h4 className={classes.h4}>
        Be polite, all messages are being recorded.
      </h4>
      <ul className={classes.txtBox}>
        {currentClass.messages.map((item, index) => {
          return (
            <div key={`MSG_${index}`}>
              <p className={classes.p}>
                {item.user.toUpperCase()}{" "}
                <span>
                  {new Date().getMonth()}/{new Date().getDate()} ${"  "}
                  {item.time}
                </span>
              </p>
              <li className={classes.li}>{item.msg}</li>
            </div>
          );
        })}
      </ul>

      <form className={classes.form}>
        <div className={classes.actionDiv}>
          <input
            className={classes.input}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            type="text"
            placeholder="type here..."
          />
          <button className={classes.send} onClick={sendMsgHandler}>
            send
          </button>
        </div>
      </form>

      <Button innerTxt={"Close"} clickMe={closeChatHandler} />
    </section>
  );
};
export default Chat;
