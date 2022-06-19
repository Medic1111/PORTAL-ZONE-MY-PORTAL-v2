import classes from "./Main.module.css";
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
