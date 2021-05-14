import { Toolbar, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getApiResource } from "../redux/slices/apiSlice";
import { HeaderButton } from "../styles/headerStyles";

const useStyles = makeStyles(() => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const HeaderToolbar = () => {
  const { toolbar } = useStyles();
  const location = useLocation();

  const currentUser = useSelector((state) =>
    getApiResource(state, "authenticate")
  )?.data;

  const headerButtons = [
    { text: "Projects", path: "/projects" },
    { text: "Todos", path: "/todos" },
    {
      text: currentUser ? "Log out" : "Log in",
      path: currentUser ? "/logout" : "/login",
    },
    !currentUser && { text: "Register", path: "/register" },
  ];

  return (
    <Toolbar className={toolbar}>
      <Link to="/">
        <img width="50px" height="50px" alt="Logo" src="/logo.png"></img>
      </Link>
      <div>
        {headerButtons.map((headerButton, idx) => (
          <HeaderButton
            key={idx}
            to={headerButton.path}
            component={Link}
            active={+(location.pathname === headerButton.path)}
          >
            {headerButton.text}
          </HeaderButton>
        ))}
        {currentUser && <Typography>{currentUser.username}</Typography>}
      </div>
    </Toolbar>
  );
};

export default HeaderToolbar;
