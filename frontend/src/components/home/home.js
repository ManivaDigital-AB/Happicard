import React, { Component, useState  } from 'react';
import LandingPageList from "../../components/LandingPageList/LandingPageList";
import Slider from "react-slick";
import happicard from "../../assets/images/happicard.PNG";
import {Link } from 'react-router-dom';
import {BodyContainer,LeftHeaderContainer,RightHeaderContainer,ElementProcess,BodyProcess,BodyProcessImg} from '../home/homeStyle'
import logoImg from "../../assets/images/happicard-logo.PNG";

class home extends Component {
  
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){  
    }  

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    
    return (     
    <>
      
     
        {/* <Slider {...settings}>
          {" "}
          <div>
            {" "}
            <img src={LandingImg} style={{ width: "100%" }}></img>
          </div>
          <div>
            {" "}
            <img src={LandingImg} style={{ width: "100%" }}></img>
          </div>
          <div>
            {" "}
            <img src={LandingImg} style={{ width: "100%" }}></img>
          </div>
        </Slider> */}
        {/* </div>
        <BodyContainer>
        {" "}
        <div className="row">     
        <div style={{width: "50%"}}>
          <p>Stay Tunned</p>
          <Link to="/about">Read More...</Link></div>     
           <img src={LandingImg} style={{ width: "50%" }}></img>
          
          </div> */}

        {/* <div className="row" style={{padding : "30px"}}>   
        <LandingPageList />
        </div> */}
      <BodyContainer>
        <div className="row">  
            <LeftHeaderContainer>     
            <div className="row about-div">
                  <img src={logoImg} className="happicard-img"></img> 
                  <h5> Vi lanserar inom kort</h5>
                  <p>
                  Happicard är en digital plattform som ger användare möjlighet att köpa, spara,
                  ta emot och lagra digitala presentkort.
                  Kontakt: info@happicard.se
                  </p>
                  <p>
                  <Link to="/about">Read More...</Link>
                  </p>
                  
            </div>        
            </LeftHeaderContainer>

            <RightHeaderContainer>         
               <img src={happicard} className="img-header"></img>   
            </RightHeaderContainer>

        </div>
      </BodyContainer>
   
    </>
    );
  }
}


export default home;
