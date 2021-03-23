import React, { useState, useEffect } from "react";
import giftImg from "../../assets/images/gift_card_01.PNG";
import offersImg from "../../assets/images/happi_offers_02.PNG";
import campaignsImg from "../../assets/images/campaigns_01.PNG";
import oval from "../../assets/images/Oval.PNG";
import styled from "styled-components";
import axios from "../../utils/axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { landingPageService } from "../../_services/landingpage.service";
import { Modal } from "react-bootstrap";

const ListImg = styled.img`
  width: 100%;
  height: auto;
  padding: 5px 5px 5px 5px;
  &:hover
  {
    box-shadow: 12px 12px 0px #118678;
  }
  @media only screen and (max-width: 600px) {
    width: 200px;
  }
`;

const LandingPageList = ({props}) => {
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
  
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let columns = [];

  const clickGiftCards = () => {
    columns = [];
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
    columns = [];
    if (displayHappiOffers) {
      setDisplayHappiOffers(false);
    } else {
      setDisplayHappiOffers(true);
      landingPageService.getAllOffers().then((x) => setOffers(x));
    }
    
    setDisplayGiftCards(false);
    setDisplayCampaigns(false);
    // setShowMore(false);
  };

  const clickCampaigns = () => {
    columns = [];
    if (displayCampaigns) {
      setDisplayCampaigns(false);
    } else {
      setDisplayCampaigns(true);
      landingPageService.getAllCampaigns().then((x) => setCampaigns(x));
    }
    
    setDisplayGiftCards(false);
    setDisplayHappiOffers(false);
    // setShowMore(false);
  };

  const handleChange = (params) => (event) => {
    let filteredItem = {};
    console.log(event.target);

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

      let url = `http://35.161.152.123/api/orders/create/item-to-basket/`
      let request =   JSON.stringify({
        giftcard: selectedItem.isGiftCardOrOffer ? selectedItem.id : null,
        campaign: !selectedItem.isGiftCardOrOffer ? selectedItem.id : null,
        quantity: 1,
        price_choice: selectedPrice,
        ordered: "true",
      });

      await axios
        .post(
          url,
          request,
          config
        )
        .then((response) => {
          var data = response.data;
          if (data != null) {
            dispatch({ type: "CREATE_ORDER_REQUEST", payload: response.data });
            dispatch({ type: "SELECTED_ITEM_ORDER", payload: selectedItem });
            history.push({
              pathname: '/createorder',
          });
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  function Card(props) {
    return (
    <div
        className="col-sm-3"
        onClick={handleChange(props)}
        style={{ cursor: "pointer"}}
      >
        <div
          className="card"
          style={{ borderRadius: "0.65rem", marginBottom: "10px", backgroundColor : selectedItem.id == props.id ? "#FFC541" : "#E1DBD8"}}
        >
          
          <div className="card-body">
          <div><img src={oval}/></div>
            <h6 className="card-title" style={{ color: "#4A4746" }}>
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
              <span style={{ color: "#118678" }}>| </span>{" "}
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

  const scroll = (element) => {
    window.scrollTo({
      behavior: element ? "smooth" : "auto",
      top: element ? element.offsetTop : 0
    });
  }

  useEffect(() => {
    let value = history.location.state != undefined && history.location.state.selectedValue != undefined ? history.location.state.selectedValue : "";
    console.log(value);
    if(value == "") {
      setDisplayGiftCards(false);
      setDisplayGiftCards(false);
      setDisplayCampaigns(false);
    }
    const element = document.getElementById('categories');
    if(value == "giftCards") 
    {
      clickGiftCards();
      scroll(element);
    }
    if(value == "happiOffers") { clickHappiOffers(); scroll(element);}
    if(value == "campaigns") { clickCampaigns();  scroll(element);}
  }, [history.location]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <div style={{ border: "4px solid #ffc541", borderRadius: "0.3rem" }}>
          <Modal.Header
            closeButton
            style={{ backgroundColor: "#ffff", border: "none" }}
          ></Modal.Header>
          <Modal.Body style={{ backgroundColor: "#ffff" }}>
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
                <div className="select">
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
                id="ownpurchase"
                style={{
                  backgroundColor: "#ffc541",
                  border: "none",
                  height: "35px",
                  borderRadius: "16px",
                  width: "200px",
                  marginRight: "30px",
                  outline: "none",
                  fontWeight: "600",
                  color: "#4A4746"
                }}
                disabled={selectedPrice == ""}
                onClick={onCreateOrder}
              >
               Buy
              </button>
            </div>
          </Modal.Body>
        </div>
      </Modal>
      
   <div className="container" id="categories">
      <div
        className="row justify-content-md-center"
        style={{ paddingTop: "20px" }}
      >
        <div className="col-sm-3">
          <div>
            <ListImg src={props.home_page_giftcards_img} onClick={clickGiftCards} style={{boxShadow : displayGiftCards ? "12px 12px 0px #118678" : ""}}/>
          </div>
        </div>
        <div className="col-sm-3">
          <div>
            <ListImg src={props.home_page_happioffers_img} onClick={clickHappiOffers} style={{boxShadow : displayHappiOffers ? "12px 12px 0px #118678" : ""}}/>
            
          </div>
        </div>
        <div className="col-sm-3">
          <div>
            <ListImg src={props.home_page_campaigns_img} onClick={clickCampaigns} style={{boxShadow : displayCampaigns ? "12px 12px 0px #118678" : ""}}/>
          </div>
        </div>
      </div>
      <div
        className="row justify-content-md-center"
        style={{ textAlign: "center", paddingBottom: "10px", paddingTop: "25px" }}
      >
      {
        displayGiftCards &&
          giftCards.length > 0 &&
          giftCards.map((item, index) => {
           
            columns.push(<Card
              id={item.id}
              name={item.title}
              image={item.image}
              title={item.store_category}
              key={index}
            />)
            if ((index+1)%3===0) {columns.push(<div className="w-100" key={null}></div>)}
          })}
          {displayGiftCards && columns}
      </div>

      <div
        className="row justify-content-md-center"
        style={{ textAlign: "center", paddingBottom: "10px" }}
      >
        {displayHappiOffers &&
          offers.length > 0 &&
          offers.map((item, index) => {
            columns.push(<Card
              id={item.id}
              name={item.title}
              image={item.image}
              title={item.store_category}
              key={index}
            />)
            if ((index+1)%3===0) {columns.push(<div className="w-100" key={null}></div>)}
            })}
             {displayHappiOffers && columns}
      </div>

      <div
        className="row justify-content-md-center"
        style={{ textAlign: "center", paddingBottom: "10px" }}
      >
        {displayCampaigns &&
          campaigns.length > 0 &&
          campaigns.map((item, index) => {
            columns.push(<Card
              id={item.id}
              name={item.title}
              image={item.image}
              title={item.store_category}
              key={index}
            />)
            if ((index+1)%3===0) {columns.push(<div className="w-100" key={null}></div>)}
            })}
            {displayCampaigns && columns}
      </div>
    </div>
    </>
  );
};

export default LandingPageList;
