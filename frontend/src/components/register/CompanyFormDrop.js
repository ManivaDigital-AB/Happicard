import React from "react";

// const options = [
//   ["0", "Select"],
//   ["1", "Fashion"],
//   ["2", "Youth"]
// ];

const CompanyFormDrop = ({ label, error, errorMessage, options, ...others }) => {
  return (
  <>
    <div className="row justify-content-end" style={{marginBottom: "20px", marginTop: "10px"}}><div className="col-sm" style={{textAlign: "right"}}>
    <span style={{color: "red"}}>*</span><label style={{fontSize: "14px", color: "#4A4746", fontWeight: "700"}}>Company Category</label>  
    </div>
    <div className="col-sm" style={{textAlign: "left"}}>
    <select {...others} style={{width: "100px", fontSize: "14px", marginBottom: "15px"}}>
      {options.map(([value, name]) => (
        <option value={value} key={value}>{name}</option>
      ))}
    </select>
    <br/>
    { error && <span style={{color: "red", fontSize: "12px", fontWeight: "600"}}>{errorMessage}</span>}
    </div></div>
    
  </>
)};

export default CompanyFormDrop;
