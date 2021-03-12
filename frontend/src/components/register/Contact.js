import React, { useState } from "react";

import ItemForm from "./ItemForm";
import axios from "axios";

const Contact = ({ setForm, formData, navigation }) => {
  const { first_name, last_name, email, phone_number, comments } = formData;

  const { previous, go } = navigation;

  const [displaySuccessMessage, setdisplaySuccessMessage] = useState(false);

  const handleSubmit = async (e) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    await axios
      .post(
        `http://35.161.152.123/api/accounts/register/vendor/`,
        JSON.stringify(formData),
        config
      )
      .then((response) => {
       
      setdisplaySuccessMessage(true);
      console.log(formData);
      //go("companyform");
      console.log(response);
      });
  }

  return (
    <div className="form">
      <ItemForm
        label="First Name"
        name="first_name"
        value={first_name}
        onChange={setForm}
        placeholder="Your first name"
      />
      <ItemForm
        label="Last Name"
        name="last_name"
        value={last_name}
        onChange={setForm}
        placeholder="Your last name"
      />
      <ItemForm
        label="Email"
        name="email"
        value={email}
        onChange={setForm}
        placeholder="your email"
      />
      <ItemForm
        label="Phone Number"
        name="phone_number"
        value={phone_number}
        onChange={setForm}
        placeholder="Your phone number"
      />
      <ItemForm label="Comments" name="comments" value={comments} onChange={setForm} placeholder="Your comments"/>
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
          fontWeight: "700" }} onClick={handleSubmit}>Submit</button>
      </div>

     {displaySuccessMessage && <div>Successfully submitted!</div>} 
    </div>
  );
};

export default Contact;
