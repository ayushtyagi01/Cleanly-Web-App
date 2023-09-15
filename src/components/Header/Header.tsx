import React from "react";
import cleanly from "./logo.png";
import { useNavigate } from "react-router-dom";
import "./Header.scss";
const Header = (props: any) => {
  const navigate = useNavigate();
  const handleMyBooking = () => {
    navigate("/my-booking");
  };
  return (
    <div className="header">
      <div className="img-container">
        <img src={cleanly} alt="" />
      </div>
      <div className="btn-container">
        <button className="header-btn" onClick={handleMyBooking}>
          MyBooking
        </button>
        <button className="header-btn" onClick={props.signOut}>
          SignOut
        </button>
      </div>
    </div>
  );
};
export default Header;
