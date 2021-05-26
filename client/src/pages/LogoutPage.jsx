import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { apiGET } from "../redux/slices/apiSlice";

const LogoutPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(apiGET({ path: "logout" })).then(() =>
      dispatch(apiGET({ path: "authenticate" })).then(() =>
        history.push("/login")
      )
    );
  }, [dispatch, history]);

  return <div>Logout Page</div>;
};

export default LogoutPage;
