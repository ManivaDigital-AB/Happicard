import React from "react";
import logoImg from "../../assets/images/logo-footer.PNG";
import "./footer.css";
import giftBoxImg from "../../assets/images/giftBox.PNG";
import Copyright from "../copyright/copyright";

const Footer = () => {
  return (
    <>
      <div className="row " style={{ backgroundColor: "#ffc541" }}>
        <footer
          className="my-md-5"
          style={{
            width: "100%",

            fontFamily: "Helvetica Neue, Helvetica, sans-serif",
            fontSize: "12px",
          }}
        >
          <div className="footerDesktop container">
            <div className="row">
              <div className="col-12 col-md-3" style={{ marginLeft: "75px" }}>
                <img
                  className="mb-2"
                  src={logoImg}
                  alt=""
                  width="100px"
                  height="25px"
                  style={{ marginLeft: "6px" }}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  style={{
                    borderRadius: "30px",
                    height: "28px",
                    width: "185px",
                    borderColor: "white",
                    backgroundColor: "rgb(251, 204, 81)",
                    borderWidth: "2px",
                    fontSize: "12px",
                  }}
                />
                <button
                  style={{
                    marginTop: "10px",
                    borderColor: "white",
                    borderWidth: "thin",
                    marginTop: "10px",
                    borderRadius: "30px",
                    width: "84px",
                    backgroundColor: "#fff",
                    outline: "none",
                  }}
                >
                  subscribe
                </button>
              </div>
              <div className="col-6 col-md-2">
                <h7 style={{ fontWeight: "bold", marginLeft: "26px" }}>
                  Browse
                </h7>
                <ul className="text-small" style={{ paddingTop: "5px" }}>
                  <li style={{ marginBottom: "5px", color: "#118678" }}>
                    <span style={{ color: "black" }}>
                      <a className="text-muted" href="#">
                        Home
                      </a>
                    </span>
                  </li>
                  <li style={{ marginBottom: "5px", color: "#118678" }}>
                    <span style={{ color: "black" }}>
                      <a className="text-muted" href="#">
                        How it Works
                      </a>
                    </span>
                  </li>
                  <li style={{ marginBottom: "5px", color: "#118678" }}>
                    <span style={{ color: "black" }}>
                      <a className="text-muted" href="#">
                        Gift Cards
                      </a>
                    </span>
                  </li>
                  <li style={{ marginBottom: "5px", color: "#118678" }}>
                    <span style={{ color: "black" }}>
                      <a className="text-muted" href="#">
                        Happi Offers
                      </a>
                    </span>
                  </li>

                  <li style={{ marginBottom: "5px", color: "#118678" }}>
                    <span style={{ color: "black" }}>
                      <a className="text-muted" href="#">
                        Campaigns
                      </a>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="col-6 col-md-2">
                <h7 style={{ fontWeight: "bold", marginLeft: "26px" }}>
                  About
                </h7>
                <ul className="text-small" style={{ paddingTop: "5px" }}>
                  <li style={{ marginBottom: "5px", color: "#118678" }}>
                    <span style={{ color: "black" }}>
                      <a className="text-muted" href="#">
                        About
                      </a>
                    </span>
                  </li>
                  <li style={{ marginBottom: "5px", color: "#118678" }}>
                    <span style={{ color: "black" }}>
                      <a className="text-muted" href="#">
                        Contact Us
                      </a>
                    </span>
                  </li>

                  <li style={{ marginBottom: "5px", color: "#118678" }}>
                    <span style={{ color: "black" }}>
                      <a className="text-muted" href="#">
                        Partner with Us
                      </a>
                    </span>
                  </li>
                  <li style={{ marginBottom: "5px", color: "#118678" }}>
                    <span style={{ color: "black" }}>
                      <a className="text-muted" href="#">
                        Reviews
                      </a>
                    </span>
                  </li>
                  <li style={{ marginBottom: "5px", color: "#118678" }}>
                    <span style={{ color: "black" }}>
                      <a className="text-muted" href="#">
                        Sign In
                      </a>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="col-6 col-md-2">
                <h7
                  style={{
                    fontWeight: "bold",
                    marginLeft: "26px",
                  }}
                >
                  Support
                </h7>
                <ul className="text-small" style={{ paddingTop: "5px" }}>
                  <li style={{ marginBottom: "5px", color: "#118678" }}>
                    <span style={{ color: "black" }}>
                      <a className="text-muted" href="#">
                        Help Center
                      </a>
                    </span>
                  </li>
                  <li style={{ marginBottom: "5px", color: "#118678" }}>
                    <span style={{ color: "black" }}>
                      <a className="text-muted" href="#">
                        Privacy Policy
                      </a>
                    </span>
                  </li>
                  <li style={{ marginBottom: "5px", color: "#118678" }}>
                    <span style={{ color: "black" }}>
                      <a className="text-muted" href="#">
                        Terms & Conditions
                      </a>
                    </span>
                  </li>
                  <li style={{ marginBottom: "5px", color: "#118678" }}>
                    <span style={{ color: "black" }}>
                      <a className="text-muted" href="#">
                        FAQs
                      </a>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="col-6 col-md-2">
                <img
                  src={giftBoxImg}
                  style={{ height: "58px", marginTop: "45px" }}
                />
              </div>
            </div>{" "}
          </div>
          <div className="footerMobile" style={{ display: "none" }}>
            <div className="row">
              <div className="col-12 col-md">
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h5 className="accordion-header" id="headingOne">
                      <div
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                        style={{
                          marginLeft: "10px",
                          height: " 50px",
                          paddingTop: "10px",
                          paddingBottom: "10px",
                          borderStyle: "solid",
                          borderColor: "#fff",
                          borderLeftStyle: "none",
                          borderRightStyle: "none",
                          borderTopStyle: "none",
                        }}
                      >
                        Browse
                      </div>
                    </h5>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <ul className="list-group">
                          <li className="list-group-item">Home</li>
                          <li className="list-group-item">How it works</li>
                          <li className="list-group-item">Gift cards</li>
                          <li className="list-group-item">Happi offers</li>
                          <li className="list-group-item">Campaigns</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h5 className="accordion-header" id="headingTwo">
                      <div
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                        style={{
                          marginLeft: "10px",
                          height: " 50px",
                          paddingTop: "10px",
                          paddingBottom: "10px",
                          borderStyle: "solid",
                          borderColor: "#fff",
                          borderLeftStyle: "none",
                          borderRightStyle: "none",
                          borderTopStyle: "none",
                        }}
                      >
                        About
                      </div>
                    </h5>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <ul className="list-group">
                          <li className="list-group-item">About</li>
                          <li className="list-group-item">Contact us</li>
                          <li className="list-group-item">Partner With Us</li>
                          <li className="list-group-item">Reviews</li>
                          <li className="list-group-item">Sign In</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h5 className="accordion-header" id="headingThree">
                      <div
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                        style={{
                          marginLeft: "10px",
                          height: " 50px",
                          paddingTop: "10px",
                          paddingBottom: "10px",
                          borderBottomStyle: "solid",
                          borderColor: "#fff",
                          borderLeftStyle: "none",
                          borderRightStyle: "none",
                          borderTopStyle: "none",
                        }}
                      >
                        Support
                      </div>
                    </h5>
                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        {" "}
                        <ul className="list-group">
                          <li className="list-group-item">Help Center</li>
                          <li className="list-group-item">Privacy Policy</li>
                          <li className="list-group-item">
                            Terms & Conditions
                          </li>
                          <li className="list-group-item">FAQs</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
      <div>
        <Copyright />
      </div>
    </>
  );
};

export default Footer;
