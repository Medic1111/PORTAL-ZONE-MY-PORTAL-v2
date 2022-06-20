import classes from "./Main.module.css";
import UserMainWelcome from "../Utilities/UserMainWelcome/UserMainWelcome";
import UserMainAside from "../Utilities/UserMainAside/UserMainAside";
import UserMainSection from "../Utilities/UserMainSection/UserMainSection";

const Main = ({ socket }) => {
  return (
    <main className={classes.main}>
      <div className={classes.div}>
        <UserMainWelcome />
        <div className={classes.divComp}>
          <UserMainAside />
          <UserMainSection socket={socket} />
        </div>
      </div>
    </main>
  );
};

export default Main;
