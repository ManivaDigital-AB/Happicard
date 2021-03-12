import React, { Component } from "react";
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
class about extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
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
                  Om <img src={logoImg} className="happicard-img"></img>
                </h2>
                <div className="about-div">
                  <p>
                    Happicard är en digital plattform som ger användare
                    möjlighet att köpa, spara, ta emot och lagra digitala
                    presentkort. Användaren kan köpa gåvor som hos
                    samarbetspartners som är både företag och
                    välgörenhetsorganisationer.
                  </p>
                  <p>
                    Happicard är utvecklat med ett hållbarhetsfokus i alla
                    aspekter. Det är en digital presentkortstjänst helt fri från
                    plastkort. Men dessutom är samarbetspartners mycket noggrant
                    utvalda utifrån sin hållbarhetsprofil. Det gör Happicard
                    till en tjänst där en hållbarhetsmedveten konsument snabbt
                    kan hitta favoriter i en unik utbudsmix.
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
                <span style={{ color: "#4A4746" }}>Process</span>
              </h2>
              <BodyProcess>
                <ElementProcess>
                  <img src={ChooseBrand}></img>
                  <h4>CHOOSE BRAND</h4>
                  <div>
                    I'm a paragraph. Click here to add your own text and edit
                    me. It’s easy. Just click “Edit Text” or double click me.
                  </div>
                </ElementProcess>
                <ElementProcess>
                <img src={Personalize}></img>
                  <h4>PERSONALIZE</h4>
                  <div>
                    I'm a paragraph. Click here to add your own text and edit
                    me. It’s easy. Just click “Edit Text” or double click me.
                  </div>
                </ElementProcess>
                <ElementProcess>
                <img src={Pay}></img>
                  <h4>PAY & DELIVER</h4>
                  <div>
                    I'm a paragraph. Click here to add your own text and edit
                    me. It’s easy. Just click “Edit Text” or double click me.
                  </div>
                  </ElementProcess>
              </BodyProcess>
            </div>
            <div className="row " style={{ backgroundColor: "#FFF" }}>
              {" "}
              <Contact />
            </div>
          </BodyContainer>
        </div>
      </>
    );
  }
}

export default about;
