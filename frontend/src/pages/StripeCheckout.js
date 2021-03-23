import React, {useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import ShoppingCart from "./ShoppingCart";
import { useSelector} from "react-redux";
import {isEmpty} from "lodash"
import axios from "axios";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with a fake API key.
// Sign in to see examples pre-filled with your key.
import "./StripeCheckout.css";

export default function StripeCheckout({props}) {
  const selectedItem = useSelector((state) => state.createorder);
  const promise = selectedItem.campaign == null ? loadStripe("pk_test_51IMWZ3FT5MzPJVBFP8b9vL5qQ90T3exM39xldCCkNgbVxMZcdHVKTUkG642VxcOJkIT2Ww8k3Ue4dixJHlaIOPv900tSyer9lE")
  : loadStripe("pk_test_51IQZMGLrSplbJp0IDb70TnM1Hf8eeBBLRMv311YhtaK6cbY1wym2SLbIqCA6LMoBksqQHcnbXSYSeFcqlvQNJqg2007up4n9l6");
  return (
    <>
        <div
          className="row justify-content-md-center"
          style={{ fontSize: "12px", paddingBottom: "25px", backgroundColor: "#F0EEED", textAlign: "center" }}
        >
      <div className="col-sm-3">
      <Elements stripe={promise}>
        <CheckoutForm props={props}/>
      </Elements>
      </div>
      </div>
      </>
);
}