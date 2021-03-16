import React, { useState, useEffect } from "react";
import CompanyFormDrop from "./CompanyFormDrop";

const CompanyForm = ({ setForm, formData, navigation }) => {
  const [error, setError] = useState(false);
  const { corporate_form, checked_Aktiebolag, checked_Ideella_föreningar } = formData;
  const { previous, next } = navigation;

  const validateCompanyForm = () => {
    if(!checked_Aktiebolag && !checked_Ideella_föreningar)
    {
      setError(true);
    }
    else
    {
      setError(false);
      next()
    }
  }

  const handleOnChange = (e) => {
    setError(false);
    setForm(e)
  }
  
  return ( 
  <>
     {/* <CompanyFormDrop label="Company Form" name="corporate_form" value={corporate_form} onChange={setForm}/> */}
    <div className="row justify-content-md-center"><h4 style={{fontSize: "14px", paddingBottom: "15px", fontWeight: "700"}}>COMPANY FORM</h4></div>
    <div className="row justify-content-end" style={{marginBottom: "20px"}}><div className="col-sm" style={{textAlign: "right"}}><label style={{fontSize: "14px", color: "#4A4746", fontWeight: "700"}}><span style={{color: "red"}}>*</span>Are you a company or NGO?</label>  </div>
    <div className="col-sm" style={{textAlign: "left"}}>
    <div className="radio">
        <label>
          <input type="radio" value={1} name="form_Aktiebolag" onChange={handleOnChange} checked={checked_Aktiebolag}/>
          <span style={{marginLeft: "10px"}}>Aktiebolag </span>
        </label>
      </div>
      <div className="radio">
        <label>
          <input type="radio" value={2} name="form_Ideella_föreningar" onChange={handleOnChange} checked={checked_Ideella_föreningar}/>
          <span style={{marginLeft: "10px"}}>Ideella_föreningar </span>
        </label>
      </div>
      {error && <span style={{color: "red", fontSize: "12px", fontWeight: "600"}}>This field is mandatory.</span>}
      </div></div>
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
          fontWeight: "700" }} onClick={validateCompanyForm}>Next</button>
      </div>
      </>
    )};

export default CompanyForm;
