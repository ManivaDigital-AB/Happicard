import React from "react";
import {isEmpty} from "lodash"
import {BodyContainer} from "./copyright.styles"

const copyright = ({props}) => {
  return (
    <BodyContainer>
      <div className="row copyrightDesktop" style={{ backgroundColor: "#fff" }}>
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

      <div className="row copyrightMobile" style={{ backgroundColor: "#fff" }}>
        <ul
          style={{ marginTop: "10px" }}
        >
          {!isEmpty(props) &&
          props.map((item, index) => (
            <li className="list-inline-item">
            <a href={item.link} target="_blank">
              <img src={item.icon} style={{ width: "35px", paddingTop: "15px" }} />
            </a>
          </li>
            ))}
        </ul>
        <br/>
      </div>
       <div className="row copyrightMobile" style={{ backgroundColor: "#fff" }}>
         <p style={{paddingLeft: "20px" }}>
            @ 2021 Happicard. All rights reserved
        </p>
      </div>
    </BodyContainer>
  );
};

export default copyright;
