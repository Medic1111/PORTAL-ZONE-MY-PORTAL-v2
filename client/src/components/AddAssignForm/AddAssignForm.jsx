import Button from "../Utilities/Button/Button";
import classes from "./AddAssignForm.module.css";
import { wrapperActions } from "../../features/wrapper";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { errorActions } from "../../features/error";
import { currentClassActions } from "../../features/currentClass";
import { isLoadingActions } from "../../features/loading";
import { useState } from "react";

const AddAssignForm = () => {
  const dispatch = useDispatch();
  const currentClass = useSelector((state) => state.CurrentClass.class);
  const [assign, setAssign] = useState("");

  const closeFormHandler = (e) => {
    e.preventDefault();
    dispatch(wrapperActions.setInitial());
  };

  const addAssignment = async (e) => {
    e.preventDefault();
    dispatch(isLoadingActions.setIsLoading(true));
    await axios
      .post("/api/teacher/assignments/new", {
        assign,
        currentClass,
      })
      .then((serverRes) => {
        dispatch(isLoadingActions.setIsLoading(false));
        dispatch(currentClassActions.setCurrentClass(serverRes.data));
        dispatch(wrapperActions.setInitial());
      })
      .catch((err) => {
        dispatch(errorActions.setIsError(true));
        dispatch(errorActions.setMsg("Server error, please try again."));
      });
  };

  return (
    <form className={classes.form}>
      <p className={classes.p}>
        ADDING ASSIGNMENT TO: {currentClass.className}
      </p>
      <input
        value={assign}
        onChange={(e) => setAssign(e.target.value)}
        className={classes.input}
        type="txt"
        placeholder="New Assignment"
      />
      <div className={classes.btnBox}>
        <Button innerTxt="Cancel" clickMe={closeFormHandler} />
        <Button innerTxt="Confirm" clickMe={addAssignment} />
      </div>
    </form>
  );
};
export default AddAssignForm;
