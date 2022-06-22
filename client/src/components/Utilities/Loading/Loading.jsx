import classes from "./Loading.module.css";
import { useSelector, useDispatch } from "react-redux";
import { errorActions } from "../../../features/error";
import { isLoadingActions } from "../../../features/loading";
import React from "react";

const Loading = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.Error);

  const resetError = () => {
    dispatch(errorActions.setIsError(false));
    dispatch(isLoadingActions.setIsLoading(false));
  };

  {
    if (error.isError) {
      return (
        <div className={classes.flexParent}>
          <p>{error.msg}</p>
          <button onClick={resetError}>CLOSE</button>
        </div>
      );
    } else {
      return (
        <div className={classes.flexParent}>
          <div className={classes.spinner}></div>
        </div>
      );
    }
  }
};

export default Loading;
