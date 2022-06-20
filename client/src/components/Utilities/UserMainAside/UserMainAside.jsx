import classes from "./UserMainAside.module.css";
import Button from "../Button/Button";
import Loading from "../Loading/Loading";
import { useSelector, useDispatch } from "react-redux";
import { currentUserActions } from "../../../features/currentUser";
import axios from "axios";
import ClassItem from "../ClassItem/ClassItem";
import React, { useState } from "react";

const UserMainAside = () => {
  const dispatch = useDispatch();
  const [className, setClassName] = useState("");
  const [invalidForm, setInvalidForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state) => state.CurrentUser.user);
  const role = useSelector((state) => state.WhatRole.role);

  const addClassHandler = () => {
    if (className.length > 0) {
      setIsLoading(true);
      axios
        .post("/api/teacher/newclass", {
          user,
          className,
          teacherId: user._id,
        })
        .then((serverRes) => {
          setClassName("");
          setIsLoading(false);
          console.log(serverRes.data);
          dispatch(currentUserActions.addNewClass(serverRes.data));
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    } else {
      setInvalidForm(true);
    }
  };

  const enrollClassHandler = () => {
    if (className.length > 0) {
      setIsLoading(true);
      axios
        .post("/api/student/newclass", {
          secretKey: className, //in this case is secret key
          user,
        })
        .then((serverRes) => {
          // dispatch(getClassCountActions.increase());
          setIsLoading(false);
          setClassName("");
          console.log(serverRes.data);
          dispatch(currentUserActions.addNewClass(serverRes.data));
        })
        .catch((err) => console.log(err));
    } else {
      setInvalidForm(true);
    }
  };

  {
    if (!isLoading) {
      return (
        <aside className={classes.aside}>
          <ul className={classes.ul}>
            {user.classes.map((obj, index) => {
              return <ClassItem key={`CLASS_${index}`} obj={obj} />;
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
    } else {
      return (
        <div className={classes.div}>
          <Loading />
        </div>
      );
    }
  }
};

export default UserMainAside;
