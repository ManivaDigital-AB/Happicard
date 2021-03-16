import React from "react";
import aboutSection4 from "../../assets/images/about/Shape.PNG";
import registerImg from "../../assets/images/register-img.PNG";
import MultiStepForm from "./MultiStepForm";

const Register = () => {
  return (
    <>
      <div className="row justify-content-md-center" style={{ backgroundColor: "#ffc542" }}>
        <div
          className="container"
          style={{ textAlign: "center", color: "#4A4746" }}
        >
          <div className="col-sm">
          <h4 style={{paddingRight: "75px", paddingTop: "20px", paddingBottom: "20px", fontSize: "16px", color: "#4A4746", fontWeight: "700"}}>Title</h4>
          <img src={aboutSection4} style={{ width: "450px", height: "400px", paddingBottom: "25px", marginRight: "60px" }} />
          </div>
        </div>
      </div>
      <div
        className="row"
        style={{
          paddingTop: "25px",
          backgroundColor: "#FFFF",
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
              <h4 style={{ textAlign: "left", color: "#0F0F0F" }}>Title</h4>
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
        style={{  backgroundColor: "#FFFF" }}
      >
        <div className="container" style={{ textAlign: "center" }}>
        <MultiStepForm /> 
        {/* <button onClick={handleClick}></button> */}
        </div>
      </div>
    </>
  );
};

export default Register;
