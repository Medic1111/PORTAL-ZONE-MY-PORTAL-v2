import classes from "./MainSecCompThree.module.css";
import Button from "../Button/Button";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { currentClassActions } from "../../../features/currentClass";

const MainSecCompThree = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.WhatRole.role);
  const currentClass = useSelector((state) => state.CurrentClass.class);

  const addAssignmentHandler = () => {
    axios
      .post("/api/teacher/assignments/new", {
        assign: "Get your homework done",
        currentClass,
      })
      .then((serverRes) => {
        dispatch(currentClassActions.setCurrentClass(serverRes.data));
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className={classes.section2}>
      {role === "Mentor" && (
        <Button innerTxt={"Add Assigment"} clickMe={addAssignmentHandler} />
      )}
      {role === "Mentor" && <Button innerTxt={"Delete Class"} />}
      {role === "Student" && <Button innerTxt={"Un-enroll from Class"} />}
    </section>
  );
};

export default MainSecCompThree;
