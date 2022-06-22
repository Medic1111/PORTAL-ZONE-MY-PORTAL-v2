import { useSelector, useDispatch } from "react-redux";
import Main from "../Main/Main";
import { currentUserActions } from "../../features/currentUser";
import React from "react";
import axios from "axios";
import { useEffect } from "react";
import Loading from "../Utilities/Loading/Loading";

const MainUser = ({ socket }) => {
  const dispatch = useDispatch();
  const whatRole = useSelector((state) => state.WhatRole.role);
  const user = useSelector((state) => state.CurrentUser.user);
  const isLoading = useSelector((state) => state.IsLoading.loading);
  let url;
  whatRole === "Mentor"
    ? (url = `/api/teacher/${user._id}/classes`)
    : (url = `/api/student/${user._id}/classes`);

  let fetchAllClasses = () => {
    axios
      .get(url)
      .then((serverRes) => {
        dispatch(currentUserActions.insertAllClasses(serverRes.data));
      })
      .catch((err) => console.log(err));
  };

  useEffect(fetchAllClasses, [dispatch]);

  return !isLoading ? <Main socket={socket} /> : <Loading />;
};

export default MainUser;
