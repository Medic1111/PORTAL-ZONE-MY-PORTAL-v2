import classes from "./UserMainAside.module.css";
import Button from "../Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { currentUserActions } from "../../../features/currentUser";
import { isLoadingActions } from "../../../features/loading";
import { errorActions } from "../../../features/error";
import axios from "axios";
import ClassItem from "../ClassItem/ClassItem";
import React, { useState } from "react";

const UserMainAside = ({ socket }) => {
  const dispatch = useDispatch();
  const [className, setClassName] = useState("");
  const [invalidForm, setInvalidForm] = useState(false);
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
          dispatch(currentUserActions.addNewClass(serverRes.data));
        })
        .catch((err) => {
          dispatch(errorActions.setIsError(true));
          dispatch(errorActions.setMsg("Server error, please try again"));
        });
    } else {
      setInvalidForm(true);
    }
  };

  const enrollClassHandler = async () => {
    if (className.length > 0) {
      dispatch(isLoadingActions.setIsLoading(true));

      await axios
        .post("/api/student/newclass", {
          secretKey: className, //in this case is secret key
          user,
        })
        .then((serverRes) => {
          dispatch(isLoadingActions.setIsLoading(false));
          setClassName("");
          dispatch(currentUserActions.addNewClass(serverRes.data));
        })
        .catch((err) => {
          dispatch(errorActions.setIsError(true));
          err.response.status === 404
            ? dispatch(errorActions.setMsg("No classes found with that id"))
            : dispatch(errorActions.setMsg("Server error, please try again."));
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

      {role === "Mentor" ? (
        <Button clickMe={addClassHandler} innerTxt={"Add Class"} />
      ) : (
        <Button clickMe={enrollClassHandler} innerTxt={"Enroll Class"} />
      )}
    </aside>
  );
};

export default UserMainAside;
