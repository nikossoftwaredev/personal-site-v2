import React from "react";
import { HeaderAppBar } from "../styles/headerStyles";
import HeaderToolbar from "./HeaderToolbar";

const Header = () => {
  return (
    <HeaderAppBar position="sticky">
      <HeaderToolbar />
    </HeaderAppBar>
  );
};

export default Header;
