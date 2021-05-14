import { AppBar, makeStyles } from "@material-ui/core";
import React from "react";
import colors from "../styles/colors";
import HeaderToolbar from "./HeaderToolbar";

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: colors.black,
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
  },
}));

const Header = () => {
  const { header } = useStyles();

  return (
    <AppBar position="sticky" className={header}>
      <HeaderToolbar />
    </AppBar>
  );
};

export default Header;
