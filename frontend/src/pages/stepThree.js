import React, { useState } from 'react'
import {
  Field,
  FieldInput,
} from "./Createorder.styles";
import StripeCheckout from "./StripeCheckout";

export default ({ setForm, formData }) => {
  const { first_name, last_name, email,phone_number } = formData;
  const [firstNameError, setFirstNameError ] = useState("");
  const [lastNameError, setLastNameError ] = useState("");
  const [emailError, setEmailError ] = useState("");
  const [phoneNumberError, setPhoneNumberError ] = useState("");

  const validateEmail = (mail) => {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(mail) ? setEmailError("") : setEmailError("Please enter a valid email address");
  }

  const validatePhoneNumber = (number) => {
  var pattern = /^(([+]46)((70[{0-9}])|(72[{0-9})])|(73[{0-9}])|(76[{0-9}]))([\d]{6}))$/.test(number);
  return pattern ? setPhoneNumberError("") : setPhoneNumberError("Phone number format should be +46xxxxxxxxx");
  }

  const validate = (evt) => {
    switch(evt.target.name){
      case "first_name":
         evt.target.value == "" ? setFirstNameError("This field is required!") :  setFirstNameError("")
         break;
      case "last_name":
         evt.target.value == "" ? setLastNameError("This field is required!") :  setLastNameError("")
         break;
      case "email":
         validateEmail(evt.target.value)
         break;
      case "phone_number":
         validatePhoneNumber(evt.target.value)
      default:
        break;
    }
}
  return (
   
<>
      <div
      className="row justify-content-md-center"
      style={{
        paddingTop:"50px",
        backgroundColor: "#F0EEED",
        borderTopLeftRadius: "100px",
        borderTopRightRadius: "100px",
      }}
    >
      <div className="col-md-6">
        <form>
        <div className="form-row">
                    <Field className="form-group col-md-6">
                      <label> *Firstname </label>
                      <FieldInput
                        name="first_name"
                        value={first_name}
                        onBlur={validate}
                        onChange={setForm}
                        placeholder="Your first name - required"
                        className="form-control"
                      />
                     {firstNameError !== "" && <span>{firstNameError}</span>} 
                    </Field>
                    <Field className="form-group col-md-6">
                      <label > *Lastname </label>
                      <FieldInput
                        name="last_name"
                        value={last_name}
                        onChange={setForm}
                        onBlur={validate}
                        placeholder="Your last name - required"
                        className="form-control"
                      />
                     {lastNameError !== "" && <span>{lastNameError}</span>} 
                    </Field>
                    <Field className="form-group col-md-6">
                      <label > *Email </label>
                      <FieldInput
                        name="email"
                        value={email}
                        onChange={setForm}
                        onBlur={validate}
                        placeholder="Your email - required"
                        className="form-control"
                      />
                     {emailError !== ""  && <span>{emailError}</span>} 
                    </Field>
                    <Field className="form-group col-md-6">
                      <label > *Phonenumber </label>
                      <FieldInput
                        name="phone_number"
                        value={phone_number}
                        onChange={setForm}
                        onBlur={validate}
                        placeholder="Your phone number - required"
                        className="form-control"
                      />
                     {phoneNumberError !== "" && <span>{phoneNumberError}</span>} 
                    </Field>
          </div></form></div>
     
      </div>
       <StripeCheckout props={formData} />
       </>
      )
}
