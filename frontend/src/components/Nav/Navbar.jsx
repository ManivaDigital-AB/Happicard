import React from "react";
import { Nav } from "./Navbarstyles";
import Burger from "./Burger";
import logoImg from "../../assets/images/logo.PNG";

const Navbar = () => {
  return (
    <Nav>
      {/* <div className="logo">Nav Bar</div> */}
      <div>
        <img src={logoImg} className="logo"></img>
      </div>
      <Burger />
    </Nav>
  );
};

export default Navbar;
