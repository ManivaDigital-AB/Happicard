import React, { Component } from "react";
import {
  BodyContainer,
  LeftContainer,
  RightContainer,
} from "../contact/contactStyle";
import MapIcon from "../../assets/images/about/Map.PNG";
import TelIcon from "../../assets/images/about/Telephone.PNG";
import EmailIcon from "../../assets/images/about/Email.PNG";
import { useForm } from "react-hook-form";
import axios from "axios";

const contact = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    await axios
      .post(
        `http://35.161.152.123/api/accounts/contact/`,
        JSON.stringify(data),
        config
      )
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <>
      <BodyContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row" style={{ marginLeft: "255px" }}>
            <LeftContainer>
              <h4>CONTACT US</h4>
              <div className="form-group">
                <label>Name</label>
                <input
                  name="name"
                  ref={register}
                  placeholder="John"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  name="email"
                  ref={register}
                  placeholder="example@email.com"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input
                  name="subject"
                  ref={register}
                  placeholder="Reason for contacting"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  ref={register}
                  placeholder="Message"
                ></textarea>
              </div>
              <div className="form-group">
                <input
                  type="Submit"
                  value="Send Request"
                  style={{
                    textAlign: "center",
                    borderRadius: "34px",
                    backgroundColor: "#ffc541",
                    width: "250px",
                    border: "none",
                    fontWeight: "600",
                    color: "#4A4746"
                  }}
                />
              </div>
            </LeftContainer>
            <RightContainer>
              <h4>GET IN TOUCH</h4>
              <div className="form-group form-row">
                <img src={MapIcon} />
                <span>Address</span>
              </div>
              <div className="form-group">
                <img src={TelIcon} />
                <span>+46 1234 567 98</span>
              </div>
              <div className="form-group">
                <img src={EmailIcon} />
                <span>help@happicard.se</span>
              </div>
            </RightContainer>
          </div>
        </form>
      </BodyContainer>
    </>
  );
};
export default contact;
