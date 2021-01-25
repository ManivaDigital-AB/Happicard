import React, { useState } from "react";
import FacebookImg from "../../assets/images/Facebook.PNG";
import InstaImg from "../../assets/images/Insta.PNG";
import LinkedinImg from "../../assets/images/Linked in.PNG";
import YoutubeImg from "../../assets/images/Youtube.PNG";

const copyright = () => {
  return (
    <>
      <div className="row" style={{ backgroundColor: "#fff" }}>
        <div>
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
          className="ml-auto mr-3"
          style={{ marginTop: "10px", marginRight: "10px" }}
        >
          <li className="list-inline-item">
            <a href="https://www.facebook.com" target="_blank">
              <img src={FacebookImg} style={{ width: "22px" }} />
            </a>
          </li>
          <li className="list-inline-item">
            <a href="https://www.instagram.com" target="_blank">
              {" "}
              <img src={InstaImg} style={{ width: "22px" }} />
            </a>
          </li>
          <li className="list-inline-item">
            <a href="https://www.linkedin.com" target="_blank">
              <img src={LinkedinImg} style={{ width: "22px" }} />
            </a>
          </li>
          <li className="list-inline-item">
            <a href="https://www.youtube.com" target="_blank">
              <img src={YoutubeImg} style={{ width: "22px" }} />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default copyright;
