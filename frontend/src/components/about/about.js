import React, { Component } from "react";
import {
  BodyContainer,
  LeftHeaderContainer,
  RightHeaderContainer,
  ElementProcess,
  BodyProcess,
  BodyProcessImg,
} from "../about/aboutStyle";
import logoImg from "../../assets/images/happicard-yellow-logo.PNG";
import woman from "../../assets/images/about/Woman.JPG";
import aboutProcess1 from "../../assets/images/about/about1.PNG";
import aboutProcess2 from "../../assets/images/about/about2.PNG";
import aboutProcess3 from "../../assets/images/about/about3.PNG";
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
        <BodyContainer>
          <div className="row header-container">
            <LeftHeaderContainer>
              <img src={woman} className="img-header"></img>
            </LeftHeaderContainer>
            <RightHeaderContainer>
              <h2>
                Om <img src={logoImg} className="happicard-img"></img>
              </h2>
              <div className="about-div">
                <p>
                  Happicard är en digital plattform som ger användare möjlighet
                  att köpa, spara, ta emot och lagra digitala presentkort.
                  Användaren kan köpa gåvor som hos samarbetspartners som är
                  både företag och välgörenhetsorganisationer.
                </p>
                <p>
                  Happicard är utvecklat med ett hållbarhetsfokus i alla
                  aspekter. Det är en digital presentkortstjänst helt fri från
                  plastkort. Men dessutom är samarbetspartners mycket noggrant
                  utvalda utifrån sin hållbarhetsprofil. Det gör Happicard till
                  en tjänst där en hållbarhetsmedveten konsument snabbt kan
                  hitta favoriter i en unik utbudsmix. Happicard gör det roligt
                  och enkelt att ge.Kontakt oss för mer info: info@happicard.se
                </p>
              </div>
            </RightHeaderContainer>
          </div>

          {/* <div className="process-body">           
            <h2><img src={logoImg}  className="happicard-img"></img> Process</h2>               
            <BodyProcess> 
                  <ElementProcess>
                  <img src={aboutProcess1} ></img> 
                    <h4>
                    Choose Brand
                    </h4>
                    <div>
                    I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me.
                    </div>
                    </ElementProcess>     
                    <ElementProcess>
                    <img src={aboutProcess2}></img> 
                    <h4>
                    Personalize
                    </h4>
                    <div>
                    I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me.
                    </div>
                    </ElementProcess>     
                    <ElementProcess>
                    <img src={aboutProcess3}></img> 
                    <h4>
                    Pay & Deliver
                    </h4>
                    <div>
                    I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me.
                    </div>
                    </ElementProcess>     
                    </BodyProcess>
                    </div>
                    
                    <div className="row">
                      <BodyProcessImg>
                      <img src={aboutSection3}></img>
                      </BodyProcessImg>
                    </div>
                   <Contact/> */}
        </BodyContainer>
      </>
    );
  }
}

export default about;
