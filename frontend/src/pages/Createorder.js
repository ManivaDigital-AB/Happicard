import React, { useState, useEffect } from "react";
import { Field, FieldInput, FieldSelect } from "./Createorder.styles";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const Createorder = () => {
  const { register, handleSubmit } = useForm();
  const selectedItems = useSelector((state) => state.createorder);
  const history = useHistory();
  // const [selectedOrderItems, setSelectedOrderItems] = useState({});

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
    console.log(selectedItems);
    let array = [];
    array.push(selectedItems.id);
    data.giftcards = array;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      await axios
        .post(
          `http://35.161.152.123/api/orders/order/`,
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

  const dispatch = useDispatch();

  useEffect(() => {
    // const selectedItems = useSelector((state) =>
    //   state.createorder
    // );
    console.log(selectedItems);
    // setSelectedOrderItems();
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
              Strumpmaskinen
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
              <span style={{ fontSize: "20px" }}>fashion</span>
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
                  Here you will find hand-picked quality for an everyday
                  luxurious life. Not necessarily the sumptuous, but the genuine
                  and durable that gilds life with its materials, shapes and
                  essences. Package wrapping is included in all orders until
                  Christmas!
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-row">
                    <Field className="form-group col-md-6">
                      <label htmlFor="firstname"> firstname </label>
                      <FieldInput
                        name="first_name"
                        ref={register}
                        placeholder="First name"
                        className="form-control"
                      />
                    </Field>
                    <Field className="form-group col-md-6">
                      <label htmlFor="lastname"> lastname </label>
                      <FieldInput
                        name="last_name"
                        ref={register}
                        placeholder="last name"
                        className="form-control"
                      />
                    </Field>
                    <Field className="form-group col-md-6">
                      <label htmlFor="email"> email </label>
                      <FieldInput
                        name="email"
                        ref={register}
                        placeholder="email"
                        className="form-control"
                      />
                    </Field>
                    <Field className="form-group col-md-6">
                      <label htmlFor="phone_number"> phonenumber </label>
                      <FieldInput
                        name="phone_number"
                        ref={register}
                        placeholder="phonenumber"
                        className="form-control"
                      />
                    </Field>
                    <Field className="form-group col-md-6">
                      <label htmlFor="street_address1">street address</label>
                      <FieldInput
                        name="street_address1"
                        ref={register}
                        placeholder="streetaddress"
                        className="form-control"
                      />
                    </Field>
                    <Field className="form-group col-md-6">
                      <label htmlFor="town_or_city">city</label>
                      <FieldInput
                        name="town_or_city"
                        ref={register}
                        placeholder="city"
                        className="form-control"
                      />
                    </Field>
                    <Field className="form-group col-md-6">
                      <label htmlFor="country">country</label>
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
                      <label htmlFor="postcode">postalcode</label>
                      <FieldInput
                        name="postcode"
                        ref={register}
                        placeholder="postalcode"
                        className="form-control"
                      />
                    </Field>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    {" "}
                    <input
                      type="submit"
                      value="checkout"
                      style={{
                        textAlign: "center",
                        borderRadius: "10px",
                        backgroundColor: "#ffc541",
                        width: "150px",
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
