import classes from "./UserMainAside.module.css";
import Button from "../Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { currentUserActions } from "../../../features/currentUser";
import axios from "axios";
import ClassItem from "../ClassItem/ClassItem";

const UserMainAside = () => {
  const user = useSelector((state) => state.CurrentUser.user);
  const role = useSelector((state) => state.WhatRole.role);
  const dispatch = useDispatch();

  const addClassHandler = () => {
    axios
      .post("/api/teacher/newclass", { user, className: "math" })
      .then((serverRes) => {
        dispatch(currentUserActions.setCurrentUser(serverRes.data));
      })
      .catch((err) => console.log(err));
  };

  const enrollClassHandler = () => {
    console.log("enrolling...");
    axios
      .post("/api/student/newclass", {
        secretKey: "6051me",
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
      {role === "Mentor" ? (
        <Button clickMe={addClassHandler} innerTxt={"Add Class"} />
      ) : (
        <Button clickMe={enrollClassHandler} innerTxt={"Enroll Class"} />
      )}
    </aside>
  );
};

export default UserMainAside;
