import classes from "./MainSecCompTwo.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { currentClassActions } from "../../../features/currentClass";
import axios from "axios";

const MainSecCompTwo = ({ socket }) => {
  const currentClass = useSelector((state) => state.CurrentClass.class);
  const dispatch = useDispatch();

  // THIS EFFECT UPDATES ASSIGNEMTNS
  useEffect(() => {
    axios
      .get(`/api/classes/${currentClass._id}`)
      .then((serverRes) => {
        console.log("UPDATING CLASS");
        dispatch(currentClassActions.setCurrentClass(serverRes.data));
      })
      .catch((err) => console.log(err));
    //
  }, [dispatch, JSON.stringify(currentClass)]);

  // DELETE ASSIGNMENT HANDLER

  const deleteAssignmentHandler = () => {
    console.log("CREATE ASSIGNMENT ITEM COMPONENT AND PASS ITEM AS PROPS");
  };

  return (
    <article className={classes.article}>
      <p className={classes.p2}>Assignments:</p>
      <ul className={classes.ul}>
        {currentClass.assignments.map((item, index) => {
          return (
            <li key={index} className={classes.li}>
              <p className={classes.listItemP}>{item}</p>
              <span
                name={item}
                onClick={deleteAssignmentHandler}
                className={classes.span}
              >
                ✖️
              </span>
            </li>
          );
        })}
      </ul>
    </article>
  );
};

export default MainSecCompTwo;
