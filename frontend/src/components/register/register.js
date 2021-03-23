import React from "react";
import aboutSection4 from "../../assets/images/about/Shape.PNG";
import registerImg from "../../assets/images/register-img.PNG";
import MultiStepForm from "./MultiStepForm";
import { TopContainer, InnerContainer, MiddleContainer } from "./register.styles";

const Register = () => {
  return (
    <>
      <TopContainer className="row justify-content-md-center">
        <div
          className="container"
        > 
          <InnerContainer className="col-sm">
          <h4>Title</h4>
          <img src={aboutSection4}/>
        </InnerContainer>
        </div>
      </TopContainer>
      <MiddleContainer
        className="row"
        style={{
        
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <img
                src={registerImg}
              />
            </div>
            <div className="col-sm">
              <h4>Title</h4>
              <p>
                Happicard is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
              <p>
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
      </MiddleContainer>
      <div
        className="row"
        style={{  backgroundColor: "#FFFF" }}
      >
        <div className="container" style={{ textAlign: "center" }}>
        <MultiStepForm /> 
        </div>
      </div>
    </>
  );
};

export default Register;
