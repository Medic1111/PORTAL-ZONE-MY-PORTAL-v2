import classes from "./Roster.module.css";
import { useSelector, useDispatch } from "react-redux";
import RosterOption from "../RosterOption/RosterOption";
import React from "react";
import Button from "../Utilities/Button/Button";
import { wrapperActions } from "../../features/wrapper";

const Roster = () => {
  const dispatch = useDispatch();
  const currentClass = useSelector((state) => state.CurrentClass.class);
  const student = useSelector((state) => state.CurrentRoster.student);

  const closeRosterHandler = () => {
    dispatch(wrapperActions.setInitial());
  };

  return (
    <div className={classes.div}>
      <div className={classes.rosterList}>
        <p className={classes.p}>ROSTER FOR {currentClass.className}:</p>
        {currentClass.roster.map((obj, index) => {
          return <RosterOption key={`STUDENT_${index}`} obj={obj} />;
        })}
      </div>
      <div className={classes.studentDiv}>
        <React.Fragment>
          <p className={classes.pTitle}>Student:</p>
          <p className={classes.pInfo}>
            Name: {student.fName} {student.lName}
          </p>
          <p className={classes.pInfo}>Email: {student.email}</p>
          <div className={classes.btnBox}>
            <Button innerTxt={"Close Roster"} clickMe={closeRosterHandler} />
          </div>
        </React.Fragment>
      </div>
    </div>
  );
};

export default Roster;
