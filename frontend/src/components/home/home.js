import React, { Component, useState } from "react";
import LandingPageList from "../../components/LandingPageList/LandingPageList";
import Slider from "react-slick";
import LandingImg from "../../assets/images/coming_soon.PNG";
import { Link } from "react-router-dom";
import { BodyContainer } from "../home/homeStyle";
class home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

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
        <div className="container">
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
        </div>
        <BodyContainer>
          {" "}
          <img src={LandingImg} style={{ width: "100%" }}></img>
          {/* <Link to="/about">Läs Mer</Link> */}
          {/* <div className="row" style={{padding : "30px"}}>   
        <LandingPageList />
        </div> */}
        </BodyContainer>
      </>
    );
  }
}

export default home;
