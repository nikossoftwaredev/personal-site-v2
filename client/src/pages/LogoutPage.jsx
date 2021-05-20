import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { apiGET } from "../redux/slices/apiSlice";

const LogoutPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(apiGET("logout")).then(() => dispatch(apiGET("authenticate")));
  }, [dispatch]);

  return (
    <div>
      <Redirect to="/login" />
    </div>
  );
};

export default LogoutPage;
