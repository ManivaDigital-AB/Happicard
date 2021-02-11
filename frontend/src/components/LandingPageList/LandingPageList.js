import React, { useState } from "react";
import giftImg from "../../assets/images/gift_card_01.PNG";
import offersImg from "../../assets/images/happi_offers_02.PNG";
import campaignsImg from "../../assets/images/campaigns_01.PNG";
import styled from "styled-components";
import { landingPageService } from "../../_services/landingpage.service";
import { Modal } from "react-bootstrap";
import Counter from "./Counter";
import axios from "../../utils/axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: white};
  color: black;

  font-size: 1em;
  font-weight: bold;
  font-family: Helvetica Neue, Helvetica, sans-serif;

  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid  #FFC541;
  border-radius: 28px;
  width: 140px;
  outline: none;
`;

const ListImg = styled.img`
  width: 350px;
  padding: 5px 5px 5px 5px;
  @media only screen and (max-width: 600px) {
    width: 200px;
  }
`;

const LandingPageList = () => {
  const [displayGiftCards, setDisplayGiftCards] = useState(false);
  const [displayHappiOffers, setDisplayHappiOffers] = useState(false);
  const [displayCampaigns, setDisplayCampaigns] = useState(false);
  const [giftCards, setGiftCards] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [offers, setOffers] = useState([]);
  const [selectedItem, setSelectedItem] = useState({
    id: "",
  });

  const [show, setShow] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [orderId] = useState("");
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [parentCounter, setParentCounter] = useState(0);

  const history = useHistory();

  const clickGiftCards = () => {
    if (displayGiftCards) {
      setDisplayGiftCards(false);
    } else {
      setDisplayGiftCards(true);
      landingPageService.getAllGiftCards().then((x) => setGiftCards(x));
    }
    setDisplayHappiOffers(false);
    setDisplayCampaigns(false);
  };

  const clickHappiOffers = () => {
    if (displayHappiOffers) {
      setDisplayHappiOffers(false);
    } else {
      setDisplayHappiOffers(true);
      landingPageService.getAllOffers().then((x) => setOffers(x));
    }
    setDisplayGiftCards(false);
    setDisplayCampaigns(false);
  };

  const clickCampaigns = () => {
    if (displayCampaigns) {
      setDisplayCampaigns(false);
    } else {
      setDisplayCampaigns(true);
      landingPageService.getAllCampaigns().then((x) => setCampaigns(x));
    }
    setDisplayGiftCards(false);
    setDisplayHappiOffers(false);
  };

  const handleChange = (params) => {
    let filteredItem = {};

    if (displayGiftCards)
      filteredItem = giftCards.filter((item) => item.id === params.id);
    else if (displayHappiOffers)
      filteredItem = offers.filter((item) => item.id === params.id);
    else if (displayCampaigns)
      filteredItem = campaigns.filter((item) => item.id === params.id);
    let product = filteredItem[0];
    product.isGiftCardOrOffer =
      displayGiftCards || displayHappiOffers ? true : false;
    setSelectedItem(product);
    handleShow();
  };

  const handlePriceChange = (e) => {
    setSelectedPrice(e.target.value);
  };

  const onCreateOrder = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      let url = selectedItem.isGiftCardOrOffer
        ? `http://35.161.152.123/api/orders/create/giftcard-to-basket/`
        : `http://35.161.152.123/api/orders/create/campaign-to-basket/`;

      await axios
        .post(
          url,
          JSON.stringify({
            giftcard: selectedItem.id,
            quantity: parentCounter,
            price_choice: selectedPrice,
            ordered: "true",
          }),
          config
        )
        .then((response) => {
          var data = response.data;
          if (data != null) {
            dispatch({ type: "CREATE_ORDER_REQUEST", payload: response.data });
            dispatch({ type: "SELECTED_ITEM_ORDER", payload: selectedItem });
            history.push("/createorder");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  function Card(props) {
    return (
      <div
        className="col-sm-3 ml-3 mb-3"
        onClick={() => handleChange(props)}
        style={{ cursor: "pointer" }}
      >
        <div
          className="card"
          style={{ borderRadius: "0.65rem", marginBottom: "10px" }}
        >
          <div className="card-body">
            {/* <input
              type="radio"
              value={props.id}
              checked={selectedItem.id == props.id}
              onChange={handleChange}
            /> */}
            <h6 className="card-title" style={{ color: "#D7383B" }}>
              {props.name}
            </h6>
            <img
              src={props.image}
              style={{ borderRadius: "0.65rem", width: "100%", height: "auto" }}
            />
            <p
              className="card-text"
              style={{
                paddingTop: "10px",
                fontSize: "9px",

                letterSpacing: "0.2px",
                color: "grey",
                fontFamily: "Helvetica Neue, Helvetica, sans-serif",
              }}
            >
              <span
                style={{
                  marginLeft: "2px",
                  marginRight: "2px",
                }}
              >
                Category: {props.title}
              </span>{" "}
              <span style={{ color: "#D7383B" }}>| </span>{" "}
              <span
                style={{
                  marginLeft: "2px",
                  marginRight: "2px",
                }}
              >
                {" "}
                Online{" "}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <div style={{ border: "8px solid #ffff", borderRadius: "0.3rem" }}>
          <Modal.Header
            closeButton
            style={{ backgroundColor: "#ffc541", border: "none" }}
          ></Modal.Header>
          <Modal.Body style={{ backgroundColor: "#ffc541" }}>
            <div className="row" style={{ fontSize: "12px" }}>
              <div className="col-sm">
                {" "}
                <img
                  src={selectedItem.image}
                  style={{
                    borderRadius: "0.65rem",
                    width: "100%",
                    height: "auto",
                  }}
                />
              </div>
              <div className="col-sm">
                <h6 style={{ paddingBottom: "12px" }}>{selectedItem.title}</h6>
                <div>
                  <label style={{ marginRight: "2px", fontWeight: "bold" }}>
                    Category:
                  </label>{" "}
                  {selectedItem.store_category}
                </div>

                <div>
                  <label style={{ marginRight: "4px", fontWeight: "bold" }}>
                    Amount:
                  </label>
                  <select onChange={handlePriceChange}>
                    <option value="">select</option>
                    <option value={selectedItem.price_option_1}>
                      {selectedItem.price_option_1} SEK
                    </option>
                    <option value={selectedItem.price_option_2}>
                      {selectedItem.price_option_2} SEK
                    </option>
                    <option value={selectedItem.price_option_3}>
                      {selectedItem.price_option_3} SEK
                    </option>
                  </select>
                </div>

                <div>
                  <label style={{ marginRight: "4px", fontWeight: "bold" }}>
                    Quantity:
                  </label>
                  <Counter setParentCounter={setParentCounter} />
                </div>
              </div>
            </div>
            <div
              className="row"
              style={{ padding: "18px 18px 18px 18px", fontSize: "12px" }}
            >
              <p style={{ fontWeight: "bold" }}>About:</p>
              <p>{selectedItem.description}</p>
            </div>
            <div
              className="row"
              style={{
                padding: "18px 18px 18px 18px",
                fontSize: "12px",
                display: "block",
                textAlign: "center",
              }}
            >
              <button
                style={{
                  backgroundColor: "#FFFF",
                  border: "none",
                  height: "35px",
                  borderRadius: "16px",
                  width: "200px",
                  marginRight: "30px",
                  outline: "none",
                }}
                onClick={onCreateOrder}
              >
                Buy for Myself
              </button>
              <button
                style={{
                  backgroundColor: "#B2A8A4",
                  border: "none",
                  height: "35px",
                  borderRadius: "16px",
                  width: "200px",
                  outline: "none",
                }}
                onClick={onCreateOrder}
              >
                Buy for Someone Else
              </button>
            </div>
          </Modal.Body>
        </div>
      </Modal>
      <div
        className="row justify-content-md-center"
        style={{ paddingTop: "20px" }}
      >
        <div className="col-sm-3">
          <div style={{ textAlign: "center" }}>
            <ListImg src={giftImg} />
            <Button
              onClick={clickGiftCards}
              style={{
                backgroundColor: displayGiftCards ? "#FFC541" : "",
                outline: "none",
              }}
            >
              Gift Cards
            </Button>
          </div>
        </div>
        <div className="col-sm-3">
          <div style={{ textAlign: "center" }}>
            <ListImg src={offersImg} />
            <Button
              onClick={clickHappiOffers}
              style={{
                backgroundColor: displayHappiOffers ? "#FFC541" : "",
                outline: "none",
              }}
            >
              Happi Offers
            </Button>
          </div>
        </div>
        <div className="col-sm-3">
          <div style={{ textAlign: "center" }}>
            <ListImg src={campaignsImg} />
            <Button
              onClick={clickCampaigns}
              style={{
                backgroundColor: displayCampaigns ? "# #FFC541" : "",
                outline: "none",
              }}
            >
              Campaigns
            </Button>
          </div>
        </div>
      </div>
      <div
        className="row justify-content-md-center"
        style={{ textAlign: "center", paddingBottom: "10px" }}
      >
        {displayGiftCards &&
          giftCards.length > 0 &&
          giftCards.map((item, index) => (
            <Card
              id={item.id}
              name={item.title}
              image={item.image}
              title={item.store_category}
              key={index}
            />
          ))}
      </div>

      <div
        className="row justify-content-md-center"
        style={{ textAlign: "center", paddingBottom: "10px" }}
      >
        {displayHappiOffers &&
          offers.length > 0 &&
          offers.map((item, index) => (
            <Card
              id={item.id}
              name={item.title}
              image={item.image}
              title={item.store_category}
              key={index}
            />
          ))}
      </div>

      <div
        className="row justify-content-md-center"
        style={{ textAlign: "center", paddingBottom: "10px" }}
      >
        {displayCampaigns &&
          campaigns.length > 0 &&
          campaigns.map((item, index) => (
            <Card
              id={item.id}
              name={item.title}
              image={item.image}
              title={item.ngo_category}
              key={index}
            />
          ))}
      </div>
    </>
  );
};

export default LandingPageList;
