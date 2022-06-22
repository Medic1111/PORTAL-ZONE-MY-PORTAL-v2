import classes from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={classes.flexParent}>
      <div className={classes.spinner}></div>
    </div>
  );
};

export default Loading;
