import React from "react";
import cleanly from "./Header/logo.png";
import "./Headers.scss";
const Header = () => {
  return (
    <header>
      <img src={cleanly} alt="" />
      <h2 className="header-phone">800-710-8420</h2>
    </header>
  );
};
export default Header;
