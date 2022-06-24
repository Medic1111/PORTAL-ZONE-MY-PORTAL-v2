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
  const dark = useSelector((state) => state.DarkMode.isDarkMode);

  const logOutHandler = () => {
    dispatch(currentClassActions.clearClass());
    dispatch(currentUserActions.clearCurrentUser());
    dispatch(isLoggedInActions.setIsLoggedIn());
    dispatch(wrapperActions.setInitial());
  };

  return (
    <article className={classes.article}>
      <h3 className={dark ? `${classes.darkH2}` : `${classes.lightH2}`}>
        WELCOME {user.fName}
      </h3>
      <Button clickMe={logOutHandler} innerTxt={"Log Out"} />
    </article>
  );
};

export default UserMainWelcome;
