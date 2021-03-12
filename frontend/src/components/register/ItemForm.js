import React from "react";

const ItemForm = ({ label, children, type = "text", ...otherProps }) => (
  <div className="row justify-content-end">
    {type === "text" ? (
      <>
      <div className="col-sm" style={{textAlign:"right"}}>
        <label style={{marginRight: "15px", fontSize: "14px", fontWeight: "700", color: "#4A4746"}}>{label}</label>
        </div>
        <div className="col-sm" style={{textAlign:"left"}}>
        <input type={type} {...otherProps} style={{ border: "2px solid #ffc542", marginBottom: "30px", padding:"0px", borderTop:"0px", borderLeft: "0px", borderRight: "0px", outline:"none", width: "250px"}}/>
      </div>
      </>
    ) : (
      <>
      <div className="col-sm">
        <label />
        </div>
        <div className="col-sm">
        <input type={type} {...otherProps} />
        </div>
        {label}
      </>
    )}
  </div>
);

export default ItemForm;
