import React, { Component } from 'react';
import {BodyContainer,LeftHeaderContainer,RightHeaderContainer,ElementProcess,BodyProcess,BodyProcessImg } from "../about/aboutStyle";
import logoImg from "../../assets/images/logo.PNG";
import woman from "../../assets/images/about/Woman.JPG";
import aboutProcess1 from "../../assets/images/about/about1.PNG";
import aboutProcess2 from "../../assets/images/about/about2.PNG";
import aboutProcess3 from "../../assets/images/about/about3.PNG";
import aboutSection3 from "../../assets/images/about/aboutSection3.PNG";
import Contact from "../../components/contact/contact"
class about extends Component {
  
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){  
    }  

  render() {
    return (
    <>
        <BodyContainer>
        <div className="row header-container">  
            <LeftHeaderContainer>         
            <img src={woman} className="img-header"></img> 
            
            </LeftHeaderContainer>
            <RightHeaderContainer>         
            <h2>About  <img src={logoImg} className="happicard-img"></img></h2>        
                <div className="about-div">
                <p>
                Happicard is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                </p>
                <p>
                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                </div>
          
    
            </RightHeaderContainer>
            </div>

            <div className="process-body">           
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
                   <Contact/>
        </BodyContainer>
    </>
    );
  }
}


export default about;