import classes from "./UserMainAside.module.css";
import Button from "../Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { currentUserActions } from "../../../features/currentUser";
import { isLoadingActions } from "../../../features/loading";
import axios from "axios";
import ClassItem from "../ClassItem/ClassItem";
import React, { useState } from "react";

// CHECK WARNING MESSAGE ON STUDENT
// FAILING

const UserMainAside = ({ socket }) => {
  const dispatch = useDispatch();
  const [className, setClassName] = useState("");
  const [invalidForm, setInvalidForm] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [serverError, setServerError] = useState(false);
  const user = useSelector((state) => state.CurrentUser.user);
  const role = useSelector((state) => state.WhatRole.role);

  const addClassHandler = () => {
    if (className.length > 0) {
      dispatch(isLoadingActions.setIsLoading(true));
      axios
        .post("/api/teacher/newclass", {
          user,
          className,
          teacherId: user._id,
        })
        .then((serverRes) => {
          setClassName("");
          dispatch(isLoadingActions.setIsLoading(false));

          setServerError(false);
          dispatch(currentUserActions.addNewClass(serverRes.data));
        })
        .catch((err) => {
          dispatch(isLoadingActions.setIsLoading(false));

          setServerError(true);
        });
    } else {
      setInvalidForm(true);
    }
  };

  const enrollClassHandler = () => {
    if (className.length > 0) {
      dispatch(isLoadingActions.setIsLoading(true));

      axios
        .post("/api/student/newclass", {
          secretKey: className, //in this case is secret key
          user,
        })
        .then((serverRes) => {
          dispatch(isLoadingActions.setIsLoading(false));

          setClassName("");
          setNotFound(false);
          setServerError(false);
          dispatch(currentUserActions.addNewClass(serverRes.data));
        })
        .catch((err) => {
          dispatch(isLoadingActions.setIsLoading(false));
          err.response.status === 404
            ? setNotFound(true)
            : setServerError(true);
        });
    } else {
      setInvalidForm(true);
    }
  };

  return (
    <aside className={classes.aside}>
      <ul className={classes.ul}>
        {user.classes.map((obj, index) => {
          return <ClassItem socket={socket} key={`CLASS_${index}`} obj={obj} />;
        })}
      </ul>
      <input
        className={classes.input}
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        type="text"
        placeholder={role === "Mentor" ? "New Class Name" : "Class Key"}
      />
      {invalidForm && <p>REQUIRED</p>}
      {notFound && <p>NO CLASS FOUND WITH THAT KEY</p>}
      {serverError && <p>Something went wrong, please try again</p>}

      {role === "Mentor" ? (
        <Button clickMe={addClassHandler} innerTxt={"Add Class"} />
      ) : (
        <Button clickMe={enrollClassHandler} innerTxt={"Enroll Class"} />
      )}
    </aside>
  );
};

export default UserMainAside;
