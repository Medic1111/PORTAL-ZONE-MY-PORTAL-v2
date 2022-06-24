import Link from "../Utilities/Link/Link";
import classes from "./Header.module.css";
import { darkModeActions } from "../../features/darkModeSlice";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const dark = useSelector((state) => state.DarkMode.isDarkMode);

  const toggleDarkHandler = () => {
    dispatch(darkModeActions.toggleDarkMode());
  };

  return (
    <header className={classes.header}>
      <h1 className={dark ? `${classes.darkH1}` : `${classes.lightH1}`}>
        PORTAL-ZONE
      </h1>
      <Link
        clickMe={toggleDarkHandler}
        innerTxt={dark ? "Light" : "Dark"}
        dark={dark}
      />
    </header>
  );
};

export default Header;
