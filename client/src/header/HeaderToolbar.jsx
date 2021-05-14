import { Toolbar, Typography, makeStyles, Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const headerButtons = [
  { text: "Log in", path: "/login" },
  { text: "Register", path: "/register" },
  { text: "Projects", path: "/projects" },
  { text: "Todos", path: "/todos" },
];

const HeaderToolbar = () => {
  const { toolbar } = useStyles();

  return (
    <Toolbar className={toolbar}>
      <Link to="/">
        <Typography>Logo</Typography>
      </Link>
      <div>
        {headerButtons.map((headerButton, idx) => (
          <Button
            {...{
              key: idx,
              color: "inherit",
              to: headerButton.path,
              component: Link,
              className: "",
            }}
          >
            {headerButton.text}
          </Button>
        ))}
      </div>
    </Toolbar>
  );
};

export default HeaderToolbar;
