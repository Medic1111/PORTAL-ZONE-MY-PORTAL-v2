import Button from "../Utilities/Button/Button";
import Link from "../Utilities/Link/Link";
import classes from "./Hero.module.css";
import { useDispatch } from "react-redux";
import { toggleLogRegModalActions } from "../../features/toggleLogRegModal";
import { isRegisteringActions } from "../../features/isRegistering";
import { isTeacherActions } from "../../features/isTeacher";

const Hero = () => {
  const dispatch = useDispatch();

  const registerMentorHandler = () => {
    dispatch(toggleLogRegModalActions.setIsModal());
    dispatch(isRegisteringActions.setIsRegistering(true));
    dispatch(isTeacherActions.setIsTeacher(true));
  };

  const registerStudentHandler = () => {
    dispatch(toggleLogRegModalActions.setIsModal());
    dispatch(isTeacherActions.setIsTeacher(false));
    dispatch(isRegisteringActions.setIsRegistering(true));
  };

  const directToLogInHandler = () => {
    dispatch(toggleLogRegModalActions.setIsModal());
    dispatch(isRegisteringActions.setIsRegistering(false));
  };

  return (
    <article className={classes.article}>
      <div className={classes.div}>
        <div className={classes.txtBox}>
          <h2 className={classes.h2}>Welcome!</h2>
          <p className={classes.mainP}>
            Portal zone is your platform to engage into mentoring and learning.
            A one place solution for direct communition between those who are
            willing to teach and those who are willing to learn!
          </p>
        </div>
        <div className={classes.btnBox}>
          <p className={classes.identifierP}>I am...</p>
          <Button innerTxt={"Mentoring"} clickMe={registerMentorHandler} />
          <p className={classes.identifierP}>I am...</p>
          <Button innerTxt={"Learning"} clickMe={registerStudentHandler} />
          <div className={classes.padLink}>
            <Link
              innerTxt={"Already registered? Log in"}
              clickMe={directToLogInHandler}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default Hero;
