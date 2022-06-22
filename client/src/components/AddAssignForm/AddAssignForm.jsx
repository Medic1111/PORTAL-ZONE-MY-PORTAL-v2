import Button from "../Utilities/Button/Button";
import classes from "./AddAssignForm.module.css";
import { wrapperActions } from "../../features/wrapper";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
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

  const addAssignment = (e) => {
    e.preventDefault();
    dispatch(isLoadingActions.setIsLoading(true));
    axios
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
        console.log(err);
        // ADDRESS THIS CATCH!!!
        dispatch(isLoadingActions.setIsLoading(false));
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
