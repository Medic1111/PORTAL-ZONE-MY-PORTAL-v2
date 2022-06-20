import classes from "./ClassItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { currentClassActions } from "../../../features/currentClass";
import { chatActions } from "../../../features/chat";

const ClassItem = ({ obj, socket }) => {
  const dispatch = useDispatch();

  const currentSecretKey = useSelector(
    (state) => state.CurrentClass.class.secretKey
  );

  const showClassHandler = () => {
    dispatch(currentClassActions.setCurrentClass(obj));
    dispatch(chatActions.setIsChat(false));

    const data = {
      secretKey: currentSecretKey,
    };
    socket.emit("leave_chat", data);
    console.log(currentSecretKey);
    socket.removeAllListeners();
  };

  return (
    <li className={classes.li} obj={obj} onClick={showClassHandler}>
      {obj.className}
    </li>
  );
};

export default ClassItem;
