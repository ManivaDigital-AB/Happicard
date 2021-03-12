import React, { useState } from "react";
import styled from "styled-components";
import cartImg from "../../assets/images/cart.PNG";
import searchImg from "../../assets/images/search.PNG";
import facebookMobileImg from "../../assets/images/facebook_mobile_01.PNG";
import instagramMobileImg from "../../assets/images/instagram_mobile_02.PNG";
import linkedinMobileImg from "../../assets/images/linkedin_mobile_01.PNG";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  padding-top: 10px;
  padding-left: 425px;

  li {
    padding: 18px 45px;
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
    // margin-top: 11px;
  }

  .dropdown-item {
    font-size: 16px;
  }

  .dropdown-toggle::after {
    content: "";
    border: 0;
  }
  .dropdown-menu.show {
    background-color: #ffc542;
    position: absolute;
    inset: 0px auto auto 0px;
    margin: 0px;
    transform: translate(0px, 56px);
    
    border: none;
    border-radius: 0;
  }

  .btn.focus,
  .btn:focus {
    outline: 0;
    box-shadow: none;
  }

  .btn,
  .btn:hover {
    text-decoration: none;
    color: #000;
    font-size: 16px;
    font-weight: bold;
    margin-top: 18px;
    padding-top: 0px;
    padding-bottom: 0px;
    margin-bottom: 18px;
    border-radius: 0px;
  }

  .dropdown-item {
    display: block;
    width: 100%;
    padding: 0.25rem 1rem;
    clear: both;
    color: #fff;
    text-align: inherit;
    white-space: nowrap;

    

    font-size: 18px;
    font-weight: bold;
    text-decoration: none;
    line-height: 22px;
  }
  a:hover,
  .dropdown-item:hover,
  .dropdown-item:active {
    color: #fff;
    background-color: transparent;
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
    font-size: 14px;
  }
  
`;

const PartnerDropDown = styled.div`
  padding-top: 10px;
  margin-left: 290px;
  .btn,
  .btn:hover {
    font-size: 14px;
    // margin-top: 11px;
  }

  .dropdown-item {
    font-size: 16px;
  }

  .dropdown-toggle::after {
    content: "";
    border: 0;
  }
  .dropdown-menu.show {
    background-color: #ffc542;
    position: absolute;
    inset: 0px auto auto 0px;
    margin: 0px;
    transform: translate(0px, 56px);
    border: none;
    border-radius: 0;
  }

  .btn.focus,
  .btn:focus {
    outline: 0;
    box-shadow: none;
  }

  .partner {
    background-color: #ffc542;
  }

  .btn,
  .btn:hover {
    text-decoration: none;
    color: #000;
    font-size: 16px;
    font-weight: bold;
    margin-top: 18px;
    padding-top: 0px;
    padding-bottom: 0px;
    margin-bottom: 18px;
    border-radius: 0px;
  }

  .dropdown-item {
    display: block;
    width: 100%;
    padding: 0.25rem 1rem;
    clear: both;
    
    text-align: inherit;
    white-space: nowrap;

    border: 0;

    font-size: 18px;
    font-weight: 600;
    text-decoration: none;
    line-height: 22px;

    a {
      text-decoration: none;
      color: #000;
      font-size: 14px;
    }
  }
  a:hover,
  .dropdown-item:hover,
  .dropdown-item:active {
    color: #fff;
    background-color: transparent;
  }
`;

const RightNav = ({ open }) => {
  const { register, handleSubmit, reset} = useForm();
  const [selectedMenu, setSelectedMenu] = useState("Home");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClick = (param) => {
    setSelectedMenu(param);
    if (param === "SignIn") { handleShow() ;} 
  };

  const onSubmit = async (data) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

   console.log(data);
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
      <PartnerDropDown>
        <Dropdown>
          <Dropdown.Toggle variant="" id="dropdown-basic" className="partner">
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
                to="/register"
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
      </PartnerDropDown>
      <div style={{ marginLeft: "15px" }}>
        <img
          src={searchImg}
          style={{
            width: "25px",
            height: "25px",
            marginTop: "28px",
            marginRight: "15px",
          }}
        />
        <img
          src={cartImg}
          style={{
            width: "25px",
            height: "25px",
            marginTop: "28px",
            marginRight: "10px",
          }}
        />
      </div>
      <Modal show={show} onHide={handleClose}>
        <div style={{ border: "4px solid #ffc542", borderRadius: "15px" }}>
          <Modal.Header
            closeButton
            style={{ backgroundColor: "#FFFF", border: "none" }}
          ></Modal.Header>
          <Modal.Body style={{ backgroundColor: "#FFFF", paddingTop: "50px", paddingBottom: "50px" }}>
          <form style={{textAlign: "center"}}>
          <div className="form-group col-sm-12">
            
            <input style={{ border: "2px solid #ffc542", borderRadius: "15px" }} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            
          </div>
          <div className="form-group col-sm-12">
            
            <input style={{ border: "2px solid #ffc542", borderRadius: "15px" }} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" style={{width:"200px", height:"25px", border:"none", backgroundColor:"#ffc542", outline:"none", borderRadius:"15px"}}>Submit</button>
        </form>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
};

export default RightNav;
