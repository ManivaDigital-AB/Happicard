import React, { useEffect, useState, useRef, useCallback } from "react";
import Slider from "react-slick";
import { BodyContainer } from "../stores/storeStyles";
import axios from "../../utils/axios";
import StoreDetails from "./storeDetails";
import { Modal } from "react-bootstrap";

const stores = () => {
  const [stores, setStores] = useState([]);
  const [maxRange, setMaxRange] = useState(6);
  const [displayStoreDetail, setDisplayStoreDetail] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

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

  function handleClick(item) {
    setDisplayStoreDetail(!displayStoreDetail);
    setSelectedItem(item);
  }

  function Card(props) {
    return (
      <div className="col-sm-4" onClick={() => handleClick(props.props)}>
        <div
          className="card"
          style={{
            borderRadius: "14px",
            border: "2.2px solid #B2A8A4;",
            marginBottom: "10px",
          }}
        >
          <div className="card-body">
            <input type="radio" value={props.props.id} />
            <h6 className="card-title" style={{ color: "#D7383B" }}></h6>
            <div style={{ paddingBottom: "32px" }}>
              <img
                src={props.props.image}
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
                {props.props.title}
              </h5>{" "}
              <span
                style={{
                  marginLeft: "2px",
                  marginRight: "2px",
                }}
              >
                Category: {props.props.store_category}
              </span>{" "}
            </p>
          </div>
          <div
            className="card-footer truncate"
            style={{
              textAlign: "left",
              fontSize: "12px",
              lineHeight: "32px",
              backgroundColor: "#FFFF",
              borderTop: "none",
            }}
          >
            {props.props.about}
          </div>
        </div>
      </div>
    );
  }

  const StoresList = () =>
    stores.slice(0, maxRange).map((item, index) => {
      return <Card props={item} key={index} />;
    });

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const getstoreList = async () =>
      await axios
        .get(`http://35.161.152.123/api/profiles/list/stores/`, config)
        .then((response) => {
          setStores(response.data);
        });
    getstoreList();
  }, []);

  return (
    <>
      <BodyContainer style={{ backgroundColor: "white" }}>
        <Slider {...settings}>
          {" "}
          <div>
            {" "}
            <img
              src="https://happicard-stores-dev.s3.amazonaws.com/giftcards/strumpmaskinen.png"
              style={{ width: "100%" }}
            ></img>
          </div>
          <div>
            {" "}
            <img
              src="https://happicard-stores-dev.s3.amazonaws.com/giftcards/strumpmaskinen.png"
              style={{ width: "100%" }}
            ></img>
          </div>
          <div>
            {" "}
            <img
              src="https://happicard-stores-dev.s3.amazonaws.com/giftcards/strumpmaskinen.png"
              style={{ width: "100%" }}
            ></img>
          </div>
        </Slider>
        {!displayStoreDetail && (
          <div
            className="container"
            style={{ marginTop: "25px", backgroundColor: "white" }}
          >
            <div
              className="row"
              style={{ paddingTop: "25px", color: "#FFC542" }}
            >
              <div className="col-sm">
                <h2 style={{ paddingBottom: "25px" }}>STORES</h2>
              </div>
              <div className="col-sm">
                <div className="selectdiv">
                  <label>
                    {" "}
                    <select>
                      <option>Category</option>
                      <option>Fashion</option>
                      <option>Beauty</option>
                      <option>Home & Garden</option>
                      <option>Electronics</option>
                    </select>
                  </label>
                </div>
              </div>
              <div className="col-sm">
                <div className="selectdiv">
                  <label>
                    <select>
                      <option>Sort by: Most Popular</option>
                      <option>Sort by: Highest Discount</option>
                      <option>Sort by: Highest Cashback</option>
                      <option>Sort by: Brand Name</option>
                    </select>
                  </label>
                </div>
              </div>
            </div>
            <div
              className="row justify-content-md-center"
              style={{ textAlign: "center" }}
            >
              {stores && <StoresList />}
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
              {stores.length > 6 && (
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
        )}
        {displayStoreDetail && <StoreDetails selectedItem={selectedItem} />}
      </BodyContainer>
    </>
  );
};

export default stores;
