import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./components/Nav/Navbar";
import LandingPageList from "./components/LandingPageList/LandingPageList";
import LandingImg from "./assets/images/landing_carousel.PNG";
import Slider from "react-slick";

import "./index.css";
import Footer from "./components/footer/footer";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="App">
      <div className="container">
        <Navbar />
        <Slider {...settings}>
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
        </Slider>
        <LandingPageList />
        <Footer />
      </div>

      {/* <div className="container">
        <Navbar />

        <div className="row">
          
         
        </div>
        
      </div> */}
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
