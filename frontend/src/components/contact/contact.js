import React, { Component, useState } from "react";
import {
  BodyContainer,
  LeftContainer,
  RightContainer,
} from "../contact/contactStyle";
import MapIcon from "../../assets/images/about/Map.PNG";
import TelIcon from "../../assets/images/about/Telephone.PNG";
import EmailIcon from "../../assets/images/about/Email.PNG";
import { useForm } from "react-hook-form";
import axios from "axios";

const contact = () => {
  const { register, handleSubmit } = useForm();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [displaySuccessMessage, setDisplaySuccessMessage] = useState(false);

  const onSubmit = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    // data.name == "" ? setNameError(true) : setNameError(false) 
    // data.email == "" ? setEmailError(true) : setEmailError(false)
    // data.subjectError == "" ? setSubjectError(true) : setSubjectError(false)
    // data.messageError == "" ? setMessageError(true) : setMessageError(false)

    // data.name !== "" && data.email !== "" && data.subjectError !== "" && data.messageError !== ""

    name == "" ? setNameError(true) : setNameError(false) 
    email == "" ? setEmailError(true) : setEmailError(false)
    subject == "" ? setSubjectError(true) : setSubjectError(false)
    message == "" ? setMessageError(true) : setMessageError(false)

    if(name !== "" && email !== "" && subject !== "" && message !== "")
    {
      setProcessing(true);
      setDisplaySuccessMessage(false);
      await axios
      .post(
        `http://35.161.152.123/api/accounts/contact/`,
        JSON.stringify({name: name, email: email, subject: subject, message: message}),
        config
      )
      .then((response) => {
        console.log(response);
        setDisplaySuccessMessage(true);
        setProcessing(false);
      });
    }
  };

  const handleOnChange = (e) => {
   
    switch (e.target.name)
    { 
      case 'name':
        setName(e.target.value);
        e.target.value == "" ? setNameError(true) : setNameError(false);
        break;
      case 'email':
        setEmail(e.target.value);
        e.target.value == "" ? setEmailError(true) : setEmailError(false);
        break;
      case 'subject':
        setSubject(e.target.value);
        e.target.value == "" ? setSubjectError(true) : setSubjectError(false);
        break;
      case 'message':
        setMessage(e.target.value);
        e.target.value == "" ? setMessageError(true) : setMessageError(false)
        break;
      default:
      break;
    }
  }

  return (
    <>
      <BodyContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row" style={{ marginLeft: "255px" }}>
            <LeftContainer>
              <h4>CONTACT US</h4>
              <div className="form-group">
              
                <label><span style={{color: "red"}}>*</span>Name</label>
                <input
                  name="name"
                  // ref={register}
                  value={name}
                  placeholder="John"
                  className="form-control"
                  onChange={handleOnChange}
                />
                { nameError && <span style={{color: "red", fontSize: "12px", fontWeight: "600"}}>{"This field is mandatory"}</span>}
              </div>

              <div className="form-group">
                <label><span style={{color: "red"}}>*</span>Email Address</label>
                <input
                  name="email"
                  // ref={register}
                  value={email}
                  placeholder="example@email.com"
                  className="form-control"
                  onChange={handleOnChange}
                />
                { emailError && <span style={{color: "red", fontSize: "12px", fontWeight: "600"}}>{"This field is mandatory"}</span>}
              </div>
              
              <div className="form-group">
                <label><span style={{color: "red"}}>*</span>Subject</label>
                <input
                  name="subject"
                  // ref={register}
                  value={subject}
                  placeholder="Reason for contacting"
                  className="form-control"
                  onChange={handleOnChange}
                />
                { subjectError && <span style={{color: "red", fontSize: "12px", fontWeight: "600"}}>{"This field is mandatory"}</span>}
              </div>
              <div className="form-group">
                <label><span style={{color: "red"}}>*</span>Message</label>
                <textarea
                  name="message"
                  // ref={register}
                  value={message}
                  placeholder="Message"
                  onChange={handleOnChange}
                ></textarea>
                { messageError && <span style={{color: "red", fontSize: "12px", fontWeight: "600"}}>{"This field is mandatory"}</span>}
              </div>
              <div className="form-group">
                {/* <input
                  type="Submit"
                  value="Send Request"
                  style={{
                    textAlign: "center",
                    borderRadius: "34px",
                    backgroundColor: "#ffc541",
                    width: "250px",
                    border: "none",
                    fontWeight: "600",
                    color: "#4A4746"
                  }}
                /><div className="loading"></div> */}
                <button
                  type="Submit"
                  
                  onClick={handleSubmit}
                  style={{
                    textAlign: "center",
                    borderRadius: "34px",
                    backgroundColor: "#ffc541",
                    width: "250px",
                    border: "none",
                    fontWeight: "600",
                    color: "#4A4746",
                    fontSize: "14px",
                    fontWeight: "700"
                  }}
                >{processing && <div className="loading"></div>}send request</button><br/>
                {displaySuccessMessage && <span style={{fontSize:"14px", color: "#4A4746", fontWeight: "600", paddingTop: "15px"}}>Thanks for contacting us and we will get back to you!</span>}
              </div>
            </LeftContainer>
            <RightContainer>
              <h4>GET IN TOUCH</h4>
              <div className="form-group form-row">
                <img src={MapIcon} />
                <span>Address</span>
              </div>
              <div className="form-group">
                <img src={TelIcon} />
                <span>+46 1234 567 98</span>
              </div>
              <div className="form-group">
                <img src={EmailIcon} />
                <span>help@happicard.se</span>
              </div>
            </RightContainer>
          </div>
        </form>
      </BodyContainer>
    </>
  );
};
export default contact;
