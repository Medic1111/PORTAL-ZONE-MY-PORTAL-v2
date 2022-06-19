import { useSelector, useDispatch } from "react-redux";
import Main from "../Main/Main";

import { currentUserActions } from "../../features/currentUser";
import React from "react";
import axios from "axios";
import { useEffect } from "react";

const MainUser = () => {
  const dispatch = useDispatch();
  const whatRole = useSelector((state) => state.WhatRole.role);
  const user = useSelector((state) => state.CurrentUser.user);
  const classCount = useSelector((state) => state.GetClassCount.count);

  let url;
  whatRole === "Mentor"
    ? (url = `/api/teacher/${user._id}/classes`)
    : (url = `/api/student/${user._id}/classes`);

  let fetchAllClasses = () => {
    axios
      .get(url)
      .then((serverRes) => {
        dispatch(currentUserActions.addNewClass(serverRes.data));
      })
      .catch((err) => console.log(err));
  };

  useEffect(fetchAllClasses, [classCount]);

  return <Main />;
};

export default MainUser;
