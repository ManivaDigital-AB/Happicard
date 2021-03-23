import React, {useState, useEffect} from "react";
import logoImg from "../../assets/images/logo-footer.PNG";
// import "./footer.css";
import giftBoxImg from "../../assets/images/giftBox.PNG";
import Copyright from "../copyright/copyright";
import axios from "axios";
import { BodyContainer } from "./footer.styles"

const Footer = () => {

  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [footerCMS, setFooterCMS] = useState({});

  const validateEmail = (mail) => {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
   if(pattern.test(mail)) {setValidationMessage(""); return true;} else{setValidationMessage("Please enter a valid email"); return false;} 
  }

  const handleOnChange = (evt) => {
    setEmail(evt.target.value);
  }

  const handleSubmit = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    let isValidEmail = validateEmail(email); 
     
    if(isValidEmail){  await axios
      .post(
        `http://35.161.152.123/api/accounts/create/newsletter/`,
        JSON.stringify({email: email}),
        config
      )
      .then((response) => {
      console.log(response);
      setSuccessMessage(true);
      setTimeout(function(){
        setSuccessMessage(false);
    },1000)
    }).catch(error => {
        console.log(error.response.data);
      });}

  
  }

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
    axios
        .get(`http://35.161.152.123/api/customizations/list/footer/`, config)
        .then((response) => {
          setFooterCMS(response.data[0].social_media);
        });
  
  },[]);

  return (
    <>
      <BodyContainer className="row " style={{ backgroundColor: "#ffc541" }}>
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
                  value={email}
                  onChange={handleOnChange}
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
                  onClick={handleSubmit}
                  style={{
                    marginTop: "10px",
                    borderColor: "white",
                    borderWidth: "thin",
                    marginTop: "10px",
                    borderRadius: "30px",
                    width: "84px",
                    backgroundColor: "#fff",
                    outline: "none",
                    color:"#4A4746",
                    fontWeight: "500"
                  }}
                >
                  Subscribe
                </button>
                <br/>
                {successMessage &&<span style={{paddingLeft: "2px", fontWeight: "600"}}>successfully subscribed!</span>}
                {validationMessage !== "" &&<span style={{paddingLeft: "2px", fontWeight: "600", color: "red"}}>{validationMessage}</span>}
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
          <div className="footerMobile">
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
                        >
                        Browse <i class="fas fa-chevron-down" style={{float: "right", color: "#FFFFFF"}}></i>
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
                      >
                        About <i class="fas fa-chevron-down" style={{float: "right", color: "#FFFFFF"}}></i>
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
                      >
                        Support <i class="fas fa-chevron-down" style={{float: "right", color: "#FFFFFF"}}></i>
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
            <div className="row justify-content-md-center">
            <div className="col-12 col-md" align="center">
            <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleOnChange}
                  style={{
                    borderRadius: "30px",
                    height: "45px",
                    width: "260px",
                    border: "2px solid #FFF",
                    backgroundColor: "rgb(251, 204, 81)",
                    borderWidth: "2px",
                    fontSize: "16px",
                    marginTop: "40px"
                  }}
                />
              <button
                  onClick={handleSubmit}
                  style={{
                    marginTop: "10px",
                    border: "2px solid #FFF",
                    // borderWidth: "thin",
                    marginTop: "10px",
                    borderRadius: "30px",
                    width: "260px",
                    backgroundColor: "#fff",
                    outline: "none",
                    color:"#4A4746",
                    height: "45px",
                    fontWeight: "600",
                    marginTop: "25px",
                    marginBottom: "25px",
                    fontSize: "16px",
                  }}
                >
                  Subscribe
                </button>
            </div>
            </div>
          </div>
        </footer>
      </BodyContainer>
      <div>
        <Copyright props={footerCMS}/>
      </div>
    </>
  );
};

export default Footer;
