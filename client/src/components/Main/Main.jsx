import classes from "./Main.module.css";
import UserMainWelcome from "../Utilities/UserMainWelcome/UserMainWelcome";
import UserMainAside from "../Utilities/UserMainAside/UserMainAside";
import UserMainSection from "../Utilities/UserMainSection/UserMainSection";
import { useSelector } from "react-redux";
import SelectClass from "../SelectClass/SelectClass";
import SectionWrapper from "../SectionWrapper/sectionWrapper";
import AddAssignForm from "../AddAssignForm/AddAssignForm";
import ConfirmWindow from "../Utilities/ConfirmWindow/ConfirmWindow";
import Roster from "../Roster/Roster";
const Main = ({ socket }) => {
  const currentClass = useSelector((state) => state.CurrentClass.class);
  // TEST

  const showMain = useSelector((state) => state.Wrapper.main);
  const showAddClass = useSelector((state) => state.Wrapper.form);
  const showConfirm = useSelector((state) => state.Wrapper.confirm);
  const roster = useSelector((state) => state.Wrapper.roster);
  return (
    <main className={classes.main}>
      <div className={classes.div}>
        <UserMainWelcome />
        <div className={classes.divComp}>
          <UserMainAside socket={socket} />

          <SectionWrapper>
            {showMain && currentClass.className !== "" && (
              <UserMainSection socket={socket} />
            )}
            {currentClass.className === "" && <SelectClass />}
            {showAddClass && <AddAssignForm />}
            {showConfirm && <ConfirmWindow />}
            {roster && <Roster />}
          </SectionWrapper>
        </div>
      </div>
    </main>
  );
};

export default Main;
