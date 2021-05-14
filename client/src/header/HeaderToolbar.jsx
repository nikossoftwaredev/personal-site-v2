import React from "react";
import { Toolbar, makeStyles, Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getApiResource } from "../redux/slices/apiSlice";
import { HeaderButton } from "../styles/headerStyles";

const defaultToolbarOptions = [
  { text: "Projects", path: "/projects" },
  { text: "Todos", path: "/todos" },
];
const userToolbarOptions = [
  ...defaultToolbarOptions,
  { text: "Logout", path: "/logout" },
];

const guestToolbarOptions = [
  ...defaultToolbarOptions,
  { text: "Login", path: "/login" },
  { text: "Register", path: "/register" },
];

const useStyles = makeStyles(() => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "align-right",
  },
}));

const renderOptions = (currentUser) =>
  currentUser ? userToolbarOptions : guestToolbarOptions;

const HeaderToolbar = () => {
  const { toolbar } = useStyles();
  const location = useLocation();
  const currentUser = useSelector((state) =>
    getApiResource(state, "authenticate")
  )?.data;

  return (
    <Toolbar className={toolbar}>
      <span style={{ marginRight: "auto" }}>
        <Link to="/">
          <img width="50px" height="50px" alt="Logo" src="/logo.png"></img>
        </Link>
      </span>
      {renderOptions(currentUser).map((headerButton, idx) => (
        <HeaderButton
          key={idx}
          to={headerButton.path}
          component={Link}
          active={+(location.pathname === headerButton.path)}
        >
          {headerButton.text}
        </HeaderButton>
      ))}
      {currentUser && (
        <>
          {currentUser.username}
          <Avatar
            style={{ display: "inline-flex", width: "50px", height: "50px" }}
            alt={currentUser.name}
            src={currentUser.name}
          />
        </>
      )}
    </Toolbar>
  );
};

export default HeaderToolbar;
