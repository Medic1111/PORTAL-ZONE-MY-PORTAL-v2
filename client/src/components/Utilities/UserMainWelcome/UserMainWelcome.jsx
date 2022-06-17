import classes from "./UserMainWelcome.module.css";
import Button from "../Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { isLoggedInActions } from "../../../features/isLoggedIn";
import axios from "axios";

const UserMainWelcome = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.CurrentUser.user);

  const logOutHandler = () => {
    axios
      .post("/api/teacher/update", user)
      .then((serverRes) => {
        dispatch(isLoggedInActions.setIsLoggedIn());
      })
      .catch((err) => console.log(err));
  };

  // FIGURE OUT STUDENT UPDATE

  return (
    <article className={classes.article}>
      <h3 className={classes.h3}>WELCOME {user.fName}</h3>
      <Button clickMe={logOutHandler} innerTxt={"Log Out"} />
    </article>
  );
};

export default UserMainWelcome;
