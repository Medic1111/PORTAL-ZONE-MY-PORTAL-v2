import classes from "./Link.module.css";

const Link = ({ dark, clickMe, innerTxt }) => {
  return (
    <h3
      className={dark ? `${classes.dark}` : `${classes.link}`}
      onClick={clickMe}
    >
      {innerTxt}
    </h3>
  );
};

export default Link;
