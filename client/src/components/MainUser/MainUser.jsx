import classes from "./MainUser.module.css";
import { useSelector, useDispatch } from "react-redux";
import { isLoggedInActions } from "../../features/isLoggedIn";
import Button from "../Utilities/Button/Button";

const MainUser = () => {
  const dispatch = useDispatch();

  const logOutHandler = () => {
    dispatch(isLoggedInActions.setIsLoggedIn());
    console.log("logging out");
  };
  return (
    <main className={classes.main}>
      <h1>MAIN- WELCOME</h1>
      <Button clickMe={logOutHandler} innerTxt={"Log Out"} />
    </main>
  );
};

export default MainUser;
