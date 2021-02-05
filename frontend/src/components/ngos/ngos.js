import React, { useEffect, useState, useRef, useCallback } from "react";
import Slider from "react-slick";
import { BodyContainer } from "../ngos/ngosStyles";
import axios from "../../utils/axios";

const ngos = () => {
  const [ngos, setNgos] = useState([]);
  const [maxRange, setMaxRange] = useState(6);

  const loadMore = useCallback(() => {
    setMaxRange((prevRange) => prevRange + 3);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  function Card(props) {
    return (
      <div className="col-sm-4">
        <div
          className="card"
          style={{ borderRadius: "0.65rem", marginBottom: "10px" }}
        >
          <div className="card-body">
            <input type="radio" value={props.id} />
            <h6 className="card-title" style={{ color: "#D7383B" }}></h6>
            <div style={{ paddingBottom: "32px" }}>
              <img
                src={props.image}
                style={{
                  borderRadius: "50%",
                  width: "125px",
                  height: "125px",
                  float: "left",
                }}
              />
            </div>
            <p
              className="card-text"
              style={{
                paddingTop: "10px",
                fontSize: "9px",
                display: "inline",
                letterSpacing: "0.2px",
                color: "grey",
                fontFamily: "Helvetica Neue, Helvetica, sans-serif",
              }}
            >
              <h5
                style={{
                  marginLeft: "2px",
                  marginRight: "2px",
                  color: "#D7383B",
                }}
              >
                {props.title}
              </h5>{" "}
              <span
                style={{
                  marginLeft: "2px",
                  marginRight: "2px",
                }}
              >
                Category: {props.category}
              </span>{" "}
            </p>
          </div>
          <div
            className="card-footer"
            style={{ textAlign: "left", fontSize: "12px", lineHeight: "28px" }}
          >
            I’m a paragraph. Click here to add your own text and edit me. It’s
            easy. Just click “Edit Text” or double click me to add your own
            content and make changes to the font.
          </div>
        </div>
      </div>
    );
  }

  const NgosList = () =>
    ngos.slice(0, maxRange).map((item, index) => {
      return (
        <Card
          image={item.image}
          title={item.title}
          category={item.ngo_category}
          about={item.about}
          id={index}
          key={index}
        />
      );
    });

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const getNgosList = async () =>
      await axios
        .get(`https://dev.api.happicard.se/api/profiles/list/ngo/`, config)
        .then((response) => {
          setNgos(response.data);
        });
    getNgosList();
  }, []);

  return (
    <>
      <BodyContainer style={{ backgroundColor: "white" }}>
        <Slider {...settings}>
          {" "}
          <div>
            {" "}
            <img
              src="https://happicard-ngos-dev.s3.amazonaws.com/profiles/afrika-grupperna.png"
              style={{ width: "100%" }}
            ></img>
          </div>
          <div>
            {" "}
            <img
              src="https://happicard-ngos-dev.s3.amazonaws.com/profiles/afrika-grupperna.png"
              style={{ width: "100%" }}
            ></img>
          </div>
          <div>
            {" "}
            <img
              src="https://happicard-ngos-dev.s3.amazonaws.com/profiles/afrika-grupperna.png"
              style={{ width: "100%" }}
            ></img>
          </div>
        </Slider>
        <div
          className="container"
          style={{ marginTop: "25px", backgroundColor: "white" }}
        >
          <div className="row" style={{ paddingTop: "25px", color: "#FFC542" }}>
            <div className="col-sm">
              <h2 style={{ paddingBottom: "25px" }}>NGOS</h2>
            </div>
            <div className="col-sm" style={{ textAlign: "right" }}>
              <select
                style={{
                  marginRight: "4px",
                  border: "2px solid #FFC542",
                  color: "#FFC542 !important",
                }}
              >
                <option style={{ color: "black !important" }}>Category</option>
              </select>
              <select>
                <option>Sort by: Most Popular</option>
              </select>
            </div>
          </div>
          <div
            className="row justify-content-md-center"
            style={{ textAlign: "center" }}
          >
            {ngos && <NgosList />}
          </div>
          <div
            className="row"
            style={{
              textAlign: "center",
              display: "block",
              paddingBottom: "15px",
              paddingTop: "15px",
            }}
          >
            {ngos.length > 6 && (
              <button
                onClick={loadMore}
                style={{
                  outline: "none",
                  width: "175px",
                  color: "#FFC541",
                  border: "2px solid #FFC541",
                  borderRadius: "28px",
                  backgroundColor: "#FFFF",
                }}
              >
                See more
              </button>
            )}
          </div>
        </div>
      </BodyContainer>
    </>
  );
};

export default ngos;
