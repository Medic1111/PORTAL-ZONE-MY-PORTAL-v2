import classes from "./MainSecCompThree.module.css";
import Button from "../Button/Button";
import { useSelector } from "react-redux";

const MainSecCompThree = () => {
  const role = useSelector((state) => state.WhatRole.role);

  return (
    <section className={classes.section2}>
      {role === "Mentor" && <Button innerTxt={"Add Assigment"} />}
      {role === "Mentor" && <Button innerTxt={"Delete Class"} />}
      {role === "Student" && <Button innerTxt={"Un-enroll from Class"} />}
    </section>
  );
};

export default MainSecCompThree;
