import { useSelector } from "react-redux";
import TeacherMain from "../TeacherMain/TeacherMain";
import StudentMain from "../StudentMain/StudentMain";
import React from "react";

const MainUser = () => {
  const whatRole = useSelector((state) => state.WhatRole.role);

  return (
    <React.Fragment>
      {whatRole === "Mentor" ? <TeacherMain /> : <StudentMain />}
    </React.Fragment>
  );
};

export default MainUser;
