import classes from "./Button.module.css";

const Button = ({ innerTxt, clickMe, dark }) => {
  return (
    <button
      className={dark ? `${classes.dark}` : `${classes.btn}`}
      onClick={clickMe}
    >
      {innerTxt}
    </button>
  );
};

export default Button;
