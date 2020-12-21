import React from "react";
import logoImg from "../../assets/images/logo-footer.PNG";
import "./footer.css";
import giftBoxImg from "../../assets/images/giftBox.PNG";
import Copyright from "../copyright/copyright";

const Footer = () => {
  return (
    <div>
      <footer
        className="pt-4 my-md-5 pt-md-5 border-top"
        style={{
          backgroundColor: "#fbcc51",
          fontFamily: "Helvetica Neue, Helvetica, sans-serif;",
          fontSize: "12px",
        }}
      >
        <div className="footerDesktop">
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
                class="form-control"
                placeholder="Email"
                style={{
                  borderRadius: "30px",
                  height: "28px",
                  width: "185px",
                  borderColor: "white",
                  backgroundColor: "rgb(251, 204, 81)",
                  borderWidth: "3px",
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
              <h7 style={{ fontWeight: "bold" }}>Browse</h7>
              <ul
                className="list-unstyled text-small"
                style={{ marginLeft: "10px", paddingTop: "5px" }}
              >
                <li style={{ marginBottom: "5px" }}>
                  <a className="text-muted" href="#">
                    Home
                  </a>
                </li>
                <li style={{ marginBottom: "5px" }}>
                  <a className="text-muted" href="#">
                    How it works
                  </a>
                </li>
                <li style={{ marginBottom: "5px" }}>
                  <a className="text-muted" href="#">
                    Gift cards
                  </a>
                </li>
                <li style={{ marginBottom: "5px" }}>
                  <a className="text-muted" href="#">
                    Happi offers
                  </a>
                </li>
                <li style={{ marginBottom: "5px" }}>
                  <a className="text-muted" href="#">
                    Campaigns
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-md-2">
              <h7 style={{ fontWeight: "bold" }}>About</h7>
              <ul
                className="list-unstyled text-small"
                style={{ marginLeft: "10px", paddingTop: "5px" }}
              >
                <li style={{ marginBottom: "5px" }}>
                  <a className="text-muted" href="#">
                    About
                  </a>
                </li>
                <li style={{ marginBottom: "5px" }}>
                  <a className="text-muted" href="#">
                    contact us
                  </a>
                </li>
                <li style={{ marginBottom: "5px" }}>
                  <a className="text-muted" href="#">
                    Another resource
                  </a>
                </li>
                <li style={{ marginBottom: "5px" }}>
                  <a className="text-muted" href="#">
                    Partner with us
                  </a>
                </li>
                <li style={{ marginBottom: "5px" }}>
                  <a className="text-muted" href="#">
                    Reviews
                  </a>
                </li>
                <li style={{ marginBottom: "5px" }}>
                  <a className="text-muted" href="#">
                    Sign in
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-md-2">
              <h7
                style={{
                  fontWeight: "bold",
                }}
              >
                Support
              </h7>
              <ul
                className="list-unstyled text-small"
                style={{ marginLeft: "10px", paddingTop: "5px" }}
              >
                <li style={{ marginBottom: "5px" }}>
                  <a className="text-muted" href="#">
                    Help center
                  </a>
                </li>
                <li style={{ marginBottom: "5px" }}>
                  <a className="text-muted" href="#">
                    Privacy policy
                  </a>
                </li>
                <li style={{ marginBottom: "5px" }}>
                  <a className="text-muted" href="#">
                    Terms & conditions
                  </a>
                </li>
                <li style={{ marginBottom: "5px" }}>
                  <a className="text-muted" href="#">
                    FAQs
                  </a>
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
                        <li className="list-group-item">Terms & Conditions</li>
                        <li className="list-group-item">FAQs</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Copyright />
      </footer>
    </div>
  );
};

export default Footer;
