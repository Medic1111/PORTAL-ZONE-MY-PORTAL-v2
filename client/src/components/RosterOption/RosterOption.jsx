import classes from "./RosterOption.module.css";
import { currentRosterActions } from "../../features/currentRoster";
import { useDispatch } from "react-redux";

const RosterOption = ({ obj, value }) => {
  const dispatch = useDispatch();

  const showStudent = () => {
    dispatch(currentRosterActions.setStudent(obj));
  };

  return (
    <p onClick={showStudent} className={classes.p} value={value} obj={obj}>
      {`${obj.fName}`.toUpperCase()} {`${obj.lName}`.toUpperCase()}
    </p>
  );
};
export default RosterOption;
