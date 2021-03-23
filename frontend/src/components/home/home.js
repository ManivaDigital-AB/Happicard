import React, { Component, useState, useEffect } from "react";
import LandingPageList from "../../components/LandingPageList/LandingPageList";
import Slider from "react-slick";
import LandingImg from "../../assets/images/landingpage_image.PNG";
import { Link, useParams } from "react-router-dom";
import { BodyContainer } from "../home/homeStyle";
import { useHistory } from "react-router-dom";

import axios from "../../utils/axios";

const home = () => {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    const [showMore, setShowMore] = useState(false);
    const [homePageCMS, sethomePageCMS] = useState({});
    
    const history = useHistory();
    
    const handleClick = () => {
      history.push({
        pathname: '/',
        state: {
          selectedValue: "giftCards"
        }
      });
    }
    
    useEffect(() => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
      axios
          .get(`http://35.161.152.123/api/customizations/list/homepage/`, config)
          .then((response) => {
            sethomePageCMS(response.data[0]);
          });
    }, []);

    return (
      <>
        <BodyContainer>
           <Slider {...settings}>
            {" "}
            <div>
              {" "}
              <img
                src=
                  {
                    homePageCMS.home_page_carousel_img_1
                  }
                
                style={{ width: "100%" }}
              ></img>
            </div>
            <div>
              {" "}
              <img
                src={
                  homePageCMS.home_page_carousel_img_2
                }
                style={{ width: "100%" }}
              ></img>
            </div>
            <div>
              {" "}
              <img
                src={
                  homePageCMS.home_page_carousel_img_3
                }
                style={{ width: "100%" }}
              ></img>
            </div>
          </Slider>
          <div>
            {" "}
            <h1 style={{
              position: "absolute",
              top: "40%",
              left: "75%",
              transform: "translate(-50%, -50%)",
              color: "#FFF",
              fontStyle: "italic",
              letterSpacing :"1px",
              fontSize: "60px"
            }}>Welcome to happicard</h1>
            <button style={{
              position: "absolute",
              top: "58%",
              left: "69%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "transparent",
              border:"3px solid #fff",
              borderRadius: "25px",
              outline: "none",
              fontSize: "18px",
              fontWeight:"500",
              width: "200px",
              height: "45px",
              color: "#FFF"
            }} onClick={handleClick}>See more</button>
          </div>
          <div style={{ padding: "30px", backgroundColor: "white" }}>
            <LandingPageList showMore={showMore} setShowMore={setShowMore} props={homePageCMS}/>
          </div>
        </BodyContainer>
      </>
    );
  }

  export default home;
