import classes from "./Register.module.css";
import Button from "../Utilities/Button/Button";
import Loading from "../Utilities/Loading/Loading";
import { useDispatch } from "react-redux";
import { toggleLogRegModalActions } from "../../features/toggleLogRegModal";
import { isLoggedInActions } from "../../features/isLoggedIn";
import { whatRoleActions } from "../../features/whatRole";
import { currentUserActions } from "../../features/currentUser";

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
  const [isLoading, setIsLoading] = useState(false);

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

  const registerHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);

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
      axios
        .post(url, userInfo)
        .then((serverRes) => {
          console.log(serverRes.data);
          dispatch(currentUserActions.setCurrentUser(serverRes.data));
          setIsLoading(false);
          setAlreadyRegistered(false);
          setServerErr(false);
          // AUTO LOGIN: SHOW MAIN PAGE/ SENDS WHETHER MENTOR OR STUDENT
          dispatch(whatRoleActions.setRole(serverRes.data.role));
          dispatch(isLoggedInActions.setIsLoggedIn());
        })

        .catch((err) => {
          // err && console.log(err);
          if (err.response.status === 409) {
            setAlreadyRegistered(true);
          } else {
            setServerErr(true);
          }
          setIsLoading(false);
        });

      setUserInfo({
        fName: "",
        lName: "",
        email: "",
        password: "",
      });
    } else {
      setIsLoading(false);

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
  {
    if (!isLoading) {
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
            {fNnameInvalid && (
              <p className={classes.serverErr}>Please fill out all fields</p>
            )}
            <input
              onChange={inputChangeHandler}
              value={userInfo.lName}
              name="lName"
              className={classes.input}
              type="text"
              placeholder="Last name"
            />
            {lNameInvalid && (
              <p className={classes.serverErr}>Please fill out all fields</p>
            )}

            <input
              onChange={inputChangeHandler}
              value={userInfo.email}
              name="email"
              className={classes.input}
              type="email"
              placeholder="Email"
            />
            {emailInvalid && (
              <p className={classes.serverErr}>Please enter a valid Email</p>
            )}

            <input
              onChange={inputChangeHandler}
              value={userInfo.password}
              name="password"
              className={classes.input}
              type="password"
              placeholder="Create password"
            />
            {passwordInvalid && (
              <p className={classes.serverErr}>
                Password must be at least 6 characters long
              </p>
            )}

            <div className={classes.btnBox}>
              {alreadyRegistered && (
                <p className={classes.serverErr}>
                  USER ALREADY REGISTERED, PLEASE LOG IN
                </p>
              )}
              {serverErr && (
                <p className={classes.serverErr}>
                  Something went wrong, please try again!
                </p>
              )}

              <Button innerTxt={"Register"} clickMe={registerHandler} />
              <Button innerTxt={"Return"} clickMe={closeModalHandler} />
            </div>
          </form>
        </div>
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

export default Register;
