import React, { useState, useEffect } from "react";
import {
  BodyContainer,
  LeftHeaderContainer,
  RightHeaderContainer,
  ElementProcess,
  BodyProcess,
  BodyProcessImg,
} from "../about/aboutStyle";
import logoImg from "../../assets/images/logo_yellow.PNG";
import logo from "../../assets/images/logo.PNG";
import AboutMain from "../../assets/images/about/AboutMain.PNG";
import ChooseBrand from "../../assets/images/about/ChooseBrand.PNG";
import Personalize from "../../assets/images/about/Personalize.PNG";
import Pay from "../../assets/images/about/Pay.PNG";
import aboutSection3 from "../../assets/images/about/aboutSection3.PNG";
import Contact from "../../components/contact/contact";
import axios from "axios";

const about = () => {

  const [aboutCMS, setAboutCMS] = useState({});

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
    axios
        .get(`http://35.161.152.123/api/customizations/list/aboutpage/`, config)
        .then((response) => {
          setAboutCMS(response.data[0]);
        });
  
  },[]);


    return (
      <>
        <div>
          <BodyContainer>
            <div
              className="row header-container"
              style={{ backgroundColor: "#FFFF" }}
            >
              <LeftHeaderContainer>
                <img src={AboutMain} className="img-header"></img>
              </LeftHeaderContainer>
              <RightHeaderContainer>
                <h2>
                  {/* Om <img src={logoImg} className="happicard-img"></img> */}
                  { aboutCMS.about_page_title } <img src={logoImg} className="happicard-img"></img>
                </h2>
                <div className="about-div">
                  <p>
                    {
                      aboutCMS.about_page_paragraph_top
                    }
                  </p>
                  <p>
                    {
                      aboutCMS.about_page_paragraph_bottom
                    }
                  </p>
                  <p>
                    Happicard gör det roligt och enkelt att ge. Kontakt oss för
                    mer info: info@happicard.se
                  </p>
                </div>
              </RightHeaderContainer>
            </div>

            <div className="process-body">
              <h2>
                <img src={logo} className="happicard-img"></img>{" "}
                <span style={{ color: "#4A4746" }}>{ aboutCMS.about_page_process_main_title}</span>
              </h2>
              <BodyProcess>
                <ElementProcess>
                  <img src={ChooseBrand}></img>
                  <h4>{aboutCMS.about_page_process_title_1}</h4>
                  <div>
                    { aboutCMS.about_page_process_paragraph_1}
                  </div>
                </ElementProcess>
                <ElementProcess>
                <img src={Personalize}></img>
                  <h4>{aboutCMS.about_page_process_title_2}</h4>
                  <div>
                    { aboutCMS.about_page_process_paragraph_2}
                  </div>
                </ElementProcess>
                <ElementProcess>
                <img src={Pay}></img>
                  <h4>{aboutCMS.about_page_process_title_3}</h4>
                  <div>
                     { aboutCMS.about_page_process_paragraph_3}
                  </div>
                  </ElementProcess>
              </BodyProcess>
            </div>
            <div className="row " style={{ backgroundColor: "#FFF" }}>
              {" "}
              <Contact props={aboutCMS}/>
            </div>
          </BodyContainer>
        </div>
      </>
    );
  }


export default about;
