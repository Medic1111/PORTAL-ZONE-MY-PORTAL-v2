import classes from "./Login.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../Utilities/Button/Button";
import Loading from "../Utilities/Loading/Loading";
import { toggleLogRegModalActions } from "../../features/toggleLogRegModal";
import { isLoggedInActions } from "../../features/isLoggedIn";

import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();

  const closeModalHandler = (event) => {
    event.preventDefault();
    dispatch(toggleLogRegModalActions.setIsModal());
  };

  const [notRegistered, setNotRegistered] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [invalidRole, setInvalidRole] = useState(false);
  const [serverErr, setServerErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    role: "",
  });

  const inputChangeHandler = (event) => {
    setEmailInvalid(false);
    setPasswordInvalid(false);
    setInvalidRole(false);

    const { name, value } = event.target;
    setUserInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const logInHandler = (event) => {
    event.preventDefault();

    setIsLoading(true);

    let url;
    if (userInfo.role === "teacher") {
      url = "/api/login/teacher";
      console.log("student");
    } else if (userInfo.role === "student") {
      url = "/api/login/student";
      console.log("teacher");
    } else {
      setInvalidRole(true);
      console.log("invalid");
    }

    if (
      userInfo.email.includes("@") &&
      userInfo.email.length > 7 &&
      userInfo.password.length >= 6 &&
      invalidRole === false
    ) {
      axios
        .post(url, userInfo)
        .then((serverRes) => {
          setIsLoading(false);
          if (serverRes.status === 200) {
            console.log(serverRes.data);
            setNotRegistered(false);
            setServerErr(false);

            // AUTO LOGIN: SHOW MAIN PAGE
            dispatch(isLoggedInActions.setIsLoggedIn());
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          if (err.response.status === 404) {
            setNotRegistered(true);
          } else if (err.response.status === 401) {
            setPasswordInvalid(true);
          } else {
            setServerErr(true);
          }
        });

      setUserInfo({
        email: "",
        password: "",
        role: "",
      });
    } else {
      setIsLoading(false);
      !userInfo.email.includes("@") && setEmailInvalid(true);
      userInfo.email.length <= 7 && setEmailInvalid(true);
      userInfo.password.length < 6 && setPasswordInvalid(true);
      userInfo.role === "" && setInvalidRole(true);
    }
  };

  {
    if (!isLoading) {
      return (
        <div className={classes.div}>
          <form className={classes.form}>
            <h2 className={classes.h2}>Log In</h2>

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
            <select
              className={classes.select}
              onChange={inputChangeHandler}
              name="role"
              value={userInfo.role}
            >
              <option className={classes.option} value="teacher">
                Mentoring
              </option>
              <option className={classes.option} value="student">
                Learning
              </option>
            </select>
            {invalidRole && (
              <p className={classes.serverErr}>Please choose an option</p>
            )}

            <div className={classes.btnBox}>
              {notRegistered && (
                <p className={classes.serverErr}>
                  USER NOT REGISTERED, PLEASE REGISTER
                </p>
              )}
              {serverErr && (
                <p className={classes.serverErr}>
                  Something went wrong, please try again!
                </p>
              )}

              <Button innerTxt={"Login"} clickMe={logInHandler} />
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

export default Login;
