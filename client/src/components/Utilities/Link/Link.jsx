import classes from "./Link.module.css";

const Link = ({ dark, clickMe, innerTxt }) => {
  return (
    <p
      className={dark ? `${classes.dark}` : `${classes.link}`}
      onClick={clickMe}
    >
      {innerTxt}
    </p>
  );
};

export default Link;
