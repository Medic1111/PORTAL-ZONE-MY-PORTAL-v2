import classes from "./MainSecFirstComp.module.css";
import Link from "../Link/Link";
import { useSelector } from "react-redux";
import React from "react";

const MainSecFirstComp = () => {
  const currentClass = useSelector((state) => state.CurrentClass.class);
  const role = useSelector((state) => state.WhatRole.role);

  return (
    <div className={classes.div}>
      <h4 className={classes.h4}>{currentClass.className}</h4>
      {role === "Mentor" ? (
        <p className={classes.pKey}>Key: {currentClass.secretKey}</p>
      ) : (
        <p className={classes.p}>Grade: C</p>
      )}
      {role === "Mentor" && (
        <select className={classes.select}>
          <option className={classes.option}>Roster</option>
          {currentClass.roster.map((obj, index) => {
            return (
              <option key={`ROSTER_${index}`} className={classes.option}>
                {obj.fName} {obj.lName}
              </option>
            );
          })}
        </select>
      )}
      {role === "Student" && currentClass.whoTeach && (
        <React.Fragment>
          <p className={classes.p}>Mentor: {currentClass.whoTeach.lName}</p>
          <p className={classes.p}>Email: {currentClass.whoTeach.email}</p>
        </React.Fragment>
      )}
      <Link innerTxt={"Chat"} />
    </div>
  );
};

export default MainSecFirstComp;
