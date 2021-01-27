import React, { useState } from "react";
import giftImg from "../../assets/images/gift_card_01.PNG";
import offersImg from "../../assets/images/happi_offers_02.PNG";
import campaignsImg from "../../assets/images/campaigns_01.PNG";
import giftCardListImg from "../../assets/images/gift_card_list_01.PNG";
import happiOffersListImg from "../../assets/images/happi_offers_list_01.PNG";
import campaignsListImg from "../../assets/images/campaigns_image_list_01.PNG";
import styled from "styled-components";
import ProductList from "../../components/productList/productList";
import { landingPageService } from "../../_services/landingpage.service";
import { Button as ModalButton, Modal, Dropdown } from "react-bootstrap";
import Counter from "./Counter";
import axios from "../../utils/axios";
// import history from "../../utils/history";
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
  const [orderId, setOrderId] = useState("");
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const handleChange = (e) => {
    console.log(e.target.value);
    setSelectedItem({ id: e.target.value });
    handleShow();
  };

  const onCheckoutClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://dev.api.happicard.se/api/orders/checkout/?id=ec740eba-f5f5-4dc1-a034-7c4ced3c1c77`
      );
      // Send a request to active cart to add/update the order_id.
      dispatch({ type: "CHECKOUT_REQUEST", payload: response.data });
      history.push("/checkout");
    } catch (err) {
      console.log(err);
    }
  };

  const onOrderSubmit = async (e) => {
    e.preventDefault();
    if (orderId.length) {
      try {
        const response = await axios.get(
          `/checkout/v3/orders/${orderId}`,
          klarnaOrderUpdateBody,
          {
            auth: {
              username: process.env.REACT_APP_KLARNA_USERNAME,
              password: process.env.REACT_APP_KLARNA_PASSWORD,
            },
          }
        );

        dispatch({ type: "CHECKOUT_REQUEST", payload: response.data });
        history.push("/checkout");
      } catch (err) {
        console.log(err);
      }
    }
  };

  function Test(props) {
    return (
      <div className="col-sm-4">
        <div
          className="card"
          style={{ borderRadius: "0.65rem", marginBottom: "10px" }}
        >
          <div className="card-body">
            <input
              type="radio"
              value={props.id}
              checked={selectedItem.id == props.id}
              onChange={handleChange}
            />
            <h6 className="card-title" style={{ color: "red" }}>
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
                fontSize: "12px",

                letterSpacing: "0.2px",
                color: "grey",
                fontFamily: "Helvetica Neue, Helvetica, sans-serif",
              }}
            >
              Category: {props.title} | Online
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#ffc541" }}
        ></Modal.Header>
        <Modal.Body style={{ backgroundColor: "#ffc541" }}>
          <div className="row" style={{ fontSize: "12px" }}>
            <div className="col-sm">
              {" "}
              <img
                src="https://happicard-stores-dev.s3.amazonaws.com/giftcards/strumpmaskinen.png"
                style={{
                  borderRadius: "0.65rem",
                  width: "100%",
                  height: "auto",
                }}
              />
            </div>
            <div className="col-sm">
              <h6>Strumpmaskinen</h6>
              <div>
                <label style={{ marginRight: "2px" }}>Category:</label> fashion
              </div>
              <br />
              <div>
                <label style={{ marginRight: "4px" }}>Amount:</label>
                <select>
                  <option value="1">500 SEK</option>
                  <option value="2">600 SEK</option>
                  <option value="3">700 SEK</option>
                </select>
              </div>
              <br />
              <div>
                <label style={{ marginRight: "4px" }}>Quantity:</label>
                <Counter />
              </div>
            </div>
          </div>
          <div
            className="row"
            style={{ padding: "18px 18px 18px 18px", fontSize: "12px" }}
          >
            <p>About:</p>
            <p>
              We at StrumpMaskinen are stocking lovers who are committed to
              helping other stocking lovers express their love for their
              friends, family and pets. Of course, we print all kinds of pets
              and people, in all shapes and colors.
            </p>
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
                backgroundColor: "#B2A8A4",
                border: "none",
                height: "35px",
                borderRadius: "16px",
                width: "200px",
              }}
              onClick={onCheckoutClick}
            >
              Buy
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <div className="row" style={{ paddingTop: "75px" }}>
        <div className="col-sm">
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
        <div className="col-sm">
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
        <div className="col-sm">
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
        className="row"
        style={{ textAlign: "center", paddingBottom: "10px" }}
      >
        {displayGiftCards &&
          giftCards.length > 0 &&
          giftCards.map((item, index) => (
            <Test
              id={item.id}
              name={item.title}
              image={item.image}
              title={item.store_category}
              key={index}
            />
          ))}
      </div>

      <div
        className="row"
        style={{ textAlign: "center", paddingBottom: "10px" }}
      >
        {displayHappiOffers &&
          offers.length > 0 &&
          offers.map((item, index) => (
            <Test
              id={item.id}
              name={item.title}
              image={item.image}
              title={item.store_category}
              key={index}
            />
          ))}
      </div>

      <div
        className="row"
        style={{ textAlign: "center", paddingBottom: "10px" }}
      >
        {displayCampaigns &&
          campaigns.length > 0 &&
          campaigns.map((item, index) => (
            <Test
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
