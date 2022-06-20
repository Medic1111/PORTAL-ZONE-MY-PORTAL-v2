import classes from "./ClassItem.module.css";
import { useDispatch } from "react-redux";
import { currentClassActions } from "../../../features/currentClass";
import { chatActions } from "../../../features/chat";

const ClassItem = ({ obj, socket }) => {
  const dispatch = useDispatch();

  const showClassHandler = () => {
    dispatch(currentClassActions.setCurrentClass(obj));
    dispatch(chatActions.setIsChat(false));
    socket.removeAllListeners();
  };

  return (
    <li className={classes.li} obj={obj} onClick={showClassHandler}>
      {obj.className}
    </li>
  );
};

export default ClassItem;
