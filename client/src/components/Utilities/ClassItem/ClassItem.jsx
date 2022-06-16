import classes from "./ClassItem.module.css";

const ClassItem = ({ obj }) => {
  const showClassHandler = () => {
    console.log(obj);
  };

  return (
    <li className={classes.li} obj={obj} onClick={showClassHandler}>
      {obj.name}
    </li>
  );
};

export default ClassItem;
