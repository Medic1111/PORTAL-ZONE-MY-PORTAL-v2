import classes from "../Login/Login.module.css";
import Button from "../Utilities/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogRegModalActions } from "../../features/toggleLogRegModal";
import { isLoggedInActions } from "../../features/isLoggedIn";
import { whatRoleActions } from "../../features/whatRole";
import { currentUserActions } from "../../features/currentUser";
import { isLoadingActions } from "../../features/loading";
import { errorActions } from "../../features/error";
import { useState } from "react";

import axios from "axios";

const Register = ({ isTeacher }) => {
  const dispatch = useDispatch();
  const dark = useSelector((state) => state.DarkMode.isDarkMode);

  const [fNnameInvalid, setFNameInvalid] = useState(false);
  const [lNameInvalid, setLNameInvalid] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);

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
    dispatch(isLoadingActions.setIsLoading(true));

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
          dispatch(currentUserActions.setCurrentUser(serverRes.data));
          dispatch(isLoadingActions.setIsLoading(false));
          dispatch(whatRoleActions.setRole(serverRes.data.role));
          dispatch(isLoggedInActions.setIsLoggedIn());
        })

        .catch((err) => {
          dispatch(errorActions.setIsError(true));
          if (err.response.status === 409) {
            dispatch(errorActions.setMsg("Email already Registered"));
          } else {
            dispatch(errorActions.setMsg("Server error, please try again"));
          }
        });
    } else {
      dispatch(isLoadingActions.setIsLoading(false));

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
        <h2 className={dark ? `${classes.darkH2}` : `${classes.lightH2}`}>
          Register as a {isTeacher ? "Mentor" : "Learner"}
        </h2>
        <input
          onChange={inputChangeHandler}
          value={userInfo.fName}
          name="fName"
          className={dark ? `${classes.darkInput}` : `${classes.lightInput}`}
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
          className={dark ? `${classes.darkInput}` : `${classes.lightInput}`}
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
          className={dark ? `${classes.darkInput}` : `${classes.lightInput}`}
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
          className={dark ? `${classes.darkInput}` : `${classes.lightInput}`}
          type="password"
          placeholder="Create password"
        />
        {passwordInvalid && (
          <p className={classes.serverErr}>
            Password must be at least 6 characters long
          </p>
        )}

        <div className={classes.btnBox}>
          <Button innerTxt={"Register"} clickMe={registerHandler} />
          <Button innerTxt={"Return"} clickMe={closeModalHandler} />
        </div>
      </form>
    </div>
  );
};

export default Register;
