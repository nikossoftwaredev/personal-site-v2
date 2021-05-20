import React from "react";
import { Toolbar, makeStyles, Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getApiResource } from "../redux/slices/apiSlice";
import { HeaderButton } from "../styles/headerStyles";
import { Space } from "antd";
import { AvatarGenerator } from "random-avatar-generator";
import colors from "../styles/colors";

const generator = new AvatarGenerator();

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
  { text: "Log in", path: "/login" },
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
  currentUser._id ? userToolbarOptions : guestToolbarOptions;

const HeaderToolbar = () => {
  const { toolbar } = useStyles();
  const location = useLocation();
  const currentUser = useSelector((state) =>
    getApiResource(state, "authenticate")
  );

  return (
    <Toolbar className={toolbar}>
      <span style={{ marginRight: "auto" }}>
        <Link to="/">
          <img
            width="50px"
            height="50px"
            alt="Logo"
            src="images/logo.png"
          ></img>
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
      {currentUser._id && (
        <Space style={{ color: colors.blue }}>
          {currentUser.username.toUpperCase()}
          <Avatar
            style={{ display: "inline-flex", width: "50px", height: "50px" }}
            alt={currentUser.name}
            src={generator.generateRandomAvatar()}
          />
        </Space>
      )}
    </Toolbar>
  );
};

export default HeaderToolbar;
