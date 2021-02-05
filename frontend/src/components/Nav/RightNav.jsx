import React, { useState } from "react";
import styled from "styled-components";
import cartImg from "../../assets/images/cart.PNG";
import searchImg from "../../assets/images/search.PNG";
import facebookMobileImg from "../../assets/images/facebook_mobile_01.PNG";
import instagramMobileImg from "../../assets/images/instagram_mobile_02.PNG";
import linkedinMobileImg from "../../assets/images/linkedin_mobile_01.PNG";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;

  li {
    padding: 18px 10px;
  }

  .selected {
    color: #ffc542;
  }

  .unselected {
    color: #4a4746;
  }

  .onlyMobile {
    display: none;
  }

  .btn,
  .btn:hover {
    font-size: 14px;
    margin-top: 11px;
  }

  .dropdown-item {
    font-size: 14px;
  }

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #000;
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    height: 100vh;
    width: 200px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    z-index: 10;

    li {
      color: #fff;
      padding: 8px;
      font-size: 16px;
      text-align: right;
      margin-right: 25px;
    }

    .selected {
      color: #ffc541;
    }

    .onlyMobile {
      display: block;
    }

    .paddingTop {
      padding-top: 30px;
    }
  }
  a {
    text-decoration: none;
    color: #fff;
  }
  a:hover {
    color: #222;
  }
`;

const RightNav = ({ open }) => {
  const [selectedMenu, setSelectedMenu] = useState("Home");
  const handleClick = (param) => {
    setSelectedMenu(param);
  };
  return (
    <>
      <Ul
        open={open}
        style={{ fontFamily: "Helvetica Neue, Helvetica, sans-serif" }}
      >
        <li>
          <Link
            to="/"
            className={selectedMenu == "Home" ? "selected" : "unselected"}
            onClick={() => handleClick("Home")}
          >
            Hem
          </Link>
        </li>
        {/* <li
          className={selectedMenu == "Stores" ? "selected" : "unselected"}
          onClick={() => handleClick("Stores")}
        >
          Butiker
        </li>
        <li
          className={selectedMenu == "NGOs" ? "selected" : "unselected"}
          onClick={() => handleClick("NGOs")}
        >
          NGOs
        </li> */}
        {/* <Dropdown>
          <Dropdown.Toggle variant="" id="dropdown-basic">
            Gifting
          </Dropdown.Toggle>
          <Dropdown.Item>
            <Link
              to="/Stores"
              className={selectedMenu == "Stores" ? "selected" : "unselected"}
              onClick={() => handleClick("Stores")}
            >
              Stores
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link
              to="/Stores"
              className={selectedMenu == "NGOs" ? "selected" : "unselected"}
              onClick={() => handleClick("NGOs")}
            >
              NGOs
            </Link>
          </Dropdown.Item>
        </Dropdown> */}
        <Dropdown>
          <Dropdown.Toggle variant="" id="dropdown-basic">
            Gifting
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link
                to="/stores"
                className={selectedMenu == "Stores" ? "selected" : "unselected"}
                onClick={() => handleClick("Stores")}
              >
                Stores
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link
                to="/ngos"
                className={selectedMenu == "NGOs" ? "selected" : "unselected"}
                onClick={() => handleClick("NGOs")}
              >
                NGOs
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {/* <li
          className={selectedMenu == "Partners" ? "selected" : "unselected"}
          onClick={() => handleClick("Partners")}
        >
          Partners
        </li> */}
        <li>
          <Link
            to="/about"
            className={selectedMenu == "About" ? "selected" : "unselected"}
            onClick={() => handleClick("About")}
          >
            {" "}
            Om Oss
          </Link>
        </li>
        <Dropdown>
          <Dropdown.Toggle variant="" id="dropdown-basic">
            Partners
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link
                to="/SignIn"
                className={selectedMenu == "SignIn" ? "selected" : "unselected"}
                onClick={() => handleClick("SignIn")}
              >
                Sign In
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link
                to="/Register"
                className={
                  selectedMenu == "Register" ? "selected" : "unselected"
                }
                onClick={() => handleClick("Register")}
              >
                New Member
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <li className="onlyMobile paddingTop">Sign in/Sign up</li>
        <li className="onlyMobile">
          <img
            src={facebookMobileImg}
            style={{
              width: "25px",
              backgroundColor: "#fff",
              borderRadius: "27px",
              marginLeft: "10px",
            }}
          />
          <img
            src={instagramMobileImg}
            style={{
              width: "27px",
              backgroundColor: "#fff",
              borderRadius: "27px",
              marginLeft: "10px",
            }}
          />
          <img
            src={linkedinMobileImg}
            style={{
              width: "27px",
              backgroundColor: "#fff",
              borderRadius: "27px",
              marginLeft: "10px",
            }}
          />
        </li>
      </Ul>
      <div style={{ marginLeft: "15px", marginLeft: "100px" }}>
        <img
          src={cartImg}
          style={{
            width: "18px",
            height: "19px",
            marginTop: "18px",
            marginRight: "10px",
          }}
        />
        <img
          src={searchImg}
          style={{
            width: "18px",
            height: "19px",
            marginTop: "18px",
            marginRight: "15px",
          }}
        />
      </div>
    </>
  );
};

export default RightNav;
