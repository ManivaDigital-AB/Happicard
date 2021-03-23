import React from "react";
import {isEmpty} from "lodash"

const copyright = ({props}) => {
  return (
    <>
      <div className="row" style={{ backgroundColor: "#fff" }}>
        <div style={{ marginLeft: "275px" }}>
          <p
            style={{
              marginLeft: "15px",
              marginTop: "10px",
              fontSize: "9px",
              color: "gray",
            }}
          >
            @ 2021 Happicard. All rights reserved
          </p>
        </div>
        <ul
          className="ml-auto"
          style={{ marginTop: "10px", marginRight: "330px" }}
        >
          {!isEmpty(props) &&
          props.map((item, index) => (
            <li className="list-inline-item">
            <a href={item.link} target="_blank">
              <img src={item.icon} style={{ width: "22px" }} />
            </a>
          </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default copyright;
