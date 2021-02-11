import React, { useEffect, useState, useRef, useCallback } from "react";
import Slider from "react-slick";
import { BodyContainer } from "../stores/storeStyles";

import aboutSection3 from "../../assets/images/about/aboutSection3.PNG";
import registerImg from "../../assets/images/register-img.PNG";
import { useForm } from "react-hook-form";
import axios from "axios";

const Register = () => {
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
      <div className="row" style={{ backgroundColor: "#FFF" }}>
        <div
          class="container"
          style={{ textAlign: "center", color: "#4A4746" }}
        >
          <h4>Title</h4>
          <img src={aboutSection3} style={{ width: "100%" }} />
        </div>
      </div>
      <div
        className="row"
        style={{
          paddingTop: "25px",
          backgroundColor: "#E1DBD8",
          borderRadius: "2px",
        }}
      >
        <div className="container">
          <div className="row" style={{ textAlign: "center" }}>
            <div className="col-sm" style={{ padding: "25px 25px 25px 25px" }}>
              <img
                src={registerImg}
                style={{ width: "350px", height: "400px" }}
              />
            </div>
            <div className="col-sm">
              <h4 style={{ textAlign: "left", color: "#ffc542" }}>Title</h4>
              <p style={{ paddingTop: "25px", textAlign: "left" }}>
                Happicard is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
              <p style={{ paddingTop: "25px", textAlign: "left" }}>
                It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="row"
        style={{ paddingTop: "50px", backgroundColor: "#E1DBD8" }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <form>
            <div className="form-group row">
              <div className="col-sm-3">
                <input
                  ref={register}
                  name="first_name"
                  placeholder="First Name"
                  className="form-control"
                  style={{ marginLeft: "250px" }}
                />
              </div>
              <div className="col-sm-3">
                <input
                  ref={register}
                  name="last_name"
                  placeholder="Last Name"
                  className="form-control"
                  style={{ marginLeft: "250px" }}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-6">
                <input
                  ref={register}
                  name="email"
                  placeholder="Email"
                  className="form-control"
                  style={{ marginLeft: "250px" }}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-6">
                <input
                  ref={register}
                  name="password"
                  placeholder="Password"
                  className="form-control"
                  style={{ marginLeft: "250px" }}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-6">
                <input
                  ref={register}
                  name="phone_number"
                  placeholder="Phone number"
                  className="form-control"
                  style={{ marginLeft: "250px" }}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-6">
                <input
                  ref={register}
                  name="business_address"
                  placeholder="Business address"
                  className="form-control"
                  style={{ marginLeft: "250px" }}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-6">
                <input
                  ref={register}
                  name="city"
                  placeholder="City"
                  className="form-control"
                  style={{ marginLeft: "250px" }}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-3">
                <input
                  ref={register}
                  name="region"
                  placeholder="State"
                  className="form-control"
                  style={{ marginLeft: "250px" }}
                />
              </div>

              <div className="col-sm-3">
                <input
                  ref={register}
                  name="zipcode"
                  placeholder="Zipcode"
                  className="form-control"
                  style={{ marginLeft: "250px" }}
                />
              </div>
            </div>
            <div className="form-group row" style={{ paddingBottom: "25px" }}>
              {" "}
              <div className="col-sm-6">
                <input
                  ref={register}
                  name="website"
                  placeholder="Website"
                  className="form-control"
                  style={{ marginLeft: "250px" }}
                />
              </div>
            </div>
            <div className="form-group row" style={{ paddingBottom: "25px" }}>
              {" "}
              <div className="col-sm-6">
                <button
                  type="submit"
                  id="colFormLabelSm"
                  placeholder="Website"
                  style={{
                    marginLeft: "315px",
                    border: "2px solid #ffc542",
                    borderRadius: "46px",
                    outline: "none",
                    width: "350px",
                    color: "#7F7573",
                  }}
                >
                  Register Now
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
