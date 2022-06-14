import classes from "./Register.module.css";
import Button from "../Utilities/Button/Button";
import { useDispatch } from "react-redux";
import { toggleLogRegModalActions } from "../../features/toggleLogRegModal";
import { useState } from "react";
import axios from "axios";

const Register = ({ isTeacher }) => {
  const dispatch = useDispatch();

  const [fNnameInvalid, setFNameInvalid] = useState(false);
  const [lNameInvalid, setLNameInvalid] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [serverErr, setServerErr] = useState(false);

  const [userInfo, setUserInfo] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
  });

  const inputChangeHandler = (event) => {
    setEmailInvalid(false);
    setFNameInvalid(false);
    setPasswordInvalid(false);
    setLNameInvalid(false);
    const { name, value } = event.target;
    setUserInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const registerHandler = async (event) => {
    event.preventDefault();
    let url;
    isTeacher
      ? (url = "/api/register/teacher")
      : (url = "/api/register/student");

    if (
      userInfo.fName.length > 0 &&
      userInfo.lName.length > 0 &&
      userInfo.email.includes("@") &&
      userInfo.email.length > 7 &&
      userInfo.password.length >= 6
    ) {
      await axios
        .post(url, userInfo)
        .then((serverRes) => {
          if (serverRes.status === 200) {
            setAlreadyRegistered(false);
            setServerErr(false);
            // AUTO LOGIN: SHOW MAIN PAGE
          }
        })
        .catch((err) => {
          console.log(err.response.status);
          if (err.response.status === 409) {
            setAlreadyRegistered(true);
          } else {
            setServerErr(true);
          }
        });

      setUserInfo({
        fName: "",
        lName: "",
        email: "",
        password: "",
      });
    } else {
      userInfo.fName.length <= 0 && setFNameInvalid(true);
      userInfo.lName.length <= 0 && setLNameInvalid(true);
      !userInfo.email.includes("@") && setEmailInvalid(true);
      userInfo.email.length <= 7 && setEmailInvalid(true);
      userInfo.password.length < 6 && setPasswordInvalid(true);
    }
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
        {fNnameInvalid && <p>Please fill out all fields</p>}
        <input
          onChange={inputChangeHandler}
          value={userInfo.lName}
          name="lName"
          className={classes.input}
          type="text"
          placeholder="Last name"
        />
        {lNameInvalid && <p>Please fill out all fields</p>}

        <input
          onChange={inputChangeHandler}
          value={userInfo.email}
          name="email"
          className={classes.input}
          type="email"
          placeholder="Email"
        />
        {emailInvalid && <p>Please enter a valid Email</p>}

        <input
          onChange={inputChangeHandler}
          value={userInfo.password}
          name="password"
          className={classes.input}
          type="password"
          placeholder="Create password"
        />
        {passwordInvalid && <p>Password must be at least 6 characters long</p>}

        <div className={classes.btnBox}>
          {alreadyRegistered && <p>USER ALREADY REGISTERED, PLEASE LOG IN</p>}
          {serverErr && <p>Something went wrong, please try again!</p>}

          <Button innerTxt={"Register"} clickMe={registerHandler} />
          <Button innerTxt={"Return"} clickMe={closeModalHandler} />
        </div>
      </form>
    </div>
  );
};

export default Register;
