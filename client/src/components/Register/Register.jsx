import classes from "./Register.module.css";
import Button from "../Utilities/Button/Button";
import { useDispatch } from "react-redux";
import { toggleLogRegModalActions } from "../../features/toggleLogRegModal";

const Register = ({ isTeacher }) => {
  const dispatch = useDispatch();

  const registerHandler = (event) => {
    event.preventDefault();
    console.log("Registering");
  };

  const closeModalHandler = (event) => {
    event.preventDefault();
    dispatch(toggleLogRegModalActions.setIsModal());
  };

  return (
    <div className={classes.div}>
      <form className={classes.form}>
        <h2 className={classes.h2}>
          Register as a {isTeacher ? "Mentor" : "Learner"}
        </h2>
        <input className={classes.input} type="text" placeholder="First name" />
        <input className={classes.input} type="text" placeholder="Last name" />
        <input className={classes.input} type="email" placeholder="Email" />
        <input
          className={classes.input}
          type="password"
          placeholder="Create password"
        />
        <div className={classes.btnBox}>
          <Button innerTxt={"Register"} clickMe={registerHandler} />
          <Button innerTxt={"Return"} clickMe={closeModalHandler} />
        </div>
      </form>
    </div>
  );
};

export default Register;
