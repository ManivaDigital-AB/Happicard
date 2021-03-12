import React from "react";

const options = [
  ["1", "Aktiebolag"],
  ["2", "Ideella föreningar"]
];

const CompanyFormDrop = ({ label, ...others }) => {
  
  const {onChange} = others;

  return (
  <>
    
    <div className="row justify-content-end" style={{marginBottom: "20px"}}><div className="col-sm" style={{textAlign: "right"}}><label style={{fontSize: "14px", color: "#4A4746", fontWeight: "700"}}>Are you a company or NGO?</label>  </div>
    <div className="col-sm" style={{textAlign: "left"}}>
    {/* <select {...others} style={{width: "100px", fontSize: "14px"}}>
      {options.map(([value, name]) => (
        <option value={value}>{name}</option>
      ))}
    </select> */}
    <form>{options.map(([value, name]) => (
        <div className="radio">
        <label>
          <input type="radio" value={value} onChange={onChange}/>
          {name}
        </label>
      </div>
      ))}</form>
    </div></div>
    
  </>
)};

export default CompanyFormDrop;
