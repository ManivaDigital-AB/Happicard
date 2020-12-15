import React from "react";
import Navbar from "./Nav/Navbar";
import Slider from "react-slick";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Navbar />
        <Slider {...settings}>
          {" "}
          <div></div>
        </Slider>
        App
      </div>{" "}
    </div>
  );
}

export default App;
