import React, { useState } from "react";
import giftImg from "../../assets/images/gift_card_01.PNG";
import offersImg from "../../assets/images/happi_offers_02.PNG";
import giftCardListImg from "../../assets/images/gift_card_list_01.PNG";
import happiOffersListImg from "../../assets/images/happi_offers_list_01.PNG";
import campaignsListImg from "../../assets/images/campaigns_image_list_01.PNG";
import styled from "styled-components";
import ProductList from "../../components/productList/productList";

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: white};
  color: black;

  font-size: 1em;
  font-weight: bold;
  font-family: Helvetica Neue, Helvetica, sans-serif;

  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #DFB248;
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

  const clickGiftCards = () => {
    if (displayGiftCards) {
      setDisplayGiftCards(false);
    } else {
      setDisplayGiftCards(true);
    }
    setDisplayHappiOffers(false);
    setDisplayCampaigns(false);
  };

  const clickHappiOffers = () => {
    if (displayHappiOffers) {
      setDisplayHappiOffers(false);
    } else {
      setDisplayHappiOffers(true);
    }
    setDisplayGiftCards(false);
    setDisplayCampaigns(false);
  };

  const clickCampaigns = () => {
    if (displayCampaigns) {
      setDisplayCampaigns(false);
    } else {
      setDisplayCampaigns(true);
    }
    setDisplayGiftCards(false);
    setDisplayHappiOffers(false);
  };

  function Test(props) {
    return (
      <div className="row" style={{ textAlign: "center" }}>
        <div className="col-sm-4">
          <div className="card" style={{ borderRadius: "0.65rem" }}>
            <div className="card-body">
              <h6 className="card-title" style={{ color: "red" }}>
                {props.name}
              </h6>
              <img
                src={props.image}
                width="300"
                height="150"
                style={{ borderRadius: "0.65rem" }}
              />
              <p
                className="card-text"
                style={{
                  paddingTop: "10px",
                  fontSize: "12px",
                  wordSpacing: "6px",
                  letterSpacing: "0.2px",
                  color: "grey",
                  fontFamily: "Helvetica Neue, Helvetica, sans-serif",
                }}
              >
                {props.title}
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card" style={{ borderRadius: "0.65rem" }}>
            <div className="card-body">
              <h6 className="card-title" style={{ color: "red" }}>
                {props.name}
              </h6>
              <img
                src={props.image}
                width="300"
                height="150"
                style={{ borderRadius: "0.65rem" }}
              />
              <p
                className="card-text"
                style={{
                  paddingTop: "10px",
                  fontSize: "12px",
                  wordSpacing: "6px",
                  letterSpacing: "0.2px",
                  color: "grey",
                  fontFamily: "Helvetica Neue, Helvetica, sans-serif",
                }}
              >
                {props.title}
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card" style={{ borderRadius: "0.65rem" }}>
            <div className="card-body">
              <h6 className="card-title" style={{ color: "red" }}>
                {props.name}
              </h6>
              <img
                src={props.image}
                width="300"
                height="150"
                style={{ borderRadius: "0.65rem" }}
              />
              <p
                className="card-text"
                style={{
                  paddingTop: "10px",
                  fontSize: "12px",
                  wordSpacing: "6px",
                  letterSpacing: "0.2px",
                  color: "grey",
                  fontFamily: "Helvetica Neue, Helvetica, sans-serif",
                }}
              >
                {props.title}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="row" style={{ paddingTop: "75px" }}>
        <div className="col-sm">
          <div style={{ textAlign: "center" }}>
            <ListImg
              src={giftImg}
              // style={{ width: "350px", padding: "5px 5px 5px 5px" }}
            />
            <Button
              onClick={clickGiftCards}
              style={{
                backgroundColor: displayGiftCards ? "#dfb248" : "",
                outline: "none",
              }}
            >
              Gift cards
            </Button>
          </div>
        </div>
        <div className="col-sm">
          <div style={{ textAlign: "center" }}>
            <ListImg
              src={offersImg}
              // style={{ width: "350px", padding: "5px 5px 5px 5px" }}
            />
            <Button
              onClick={clickHappiOffers}
              style={{
                backgroundColor: displayHappiOffers ? "#dfb248" : "",
                outline: "none",
              }}
            >
              Happi offers
            </Button>
          </div>
        </div>
        <div className="col-sm">
          <div style={{ textAlign: "center" }}>
            <ListImg
              src={giftImg}
              // style={{ width: "350px", padding: "5px 5px 5px 5px" }}
            />
            <Button
              onClick={clickCampaigns}
              style={{
                backgroundColor: displayCampaigns ? "#dfb248" : "",
                outline: "none",
              }}
            >
              Campaigns
            </Button>
          </div>
        </div>
      </div>
      {displayGiftCards && (
        <Test
          name="Gift card title"
          image={giftCardListImg}
          title="Category:Fashion | Online "
        />
      )}
      {displayHappiOffers && (
        <Test
          name="Happi offers title"
          image={happiOffersListImg}
          title="Category:Fashion | Online+In-store "
        />
      )}
      {displayCampaigns && (
        <Test
          name="Campaigns title"
          image={campaignsListImg}
          title="Category:Non profit Organizations "
        />
      )}
    </>
  );
};

export default LandingPageList;
