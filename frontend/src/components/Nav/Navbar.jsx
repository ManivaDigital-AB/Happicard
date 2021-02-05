import React from "react";
import { Nav } from "./Navbarstyles";
import Burger from "./Burger";
import logoImg from "../../assets/images/logo_yellow.PNG";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Nav>
        {/* <div className="logo">Nav Bar</div> */}
        <div className="logo">
          <Link to="/">
            <img className="logoImg" src={logoImg} />
          </Link>
        </div>
        <Burger />
      </Nav>
    </>
  );
};

export default Navbar;
