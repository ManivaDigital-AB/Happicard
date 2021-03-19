import React, { useState } from "react";
import ItemForm from "./ItemForm";
import axios from "axios";
import { Modal } from "react-bootstrap";
import successIcon from "../../assets/images/success_icon.PNG";

const Contact = ({ setForm, formData, navigation }) => {
  const [show, setShow] = useState(false);
  const { first_name, last_name, email, phone_number, company_role, comments } = formData;
  const { previous, go } = navigation;
  const [displaySuccessMessage, setdisplaySuccessMessage] = useState(false);
  const [displayErrorMessage, setdisplayErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError ] = useState("");
  const [disableSubmitButton, setDisableSubmitButton] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [registrationErrors, setRegistrationErrors] = useState([]);
  const [characterCount, setCharacterCount] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validateEmail = (mail) => {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
   if(pattern.test(mail)) {setEmailError(""); return true;} else{setEmailError("Please enter a valid email address and this field is mandatory"); return false;} 
  }

  const validatePhoneNumber = (number) => {
    var pattern = /^(([+]46)((70[{0-9}])|(72[{0-9})])|(73[{0-9}])|(76[{0-9}]))([\d]{6}))$/.test(number);
    if(pattern) { setPhoneNumberError(""); return true;}
    else{setPhoneNumberError("Phone number format should be +46xxxxxxxxx"); return false}
  }

  const handleSubmit = async (e) => {

    first_name == "" ? setFirstNameError(true) : setFirstNameError(false);
    last_name == "" ? setLastNameError(true) : setLastNameError(false);
    let isValidPhoneNumber = true;
    let isValidEmail = true;

    isValidEmail =  validateEmail(email)
    if(phone_number !== "" ) {isValidPhoneNumber = validatePhoneNumber(phone_number)} 

    if(first_name !== "" && last_name !== ""  && isValidEmail && isValidPhoneNumber)
    {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      setdisplayErrorMessage(false);
      setErrorMessage("");
      setProcessing(true);
      setDisableSubmitButton(true);
     await axios
        .post(
          `http://35.161.152.123/api/accounts/register/vendor/`,
          JSON.stringify(formData),
          config
        )
        .then((response) => {
        console.log(response);
        // setdisplaySuccessMessage(true);
        handleShow();
        setProcessing(false);
        }).catch(error => {
          console.log(error.response.data);
          setdisplayErrorMessage(true);
          setErrorMessage("Something went wrong. Please check if the details are already registered or contact support");
          setProcessing(false);});
      
    } else {setDisableSubmitButton(true)}
  }

  const handleOnChange = (e) => {
    setDisableSubmitButton(false);
    switch (e.target.name)
    { 
      case 'first_name':
        e.target.value == "" ? setFirstNameError(true) : setFirstNameError(false);
        setForm(e);
      break;
      case 'last_name':
        e.target.value == "" ? setLastNameError(true) : setLastNameError(false);
        setForm(e);
      break;
      case 'email':
        validateEmail(e.target.value);
        setForm(e);
        break;
      case 'phone_number':
        validatePhoneNumber(e.target.value);
        setForm(e);
        break;
      
      default:
      break;
    }
  }

  return (
    <>
    <Modal show={show} onHide={handleClose}>
        <div style={{ border: "4px solid #ffc541", borderRadius: "0.3rem" }}>
          <Modal.Header
            closeButton
            style={{ backgroundColor: "#ffff", border: "none" }}
          ></Modal.Header>
          <Modal.Body style={{ backgroundColor: "#ffff", textAlign : "center", marginBottom: "30px" }}>
            <div style={{textAlign: "center", marginBottom: "15px"}}><img src={successIcon} style={{width: "150px"}}/></div>
            <span style={{fontWeight:"600", fontSize: "14px", paddingBottom: "15px"}}>Registration successful.</span><br/>
            <span style={{fontWeight:"600", fontSize: "14px", paddingBottom: "15px"}}>Please check your email for more information.</span>
          </Modal.Body>
        </div>
      </Modal>
    <div className="row justify-content-md-center"><h4 style={{fontSize: "14px", paddingBottom: "15px", fontWeight: "700"}}>CONTACT INFORMATION</h4></div>
    <div className="form">
      <ItemForm
        label="First Name"
        name="first_name"
        value={first_name}
        onChange={handleOnChange}
        isMandatory={true}
        placeholder="Your first name"
        error={firstNameError}
        errorMessage={"First name is mandatory!"}
      />
      <ItemForm
        label="Last Name"
        name="last_name"
        value={last_name}
        onChange={handleOnChange}
        isMandatory={true}
        placeholder="Your last name"
        error={lastNameError}
        errorMessage={"Last name is mandatory!"}
      />
      <ItemForm
        label="Email"
        name="email"
        value={email}
        isMandatory={true}
        onChange={handleOnChange}
        placeholder="your email"
        error={emailError != ""}
        errorMessage={emailError}
      />
      <ItemForm
        label="Phone Number"
        name="phone_number"
        value={phone_number}
        onChange={handleOnChange}
        placeholder="+46xxxxxxxxx"
        error={phoneNumberError != ""}
        errorMessage={phoneNumberError}
      />
      <ItemForm
        label="Company role"
        name="company_role"
        value={company_role}
        onChange={setForm}
        placeholder="Your role in the company"
        error={false}
        errorMessage={""}
      />
     <div className="row justify-content-end" style={{marginTop: "15px"}}>
      <div className="col-sm" style={{textAlign: "right"}}>
      <label style={{marginRight: "15px", fontSize: "14px", fontWeight: "700", color: "rgb(74, 71, 70)"}}>Comments</label>
      </div>
      <div className="col-sm" style={{textAlign: "left"}}>
      <textarea className="col-sm-6" label="Comments" name="comments" value={comments} onChange={(event) => {
                    setCharacterCount(event.target.value.length)
                    setForm(event)
                    }} placeholder="Your comments" maxLength={140} rows="4" style={{border: "2px solid #ffc542", outline: "none"}}></textarea>
      <p style={{fontSize:"12px", fontWeight: "600"}}>{characterCount}/140</p>
<br/>
</div>
</div>
      <div>
        <button style={{
          marginBottom: "20px",
          marginRight: "15px",
          width:"100px",
          height:  "30px",
          backgroundColor: "#ffc542",
          color: "#4A4746",
          border: "none",
          borderRadius: "15px",
          outline: "none",
          fontSize: "12px",
          fontWeight: "700" }} onClick={previous}>Previous</button>
        <button style={{
          marginBottom: "20px",
          marginRight: "15px",
          width:"100px",
          height:  "30px",
          backgroundColor: "#ffc542",
          color: "#4A4746",
          border: "none",
          borderRadius: "15px",
          outline: "none",
          fontSize: "12px",
          fontWeight: "700" }} disabled={disableSubmitButton} onClick={handleSubmit}>{processing && <div className="loading"></div>}Submit</button>
          </div>
          <div className="row justify-content-md-center">{displaySuccessMessage && <div style={{fontSize: "12px", color: "#4A4746", fontWeight: "600", marginBottom: "15px"}}>Thanks for registering with us!</div>} 
          {displayErrorMessage && <div style={{fontSize: "12px", color: "#4A4746", fontWeight: "600", marginBottom: "15px", color: "red"}}>{errorMessage}</div>} 
          </div>
    </div>
    </>
  );
};

export default Contact;
