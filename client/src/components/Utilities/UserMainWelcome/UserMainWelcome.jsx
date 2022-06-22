import classes from "./UserMainWelcome.module.css";
import Button from "../Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { isLoggedInActions } from "../../../features/isLoggedIn";
import { currentClassActions } from "../../../features/currentClass";
import { currentUserActions } from "../../../features/currentUser";
import { wrapperActions } from "../../../features/wrapper";
const UserMainWelcome = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.CurrentUser.user);

  const logOutHandler = () => {
    dispatch(currentClassActions.clearClass());
    dispatch(currentUserActions.clearCurrentUser());
    dispatch(isLoggedInActions.setIsLoggedIn());
    dispatch(wrapperActions.setInitial());
  };

  return (
    <article className={classes.article}>
      <h3 className={classes.h3}>WELCOME {user.fName}</h3>
      <Button clickMe={logOutHandler} innerTxt={"Log Out"} />
    </article>
  );
};

export default UserMainWelcome;
