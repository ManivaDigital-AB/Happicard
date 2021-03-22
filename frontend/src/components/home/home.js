import React, { Component, useState, useEffect } from "react";
import LandingPageList from "../../components/LandingPageList/LandingPageList";
import Slider from "react-slick";
import LandingImg from "../../assets/images/landingpage_image.PNG";
import { Link, useParams } from "react-router-dom";
import { BodyContainer } from "../home/homeStyle";
import { useHistory } from "react-router-dom";
const home = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    const [showMore, setShowMore] = useState(false);
    // const [showHappiOffers, setShowHappiOffers] = useState(false);
    // const [showGiftCard, setShowGiftCard] = useState(false);
    // const [showCampaigns, setShowCampaigns] = useState(false);
    const history = useHistory();
    
    const handleClick = () => {
      history.push({
        pathname: '/',
        state: {
          selectedValue: "giftCards"
        }
      });
    }

    // const { search } = useParams();

    // useEffect(() => {
    //   search == "giftCards" ? setShowMore(true) : setShowMore(false);
    //   search == "happiOffers" ? setShowHappiOffers(true) : setShowHappiOffers(false);
    //   search == "campaigns" ? setShowCampaigns(true) : setShowCampaigns(false);
    // }, [search]);

    return (
      <>
        <BodyContainer>
          {/* <Slider {...settings}>
            {" "}
            <div>
              {" "}
              <img
                src={
                  "https://happicard-ngos-dev.s3.amazonaws.com/profiles/afrika-grupperna.png"
                }
                style={{ width: "100%" }}
              ></img>
            </div>
            <div>
              {" "}
              <img
                src={
                  "https://happicard-ngos-dev.s3.amazonaws.com/profiles/afrika-grupperna.png"
                }
                style={{ width: "100%" }}
              ></img>
            </div>
            <div>
              {" "}
              <img
                src={
                  "https://happicard-ngos-dev.s3.amazonaws.com/profiles/afrika-grupperna.png"
                }
                style={{ width: "100%" }}
              ></img>
            </div>
          </Slider> */}
          <div>
            {" "}
            <img
              // src="https://happicard-ngos-dev.s3.amazonaws.com/profiles/afrika-grupperna.png"
              src={LandingImg}
              style={{ width: "100%", height: "550px"}}
            ></img>
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
            <LandingPageList showMore={showMore} setShowMore={setShowMore}/>
          </div>
        </BodyContainer>
      </>
    );
  }

  export default home;
