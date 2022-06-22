import classes from "./Login.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../Utilities/Button/Button";
import { toggleLogRegModalActions } from "../../features/toggleLogRegModal";
import { isLoggedInActions } from "../../features/isLoggedIn";
import { whatRoleActions } from "../../features/whatRole";
import { currentUserActions } from "../../features/currentUser";
import { isLoadingActions } from "../../features/loading";
import { errorActions } from "../../features/error";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();

  const closeModalHandler = (event) => {
    event.preventDefault();
    dispatch(toggleLogRegModalActions.setIsModal());
  };

  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [invalidRole, setInvalidRole] = useState(false);

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

  const logInHandler = async (event) => {
    event.preventDefault();

    dispatch(isLoadingActions.setIsLoading(true));

    let url;
    if (userInfo.role === "teacher") {
      url = "/api/login/teacher";
    } else if (userInfo.role === "student") {
      url = "/api/login/student";
    } else {
      setInvalidRole(true);
    }

    if (
      userInfo.email.includes("@") &&
      userInfo.email.length > 7 &&
      userInfo.password.length >= 6 &&
      invalidRole === false
    ) {
      await axios
        .post(url, userInfo)
        .then((serverRes) => {
          dispatch(isLoadingActions.setIsLoading(false));
          dispatch(currentUserActions.setCurrentUser(serverRes.data[0]));
          dispatch(whatRoleActions.setRole(serverRes.data[0].role));
          dispatch(isLoggedInActions.setIsLoggedIn());
        })
        .catch((err) => {
          dispatch(errorActions.setIsError(true));

          if (err.response.status === 404) {
            dispatch(errorActions.setMsg("Not Registered"));
          } else if (err.response.status === 401) {
            dispatch(errorActions.setMsg("Wrong Password"));
          } else {
            dispatch(errorActions.setMsg("Server error, try again."));
          }
        });
    } else {
      !userInfo.email.includes("@") && setEmailInvalid(true);
      userInfo.email.length <= 7 && setEmailInvalid(true);
      userInfo.password.length < 6 && setPasswordInvalid(true);
      userInfo.role === "" && setInvalidRole(true);
      dispatch(isLoadingActions.setIsLoading(false));
    }
  };

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
        {emailInvalid && <p className={classes.serverErr}>Enter valid email</p>}

        <input
          onChange={inputChangeHandler}
          value={userInfo.password}
          name="password"
          className={classes.input}
          type="password"
          placeholder="Password"
        />
        {passwordInvalid && (
          <p className={classes.serverErr}>
            Password must be at least 6 characters
          </p>
        )}

        <select
          className={classes.select}
          onChange={inputChangeHandler}
          name="role"
          value={userInfo.role}
        >
          <option className={classes.option} value="">
            Select
          </option>
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
          <Button innerTxt={"Login"} clickMe={logInHandler} />
          <Button innerTxt={"Return"} clickMe={closeModalHandler} />
        </div>
      </form>
    </div>
  );
};

export default Login;
