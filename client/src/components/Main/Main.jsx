import classes from "./Main.module.css";
import { useDispatch, useSelector } from "react-redux";
import UserMainWelcome from "../Utilities/UserMainWelcome/UserMainWelcome";
import UserMainAside from "../Utilities/UserMainAside/UserMainAside";
import UserMainSection from "../Utilities/UserMainSection/UserMainSection";

const Main = () => {
  return (
    <main className={classes.main}>
      <div className={classes.div}>
        <UserMainWelcome />
        <div className={classes.divComp}>
          <UserMainAside />
          <UserMainSection />
        </div>
      </div>
    </main>
  );
};

export default Main;
