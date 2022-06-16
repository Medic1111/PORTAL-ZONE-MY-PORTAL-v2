import classes from "./TeacherMain.module.css";
import { useDispatch, useSelector } from "react-redux";
import UserMainWelcome from "../Utilities/UserMainWelcome/UserMainWelcome";
import UserMainAside from "../Utilities/UserMainAside/UserMainAside";

const TeacherMain = () => {
  return (
    <main className={classes.main}>
      <div className={classes.div}>
        <UserMainWelcome />
        <div className={classes.divComp}>
          <UserMainAside />

          {/* <section>SECTION</section> */}
        </div>
      </div>
    </main>
  );
};

export default TeacherMain;
