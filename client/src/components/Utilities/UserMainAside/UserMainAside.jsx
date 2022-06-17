import classes from "./UserMainAside.module.css";
import Button from "../Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { currentUserActions } from "../../../features/currentUser";
import axios from "axios";
import ClassItem from "../ClassItem/ClassItem";
import { useState } from "react";

const UserMainAside = () => {
  const dispatch = useDispatch();
  const [className, setClassName] = useState("");
  const [invalidForm, setInvalidForm] = useState(false);
  const user = useSelector((state) => state.CurrentUser.user);
  const role = useSelector((state) => state.WhatRole.role);

  const addClassHandler = () => {
    {
      className.length > 0
        ? axios
            .post("/api/teacher/newclass", {
              user,
              className,
              teacherId: user._id,
            })
            .then((serverRes) => {
              // TEST-ADDING CLASSES TO CURUSER.CLASSES
              dispatch(currentUserActions.addNewClass(serverRes.data));
            })
            .catch((err) => console.log(err))
        : setInvalidForm(true);
    }
  };

  const enrollClassHandler = () => {
    axios
      .post("/api/student/newclass", {
        secretKey: "3212Tansy",
        teacherEmail: "teacher@teacher.com",
        user,
      })
      .then((serverRes) => {
        dispatch(currentUserActions.setCurrentUser(serverRes.data));
      })
      .catch((err) => console.log(err));
  };

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
        placeholder="Class Name"
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
