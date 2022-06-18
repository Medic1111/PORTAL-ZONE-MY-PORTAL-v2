import classes from "./ClassItem.module.css";
import { useDispatch } from "react-redux";
import { currentClassActions } from "../../../features/currentClass";

const ClassItem = ({ obj }) => {
  const dispatch = useDispatch();

  const showClassHandler = () => {
    dispatch(currentClassActions.setCurrentClass(obj));
  };

  return (
    <li className={classes.li} obj={obj} onClick={showClassHandler}>
      {obj.className}
    </li>
  );
};

export default ClassItem;
