import React, { useEffect, useState } from "react";
import aboutSection4 from "../../assets/images/about/Shape.PNG";
import registerImg from "../../assets/images/register-img.PNG";
import MultiStepForm from "./MultiStepForm";
import { TopContainer, InnerContainer, MiddleContainer } from "./register.styles";
import axios from "../../utils/axios";

const Register = () => {

  const [registerPageCMS, setregisterPageCMS] = useState({});

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    
    axios.get(`http://35.161.152.123/api/customizations/list/partnerspage/`, config)
          .then((response) => {
           setregisterPageCMS(response.data[0]);
        })
  }, []);


  return (
    <>
      <TopContainer className="row justify-content-md-center">
        <div
          className="container"
        > 
          <InnerContainer className="col-sm">
          <h4>{registerPageCMS.partners_page_title}</h4>
          <img src={registerPageCMS.partners_page_banner}/>
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
              <h4>{registerPageCMS.partners_page_title}</h4>
              <p>
               {registerPageCMS.partners_page_paragraph}
              </p>
              <p>
               {registerPageCMS.partners_page_paragraph}
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
