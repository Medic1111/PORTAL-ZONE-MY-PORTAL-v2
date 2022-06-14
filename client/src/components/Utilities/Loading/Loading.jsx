import classes from "./Loading.module.css";

const Loading = () => {
  return (
    <div className="flexParent">
      <div className={classes.spinner}></div>
    </div>
  );
};

export default Loading;
