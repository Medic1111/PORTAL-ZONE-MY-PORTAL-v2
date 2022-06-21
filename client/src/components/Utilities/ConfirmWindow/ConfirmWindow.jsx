import React from "react";
import Button from "../Button/Button";
import classes from "./ConfirmWindow.module.css";
import { wrapperActions } from "../../../features/wrapper";
import { useDispatch } from "react-redux";

const ConfirmWindow = () => {
  const dispatch = useDispatch();

  const cancelHandler = () => {
    dispatch(wrapperActions.setConfirm(false));
    dispatch(wrapperActions.setMain(true));
    dispatch(wrapperActions.setForm(false));
  };

  return (
    <div className={classes.popUp}>
      <p className={classes.p}>Are your sure?</p>
      <div className={classes.btnBox}>
        <Button innerTxt={"Cancel"} clickMe={cancelHandler} />
        {/* CHECK ROLE< ASSIGN URL ACCORDINGLY */}
        <Button innerTxt={"Confirm"} />
      </div>
    </div>
  );
};

export default ConfirmWindow;
