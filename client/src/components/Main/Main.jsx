import classes from "./Main.module.css";
import UserMainWelcome from "../Utilities/UserMainWelcome/UserMainWelcome";
import UserMainAside from "../Utilities/UserMainAside/UserMainAside";
import UserMainSection from "../Utilities/UserMainSection/UserMainSection";
import { useSelector } from "react-redux";
import SelectClass from "../SelectClass/SelectClass";

const Main = ({ socket }) => {
  const currentClass = useSelector((state) => state.CurrentClass.class);

  return (
    <main className={classes.main}>
      <div className={classes.div}>
        <UserMainWelcome />
        <div className={classes.divComp}>
          <UserMainAside socket={socket} />
          {currentClass.className !== "" ? (
            <UserMainSection socket={socket} />
          ) : (
            <SelectClass />
          )}
        </div>
      </div>
    </main>
  );
};

export default Main;
