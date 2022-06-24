import classes from "./ClassItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { currentClassActions } from "../../../features/currentClass";
import { chatActions } from "../../../features/chat";
import { currentRosterActions } from "../../../features/currentRoster";
const ClassItem = ({ obj, socket }) => {
  const dispatch = useDispatch();
  const dark = useSelector((state) => state.DarkMode.isDarkMode);

  const currentSecretKey = useSelector(
    (state) => state.CurrentClass.class.secretKey
  );

  const showClassHandler = () => {
    dispatch(currentClassActions.setCurrentClass(obj));
    dispatch(chatActions.setIsChat(false));
    dispatch(currentRosterActions.setStudent(obj));

    const data = {
      secretKey: currentSecretKey,
    };
    socket.emit("leave_chat", data);
    socket.removeAllListeners();
  };

  return (
    <li
      className={dark ? `${classes.darkInput}` : `${classes.lightInput}`}
      obj={obj}
      onClick={showClassHandler}
    >
      {obj.className}
    </li>
  );
};

export default ClassItem;
