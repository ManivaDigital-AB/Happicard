import React from "react";

const ProductList = ({ props }) => {
  return (
    <div className="row" style={{ paddingTop: "75px" }}>
      <div className="col-sm">{props.name}</div>
      <div className="col-sm">{props.name}</div>
      <div className="col-sm">{props.name}</div>
    </div>
  );
};

export default ProductList;
