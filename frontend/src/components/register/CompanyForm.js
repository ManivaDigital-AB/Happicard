import React from "react";
import CompanyFormDrop from "./CompanyFormDrop";



const CompanyForm = ({ setForm, formData, navigation }) => {

  const { corporate_form } = formData;

  const { previous, next } = navigation;

  return ( <>
  
    <CompanyFormDrop label="Company Form" name="corporate_form" value={corporate_form} onChange={setForm}/>
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
          fontWeight: "700" }} onClick={next}>Next</button>
      </div>
      
   </>)
 
};

export default CompanyForm;
