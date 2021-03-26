import React, { Component, useState, useEffect } from "react";
import LandingPageList from "../../components/LandingPageList/LandingPageList";
import Slider from "react-slick";
import LandingImg from "../../assets/images/landingpage_image.PNG";
import { Link, useParams } from "react-router-dom";
import { BodyContainer, SeeMore } from "../home/homeStyle";
import { useHistory } from "react-router-dom";
import logo from "../../assets/images/logo.PNG";
import { landingPageService } from "../../_services/landingpage.service";
import oval from "../../assets/images/Oval.PNG";


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
    const [isMobileGiftCardClicked, setisMobileGiftCardClicked] = useState(false);
    const [mobileGiftCardItems, setmobileGiftCardItems] = useState([]);
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

    const handleMobileClickGiftCards = () => {
      landingPageService.getAllGiftCards().then((x) => {
        setmobileGiftCardItems(x);
      });
    }

    function Card(props) {
      return (
      <div class="col-5">
      <div class="card image-container" style={{backgroundColor: "#E1DBD8", marginBottom: "25px"}}>
        <div class="card-body ingredients" style={{padding: "5px"}}>
        <div style={{textAlign: "center"}}>
          <img src={oval} style={{width: "12px", paddingBottom: "2px"}}/>
          <h6 className="card-title" style={{ color: "#4A4746", fontSize: "12px" }}>
                 {props.name}
              </h6></div>
        <img src={props.image} style={{ borderRadius: "0.65rem", width: "100%", height: "auto" }}/>
          <p class="card-text" style={{
                  paddingTop: "10px",
                  fontSize: "9px",
                  letterSpacing: "0.2px",
                  color: "grey",
                  fontFamily: "Helvetica Neue, Helvetica, sans-serif",
                  textAlign: "center"
                }}>{props.title}{" "}|{" "}Online</p>
        </div>
      </div>
    </div>
   
      );
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
          <img className="mobileLogo" src={logo} style={{top : "2%", width: "120px", margin: "25px"}}/>
          {!isMobileGiftCardClicked && <Slider {...settings}>
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
          </Slider>}
          {
            isMobileGiftCardClicked && <div className="col-sm"><img style={{width: "100%"}} src={homePageCMS.home_page_giftcards_img}/></div> 
          }
          <SeeMore>
            {" "}
            <h1>Welcome to happicard</h1>
            <button onClick={handleClick}>See more</button>
          </SeeMore>
          <div style={{ padding: "30px", backgroundColor: "white" }}>
            <LandingPageList 
              showMore={showMore}
              setShowMore={setShowMore}
              props={homePageCMS}
              setisMobileGiftCardClicked={setisMobileGiftCardClicked}
              setmobileGiftCardItems={setmobileGiftCardItems}
              handleMobileClickGiftCards={handleMobileClickGiftCards}
              />
          </div>
        </BodyContainer>
        <div className="row justify-content-center" style={{backgroundColor: "#FFF"}}>
          { 
            mobileGiftCardItems.length > 0 && mobileGiftCardItems.map((item, index) => {
              return <Card
             id={item.id}
             name={item.title}
             image={item.image}
             title={item.store_category}
             key={index}
           />
          })
          }
          </div>
      </>
    );
  }

  export default home;
