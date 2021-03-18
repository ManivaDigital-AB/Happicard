import React, {useState} from "react";
import axios from "../../utils/axios";
import { Modal } from "react-bootstrap";
import Counter from "../LandingPageList/Counter";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const NgoDetails = ({ selectedItem }) => {
  const [show, setShow] = useState(false);
  const [selectedNgoCard, setselectedNgoCard] = useState({});
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [parentCounter, setParentCounter] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (params) => {
    console.log(params);
    params.isCampaign = params.campaign_id != "" ? true : false
    setselectedNgoCard(params);

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

      let url = `http://35.161.152.123/api/orders/create/item-to-basket/`;
      await axios
        .post(
          url,
          JSON.stringify({
            campaign: selectedNgoCard.isCampaign ? selectedNgoCard.campaign_id : null,
            quantity: 1,
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
        onClick={() => handleChange(props.props)}
      >
        <div
          className="card"
          style={{
            borderRadius: "0.65rem",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          <div className="card-body">
            <h6 className="card-title" style={{ color: "#D7383B" }}>
              {props.props.campaign_title}
            </h6>
            <img
              src={props.props.campaign_image}
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
                Category: {props.props.campaign_ngo_category}
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
                  src={selectedNgoCard.campaign_image}
                  style={{
                    borderRadius: "0.65rem",
                    width: "100%",
                    height: "auto",
                  }}
                />
              </div>
              <div className="col-sm">
                <h6 style={{ paddingBottom: "12px" }}>
                  {selectedNgoCard.campaign_title}
                </h6>
                <div>
                  <label style={{ marginRight: "2px", fontWeight: "bold" }}>
                    Category:
                  </label>{" "}
                  {selectedNgoCard.campaign_ngo_category}
                </div>

                <div>
                  <label style={{ marginRight: "4px", fontWeight: "bold" }}>
                    Amount:
                  </label>
                  <div className="select">
                  <select onChange={handlePriceChange}>
                    <option value="">select</option>
                    <option value={selectedNgoCard.price_option_1}>
                      {selectedNgoCard.price_option_1} SEK
                    </option>
                    <option value={selectedNgoCard.price_option_2}>
                      {selectedNgoCard.price_option_2} SEK
                    </option>
                    <option value={selectedNgoCard.price_option_3}>
                      {selectedNgoCard.price_option_3} SEK
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
              <p>{selectedNgoCard.campaign_description}</p>
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
                }}
                onClick={onCreateOrder}
              >
               Donate
              </button>
            </div>
          </Modal.Body>
        </div>
      </Modal>
      <div className="container" style={{ paddingTop: "20px" }}>
        <div className="row" style={{ paddingTop: "10px" }}>
          <div className="col-sm-3 ml-3 mb-3">
            <h2>{selectedItem.title}</h2>
          </div>
        </div>
        <div className="row" style={{ texTransform: "capitalize" }}>
          <div className="col-sm-3 ml-3 mb-3">
            <span>Category: {selectedItem.ngo_category}</span>
          </div>
        </div>
        <div className="row" style={{ paddingTop: "10px" }}>
          <div className="col-sm-10 ml-3 mb-3">
            <label style={{ fontWeight: "700" }}>About:</label>
            <p style={{ lineHeight: "32px" }}>{selectedItem.about}</p>
          </div>
        </div>
        <div className="row " style={{ paddingBottom: "10px" }}>
          <div className="col-sm-6 ml-3 mb-3">
            <h4>All {selectedItem.title}’s Campaigns:</h4>
          </div>{" "}
        </div>
        <div className="row" style={{ paddingBottom: "10px" }}>
          {selectedItem.campaigns != undefined &&
            selectedItem.campaigns.length > 0 &&
            selectedItem.campaigns.map((item, index) => (
              <Card props={item} key={index} />
            ))}
        </div>
      </div>
    </>
  );
};

export default NgoDetails;
