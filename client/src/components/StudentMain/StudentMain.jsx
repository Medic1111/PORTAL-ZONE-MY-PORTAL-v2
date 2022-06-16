import classes from "./StudentMain.module.css";
import { useDispatch, useSelector } from "react-redux";
import UserMainWelcome from "../Utilities/UserMainWelcome/UserMainWelcome";
import UserMainAside from "../Utilities/UserMainAside/UserMainAside";

const StudentMain = () => {
  return (
    <main className={classes.main}>
      <div className={classes.div}>
        <UserMainWelcome />
        <div className={classes.divComp}>
          <UserMainAside />

          <section className={classes.test}>SECTION SECTION SECTION</section>
        </div>
      </div>
    </main>
  );
};

export default StudentMain;
