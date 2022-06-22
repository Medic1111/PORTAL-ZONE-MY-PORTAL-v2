import React from "react";
import Button from "../Button/Button";
import classes from "./ConfirmWindow.module.css";
import { wrapperActions } from "../../../features/wrapper";
import { currentUserActions } from "../../../features/currentUser";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { currentClassActions } from "../../../features/currentClass";

const ConfirmWindow = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.CurrentUser.user);
  const currentClass = useSelector((state) => state.CurrentClass.class);

  let url;
  user.role === "Mentor"
    ? (url = "/api/teacher/classes/delete")
    : (url = "/api/student/classes/delete");

  const dispatchBunch = () => {
    dispatch(currentUserActions.removeClass(currentClass));
    dispatch(wrapperActions.setInitial());
    dispatch(currentClassActions.setCurrentClass({ className: "" }));
  };

  const dropHandler = () => {
    axios
      .put(url, { currentClass, user })
      .then((serverRes) => {
        dispatchBunch();
      })
      .catch((err) => console.log(err));
  };

  const deleteHandler = () => {
    axios
      .delete(url, { data: { currentClass } })
      .then((serverRes) => {
        dispatchBunch();
      })
      .catch((err) => console.log(err));
  };

  const cancelHandler = () => {
    dispatch(wrapperActions.setInitial());
  };

  return (
    <div className={classes.popUp}>
      <p className={classes.p}>
        {user.role === "Mentor"
          ? `delete ${currentClass.className}?`
          : `Drop out of ${currentClass.className}?`}
      </p>

      <p className={classes.p}>Are your sure?</p>
      <div className={classes.btnBox}>
        <Button innerTxt={"Cancel"} clickMe={cancelHandler} />
        {user.role === "Mentor" ? (
          <Button innerTxt={"Confirm"} clickMe={deleteHandler} />
        ) : (
          <Button innerTxt={"Confirm"} clickMe={dropHandler} />
        )}
      </div>
    </div>
  );
};

export default ConfirmWindow;
