import classes from "./MainSecCompThree.module.css";
import Button from "../Button/Button";
import { useSelector, useDispatch } from "react-redux";

import { wrapperActions } from "../../../features/wrapper";
const MainSecCompThree = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.WhatRole.role);

  const addAssignmentHandler = () => {
    dispatch(wrapperActions.setForm(true));
    dispatch(wrapperActions.setMain(false));
  };

  // TEST
  const deleteClass = () => {
    dispatch(wrapperActions.setMain(false));
    dispatch(wrapperActions.setConfirm(true));
  };

  return (
    <section className={classes.section2}>
      {role === "Mentor" && (
        <Button innerTxt={"Add Assigment"} clickMe={addAssignmentHandler} />
      )}
      {role === "Mentor" && (
        <Button innerTxt={"Delete Class"} clickMe={deleteClass} />
      )}
      {role === "Student" && (
        <Button innerTxt={"Un-enroll from Class"} clickMe={deleteClass} />
      )}
    </section>
  );
};

export default MainSecCompThree;
