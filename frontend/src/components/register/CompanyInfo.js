import React from "react";

import ItemForm from "./ItemForm";

const CompanyInfo = ({ setForm, formData, navigation }) => {
  const { company_name, company_category, company_address, company_website  } = formData;

  const { next, previous } = navigation;

  return (
    <div className="form">
      <ItemForm
        label="Company Name"
        name="company_name"
        value={company_name}
        onChange={setForm}
        placeholder="Name of your company"
      />
      <ItemForm
        label="Company Category"
        name="company_category"
        value={company_category}
        onChange={setForm}
        placeholder="e.g 'Fashion' if Store, 'Youth' if NGO"
      />
      <ItemForm
        label="Company Address"
        name="company_address"
        value={company_address}
        onChange={setForm}
        placeholder="Your company address"
      />
      <ItemForm
        label="Company Website"
        name="company_website"
        value={company_website}
        onChange={setForm}
        placeholder="Your company web url"
      />
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
      </div>
  );
};

export default CompanyInfo;
