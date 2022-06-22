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
  const wrapper = useSelector((state) => state.Wrapper);

  return (
    <main className={classes.main}>
      <div className={classes.div}>
        <UserMainWelcome />
        <div className={classes.divComp}>
          <UserMainAside socket={socket} />
          <SectionWrapper>
            {wrapper.main && currentClass.className !== "" && (
              <UserMainSection socket={socket} />
            )}
            {currentClass.className === "" && <SelectClass />}
            {wrapper.form && <AddAssignForm />}
            {wrapper.confirm && <ConfirmWindow />}
            {wrapper.roster && <Roster />}
          </SectionWrapper>
        </div>
      </div>
    </main>
  );
};

export default Main;
