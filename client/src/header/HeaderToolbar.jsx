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
    justifyContent: "space-between",
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
      <Link to="/">
        <img width="50px" height="50px" alt="Logo" src="/logo.png"></img>
      </Link>
      <div>
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
          <span>
            {currentUser.username}{" "}
            <Avatar alt={currentUser.name} src={currentUser.name} />
          </span>
        )}
      </div>
    </Toolbar>
  );
};

export default HeaderToolbar;
