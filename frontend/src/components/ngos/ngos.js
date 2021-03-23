import React, { useEffect, useState, useRef, useCallback } from "react";
import Slider from "react-slick";
import { BodyContainer } from "../ngos/ngosStyles";
import axios from "../../utils/axios";
import NgoDetails from "./ngoDetails";
import { stubFalse } from "lodash";

const ngos = () => {
  const [ngos, setNgos] = useState([]);
  const [filteredNgos, setfilteredNgos] = useState([]);
  const [maxRange, setMaxRange] = useState(6);
  const [displayNgoDetail, setDisplayNgoDetail] = useState(false);
  const [ngoCards, setNgoCards] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [displayFilteredNgos, setdisplayFilteredNgos] = useState(false);

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

  const ngoCategories = 
[["Alla kategorier","Alla kategorier"],
["Anhörigstöd","Anhörigstöd"],
["Barn","Barn"],
["Mode herr","Mode herr"],
["Bevarande projekt","Bevarande projekt"],
["Fadderverksamhet","Fadderverksamhet"],
["Familjer","Familjer"],
["Flyktingar","Flyktingar"],
["Förebyggande arbete","Förebyggande arbete"],
["Föräldralösa barn","Föräldralösa barn"],
["Hemlösa","Hemlösa"],
["Föräldralösa barn","Föräldralösa barn"],
["Hjälp till enskilda","Hjälp till enskilda"],
["Föräldralösa barn","Föräldralösa barn"],
["Hjälp till självhjälp","Hjälp till självhjälp"],
["Jordbruk","Jordbruk"],
["Jämställdhet","Jämställdhet"],
["Jordbruk","Jordbruk"],
["Katastrofhjälp","Katastrofhjälp"],
["Kvinnor","Kvinnor"],
["Mikrolån/Mikrokrediter","Mikrolån/Mikrokrediter"],
["Personalutveckling","Personalutveckling"],
["Rehabilitering","Rehabilitering"],
["Rättshjälp","Rättshjälp"],
["Second hand","Second hand"],
["Sjukhus/Vårdhem/Äldreboende","Sjukhus/Vårdhem/Äldreboende"],
["Skyddat boende","Skyddat boende"],
["Telefonjour","Telefonjour"],
["Trafficking","Trafficking"],
["Ungdom","Ungdom"],
["Utbildning - grund","Utbildning - grund"],
["Utbildning - högre","Utbildning - högre"],
["Utbildning - yrkes","Utbildning - yrkes"],
["Vatten/Sanitets projekt","Vatten/Sanitets projekt"],
["Verksamhet för sjuka","Verksamhet för sjuka"],
["Volontärer","Volontärer"],
["Vuxna","Vuxna"],
["Äldre","Äldre"],
["Annat","Annat"],["Youth","Youth"],["Literary","Literary"]]

  function Card(props) {
    return (
      <div className="col-sm-4" onClick={() => handleClick(props.props)}>
        <div
          className="card"
          style={{ borderRadius: "0.65rem", marginBottom: "10px", backgroundColor: "#E1DBD8" }}
        >
          <div className="card-body">
            <input type="radio" value={props.props.id} />
            <h6 className="card-title" style={{ color: "#D7383B" }}></h6>
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
                  color: "rgb(74,71,70)",
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
                Category: {props.props.ngo_category}
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

  function handleClick(item) {
    setDisplayNgoDetail(!displayNgoDetail);
    setSelectedItem(item);
  }

  const handleFilter = (evt) => {
    evt.target.value != "Alla kategorier" ? setdisplayFilteredNgos(true) : setdisplayFilteredNgos(false);
    let existingNgos = [];
    ngos.filter((item) => {if( item.ngo_category == evt.target.value){existingNgos.push(item);}});
    setfilteredNgos(existingNgos);
    console.log(evt.target.value);
}

  const NgosList = () =>
    ngos.slice(0, maxRange).map((item, index) => {
      return <Card props={item} key={index} />;
    });

    const FilteredNgosList = () =>
    filteredNgos.slice(0, maxRange).map((item, index) => {
      return <Card props={item} key={index} />;
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
        .get(` http://35.161.152.123/api/profiles/list/ngos/`, config)
        .then((response) => {
          setNgos(response.data);
        });
    getNgosList();
  }, []);

  return (
    <>
      <BodyContainer style={{ backgroundColor: "white" }}>
        {/* <Slider {...settings}>
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
        </Slider> */}
         <div>
            {" "}
            <img
              src="https://happicard-ngos-dev.s3.amazonaws.com/profiles/afrika-grupperna.png"
              style={{ width: "100%" }}
            ></img>
          </div>
        {!displayNgoDetail && (
          <div
            className="container"
            style={{ marginTop: "25px", backgroundColor: "white" }}
          >
            <div
              className="row"
              style={{ paddingTop: "25px", color: "#FFC542" }}
            >
              <div className="col-sm">
                <h2 style={{ paddingBottom: "25px" }}>NGOS</h2>
              </div>
            <div className="col-sm">
            <div className="selectdiv" style={{float: "right"}}>
                  <label style={{float: "right"}}>
                    {" "}
                    <select onChange={handleFilter}>
                    { ngoCategories.map(([value, name]) => (
                          <option style={{border:"2px solid #ffc542"}} value={value} key={value}>{name}</option>
                        ))
                    }
                    </select>
                  </label>
                </div>
              </div>
              {/* <div className="col-sm">
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
              {!displayFilteredNgos && ngos && <NgosList />}
              {displayFilteredNgos && filteredNgos && <FilteredNgosList/>}
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
        )}
        {displayNgoDetail && (
          <div>
            <NgoDetails selectedItem={selectedItem} />
          </div>
        )}
      </BodyContainer>
    </>
  );
};

export default ngos;
