import React, { useState, useEffect } from "react";
import {
  Field,
  FieldInput,
  FieldSelect,
  FieldTextArea,
} from "./Createorder.styles";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const Createorder = () => {
  const { register, handleSubmit } = useForm();
  const selectedItem = useSelector((state) => state.createorder);
  const selectedItemInOrder = useSelector(
    (state) => state.selectedItemForOrder
  );
  const history = useHistory();
  const [selectedOrderItem, setSelectedOrderItem] = useState({});
  const [smsSelection, setsmsSelection] = useState(false);
  const dispatch = useDispatch();

  const proceedtoCheckOut = async (orderId) => {
    try {
      const response = await axios.get(
        `http://35.161.152.123/api/orders/checkout/?id=${orderId}`
      );
      dispatch({ type: "CHECKOUT_REQUEST", payload: response.data });
      history.push("/checkout");
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (data) => {
    let array = [];
    array.push(selectedItem.id);
    if (selectedItemInOrder.campaigns.length > 0) data.campaigns = array;
    else data.giftcards = array;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      dispatch({
        type: "NOTIFICATION_DATA",
        payload: {
          recipient_name: data.first_name,
          recipient_email_choice:
            data.notification == "Email" || data.notification == "Both"
              ? true
              : false,
          recipient_email: data.email,
          recipient_sms_choice:
            data.notification == "SMS" || data.notification == "Both"
              ? true
              : false,
          recipient_number: data.phone_number,
          personal_message: data.message,
        },
      });
      await axios
        .post(
          `http://35.161.152.123/api/orders/create/order/`,
          JSON.stringify(data),
          config
        )
        .then((response) => {
          var data = response.data;
          let orderId = data.id;
          if (response.data != null) {
            proceedtoCheckOut(orderId);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setSelectedOrderItem(selectedItemInOrder);
  }, []);

  return (
    <>
      <div>
        <div
          className="row justify-content-md-center"
          style={{ fontSize: "12px", paddingBottom: "15px" }}
        >
          <div className="col-md-3">
            {" "}
            <img
              src="https://happicard-stores-dev.s3.amazonaws.com/giftcards/strumpmaskinen.png"
              style={{
                borderRadius: "2.65rem",
                width: "100%",
                height: "auto",
                paddingTop: "25px",
                paddingBottom: "25px",
              }}
            />
          </div>
          <div className="col-md-3">
            <h2
              style={{
                paddingBottom: "12px",
                paddingTop: "55px",
                marginLeft: "15px",
              }}
            >
              {/* {selectedOrderItem.title} */}test
            </h2>
            <div>
              <label
                style={{
                  marginRight: "2px",
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginLeft: "15px",
                }}
              >
                Category:
              </label>{" "}
              <span style={{ fontSize: "20px" }}>
                {/* {selectedOrderItem.store_category} */}test
              </span>
            </div>
            <div>
              <label
                style={{
                  marginRight: "2px",
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginLeft: "15px",
                }}
              >
                Redeemable in Sweden.
              </label>{" "}
            </div>
          </div>
        </div>
        <div
          className="row justify-content-md-center"
          style={{
            padding: "15px 15px 15px 15px",
            backgroundColor: "#F0EEED",
            borderTopLeftRadius: "100px",
            borderTopRightRadius: "100px",
          }}
        >
          <div className="col-md-6">
            <div
              className="row justify-content-md-center"
              style={{
                backgroundColor: "#F0EEED",
                padding: "15px 15px 15px 15px",
              }}
            >
              <div
                className=""
                style={{
                  backgroundColor: "#F0EEED",
                  fontSize: "12px",
                  lineHeight: "20px",
                  letterSpacing: "0.49px",
                }}
              >
                <h6>About</h6>
                <p style={{ paddingBottom: "15px" }}>
                  {/* {selectedOrderItem.description} */}
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-row">
                    <Field className="form-group col-md-6">
                      <label htmlFor="firstname"> Firstname </label>
                      <FieldInput
                        name="first_name"
                        ref={register}
                        placeholder="First name"
                        className="form-control"
                      />
                    </Field>
                    <Field className="form-group col-md-6">
                      <label htmlFor="lastname"> Lastname </label>
                      <FieldInput
                        name="last_name"
                        ref={register}
                        placeholder="last name"
                        className="form-control"
                      />
                    </Field>
                    <Field className="form-group col-md-6">
                      <label htmlFor="email"> Email </label>
                      <FieldInput
                        name="email"
                        ref={register}
                        placeholder="email"
                        className="form-control"
                      />
                    </Field>
                    <Field className="form-group col-md-6">
                      <label htmlFor="phone_number"> Phonenumber </label>
                      <FieldInput
                        name="phone_number"
                        ref={register}
                        placeholder="phonenumber"
                        className="form-control"
                      />
                    </Field>
                    <Field className="form-group col-md-6">
                      <label htmlFor="street_address1">Street address</label>
                      <FieldInput
                        name="street_address1"
                        ref={register}
                        placeholder="streetaddress"
                        className="form-control"
                      />
                    </Field>
                    <Field className="form-group col-md-6">
                      <label htmlFor="town_or_city">City</label>
                      <FieldInput
                        name="town_or_city"
                        ref={register}
                        placeholder="city"
                        className="form-control"
                      />
                    </Field>
                    <Field className="form-group col-md-6">
                      <label htmlFor="country">Country</label>
                      <FieldSelect
                        name="country"
                        ref={register}
                        className="form-control"
                      >
                        <option value="">Select...</option>
                        <option value="SE">Sweden</option>
                        <option value="US">United States</option>
                      </FieldSelect>
                    </Field>
                    <Field className="form-group col-md-6">
                      <label htmlFor="postcode">Postalcode</label>
                      <FieldInput
                        name="postcode"
                        ref={register}
                        placeholder="postalcode"
                        className="form-control"
                      />
                    </Field>
                    <Field className="form-group col-md-6">
                      <label htmlFor="message">Message</label>
                      <FieldTextArea
                        name="message"
                        ref={register}
                        placeholder="message"
                        className="form-control"
                        rows="3"
                      />
                    </Field>
                    <div style={{ marginRight: "10px" }}>
                      <input
                        type="radio"
                        name="notification"
                        value={"Email"}
                        ref={register}
                        style={{ marginRight: "5px", marginLeft: "5px" }}
                      />
                      <label style={{ paddingBottom: "2px" }}>Email</label>
                    </div>
                    <div style={{ marginRight: "10px" }}>
                      <input
                        type="radio"
                        name="notification"
                        value={"SMS"}
                        ref={register}
                        style={{ marginRight: "5px", marginLeft: "5px" }}
                      />
                      <label style={{ paddingBottom: "2px" }}>SMS</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="notification"
                        value={"Both"}
                        ref={register}
                        style={{ marginRight: "5px", marginLeft: "5px" }}
                      />
                      <label style={{ paddingBottom: "2px" }}>Both</label>
                    </div>
                    <br />
                  </div>
                  <div style={{ textAlign: "center" }}>
                    {" "}
                    <input
                      type="submit"
                      value="Checkout"
                      style={{
                        textAlign: "center",
                        borderRadius: "10px",
                        backgroundColor: "#ffc541",
                        width: "250px",
                        border: "none",
                      }}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Createorder;
