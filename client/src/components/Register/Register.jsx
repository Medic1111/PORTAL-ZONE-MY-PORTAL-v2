import classes from "./Register.module.css";
import Button from "../Utilities/Button/Button";
import { useDispatch } from "react-redux";
import { toggleLogRegModalActions } from "../../features/toggleLogRegModal";
import { useState } from "react";
import axios from "axios";

const Register = ({ isTeacher }) => {
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
  });

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setUserInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const registerHandler = (event) => {
    let url;
    isTeacher
      ? (url = "/api/register/teacher")
      : (url = "/api/register/student");
    event.preventDefault();
    axios
      .post(url, userInfo)
      .then((serverRes) => console.log(serverRes))
      .catch((err) => console.log(err));
  };

  const closeModalHandler = (event) => {
    event.preventDefault();
    dispatch(toggleLogRegModalActions.setIsModal());
  };

  return (
    <div className={classes.div}>
      <form className={classes.form}>
        <h2 className={classes.h2}>
          Register as a {isTeacher ? "Mentor" : "Learner"}
        </h2>
        <input
          onChange={inputChangeHandler}
          value={userInfo.fName}
          name="fName"
          className={classes.input}
          type="text"
          placeholder="First name"
        />
        <input
          onChange={inputChangeHandler}
          value={userInfo.lName}
          name="lName"
          className={classes.input}
          type="text"
          placeholder="Last name"
        />
        <input
          onChange={inputChangeHandler}
          value={userInfo.email}
          name="email"
          className={classes.input}
          type="email"
          placeholder="Email"
        />
        <input
          onChange={inputChangeHandler}
          value={userInfo.password}
          name="password"
          className={classes.input}
          type="password"
          placeholder="Create password"
        />
        <div className={classes.btnBox}>
          <Button innerTxt={"Register"} clickMe={registerHandler} />
          <Button innerTxt={"Return"} clickMe={closeModalHandler} />
        </div>
      </form>
    </div>
  );
};

export default Register;
