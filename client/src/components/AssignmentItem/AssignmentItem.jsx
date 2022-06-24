import classes from "./AssignmentItem.module.css";
import { useSelector, useDispatch } from "react-redux";
import { currentClassActions } from "../../features/currentClass";
import { isLoadingActions } from "../../features/loading";
import { errorActions } from "../../features/error";
import axios from "axios";

const AssignmentItem = ({ item }) => {
  const dispatch = useDispatch();
  const currentClass = useSelector((state) => state.CurrentClass.class);

  const deleteAssignmentHandler = async () => {
    dispatch(isLoadingActions.setIsLoading(true));
    let itemToDel = item;
    await axios
      .post("/api/teacher/assignments/delete", { itemToDel, currentClass })
      .then((serverRes) => {
        dispatch(currentClassActions.removeAssigment(item));
        dispatch(isLoadingActions.setIsLoading(false));
      })
      .catch((err) => {
        dispatch(errorActions.setIsError(true));
        dispatch(errorActions.setMsg("Server error, please try again..."));
      });
  };

  return (
    <li className={classes.li}>
      <p className={classes.listItemP}>{item}</p>
      <span
        name={item}
        onClick={deleteAssignmentHandler}
        className={classes.span}
      >
        ✖️
      </span>
    </li>
  );
};

export default AssignmentItem;
