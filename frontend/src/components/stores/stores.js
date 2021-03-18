import React, { useEffect, useState, useCallback } from "react";
import Slider from "react-slick";
import { BodyContainer } from "../stores/storeStyles";
import axios from "../../utils/axios";
import StoreDetails from "./storeDetails";

const stores = () => {
  const [stores, setStores] = useState([]);
  const [filteredStores, setfilteredStores] = useState([]);
  const [maxRange, setMaxRange] = useState(6);
  const [displayStoreDetail, setDisplayStoreDetail] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [displayFilteredStores, setdisplayFilteredStores] = useState(false);

  const loadMore = useCallback(() => {
    setMaxRange((prevRange) => prevRange + 3);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  function handleClick(item) {
    setDisplayStoreDetail(!displayStoreDetail);
    setSelectedItem(item);
  }

  const storeCategories = 
    [["Mode","Mode"],
    ["Mode kvinna","Mode kvinna"],
    ["Mode herr","Mode herr"],
    ["Hus & Hem","Hus & Hem"],
    ["Livsmedel","Livsmedel"],
    ["Mat & Dryck","Mat & Dryck"],
    ["Musik, Böcker & Spel","Musik, Böcker & Spel"],
    ["Semester & Resor","Semester & Resor"],
    ["Underhållning & Upplevelser","Underhållning & Upplevelser"],
    ["Electronics","Electronics"],
    ["Home & Garden","Home & Garden"]]

  const handleFilter = (evt) => {
      evt.target.value != "" ? setdisplayFilteredStores(true) : setdisplayFilteredStores(false);
      let existingStores = [];
      stores.filter((item) => {if( item.store_category == evt.target.value){existingStores.push(item);}});
      setfilteredStores(existingStores);
      console.log(evt.target.value);
  }

  function Card(props) {
    return (
      <div className="col-sm-4" onClick={() => handleClick(props.props)}>
        <div
          className="card"
          style={{
            borderRadius: "14px",
            border: "2.2px solid #B2A8A4",
            marginBottom: "10px",
            backgroundColor: "#E1DBD8"
          }}
        >
          <div className="card-body">
            <input type="radio" value={props.props.id} />
            <h6 className="card-title"></h6>
            <div style={{ paddingBottom: "32px" }}>
              <img
                src={props.props.header_image}
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
                  color: "#4A4746",
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
              backgroundColor: "#E1DBD8",
              borderBottomColor: "#E1DBD8",
              borderTop: "none",
              borderRadius: "12px"
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

  const FilteredStoresList = () =>
    filteredStores.slice(0, maxRange).map((item, index) => {
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
        {/* <Slider {...settings}>
          {" "}
          <div>
            {" "}
            <img
              src="https://happicard-stores-dev.s3.amazonaws.com/profiles/strump-maskinen-adjust.png"
              style={{ width: "100%" }}
            ></img>
          </div>
          <div>
            {" "}
            <img
              src="https://happicard-stores-dev.s3.amazonaws.com/profiles/strump-maskinen-adjust.png"
              style={{ width: "100%" }}
            ></img>
          </div>
          <div>
            {" "}
            <img
              src="https://happicard-stores-dev.s3.amazonaws.com/profiles/strump-maskinen-adjust.png"
              style={{ width: "100%" }}
            ></img>
          </div>
        </Slider> */}
        <div>
            {" "}
            <img
              src="https://happicard-stores-dev.s3.amazonaws.com/profiles/strump-maskinen-adjust.png"
              style={{ width: "100%" }}
            ></img>
          </div>
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
              <div className="col-sm-2" style={{marginRight: "92px"}}>
                <div className="selectdiv">
                  <label>
                    {" "}
                    <select onChange={handleFilter}>
                    { storeCategories.map(([value, name]) => (
                          <option style={{border:"2px solid #ffc542"}} value={value} key={value}>{name}</option>
                        ))
                    }
                    </select>
                  </label>
                </div>
              </div>
              {/* <div className="col-sm-2" style={{marginRight: "92px"}}>
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
              </div> */}
            </div>
            <div
              className="row justify-content-md-start"
              style={{ textAlign: "center" }}
            >
              {!displayFilteredStores && stores && <StoresList />}
              {displayFilteredStores && filteredStores && <FilteredStoresList/>}
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
