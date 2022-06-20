import classes from "./Chat.module.css";
import Button from "../Button/Button";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../../../features/chat";
import { currentClassActions } from "../../../features/currentClass";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ socket, user }) => {
  // ADD DATE TO THE MSGDATA BEING
  //SENT TO SERVER

  const dispatch = useDispatch();
  const [msg, setMsg] = useState("");
  const currentClass = useSelector((state) => state.CurrentClass.class);
  const currentSecretKey = useSelector(
    (state) => state.CurrentClass.class.secretKey
  );

  const closeChatHandler = () => {
    const data = {
      secretKey: currentSecretKey,
    };
    socket.emit("leave_chat", data);
    socket.removeAllListeners();

    dispatch(chatActions.setIsChat(false));
  };

  const sendMsgHandler = async (event) => {
    event.preventDefault();
    const msgData = {
      secretKey: currentSecretKey,
      user,
      msg,
      time: `${new Date(Date.now()).getHours()}:${new Date(
        Date.now()
      ).getMinutes()}`,
    };

    await socket.emit("send_message", msgData);
    dispatch(currentClassActions.updateMessages(msgData));
    setMsg("");
  };

  useEffect(() => {
    socket.on("receiving_msg", (data) => {
      dispatch(currentClassActions.updateMessages(data));
    });
  }, [socket]);

  return (
    <section className={classes.section}>
      <h4 className={classes.h4}>
        Be polite, all messages are being recorded.
      </h4>
      <ul className={classes.txtBox}>
        <ScrollToBottom className={classes.scroll}>
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
        </ScrollToBottom>
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
