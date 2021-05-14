import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { apiGET } from "../redux/slices/apiSlice";

const LogoutPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(apiGET("logout")).then(() => dispatch(apiGET("authenticate")));
  }, [dispatch]);

  return <div>Logout page</div>;
};

export default LogoutPage;
