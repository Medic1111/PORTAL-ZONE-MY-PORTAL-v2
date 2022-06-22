import classes from "./MainSecCompTwo.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { currentClassActions } from "../../../features/currentClass";
import axios from "axios";

const MainSecCompTwo = () => {
  const currentClass = useSelector((state) => state.CurrentClass.class);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`/api/classes/${currentClass._id}`)
      .then((serverRes) => {
        dispatch(currentClassActions.setCurrentClass(serverRes.data));
      })
      .catch((err) => console.log(err));
    //
  }, [dispatch, JSON.stringify(currentClass)]);

  return (
    <article className={classes.article}>
      <p className={classes.p2}>Assignments:</p>
      <ul className={classes.ul}>
        {currentClass.assignments.map((item, index) => {
          return (
            <li key={index} className={classes.li}>
              {item}
            </li>
          );
        })}
      </ul>
    </article>
  );
};

export default MainSecCompTwo;
