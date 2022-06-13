import Button from "../Utilities/Button/Button";
import Link from "../Utilities/Link/Link";
import classes from "./Header.module.css";
import { darkModeActions } from "../../features/darkModeSlice";
import { useDispatch } from "react-redux";

const Header = ({ dark }) => {
  const dispatch = useDispatch();

  const toggleDarkHandler = () => {
    dispatch(darkModeActions.toggleDarkMode());
  };

  return (
    <header className={classes.header}>
      <h1 className={classes.h1}>PORTAL-ZONE</h1>
      <Link
        clickMe={toggleDarkHandler}
        innerTxt={dark ? "Light" : "Dark"}
        dark={dark}
      />
    </header>
  );
};

export default Header;
