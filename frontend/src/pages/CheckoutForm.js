import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm({props}) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const [validationError, setValidationError] = useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
     console.log("props from checkout form!");
     console.log(props);
    }, []);
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };
  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = ev => {
    ev.preventDefault();
    setProcessing(true);
    if(props.first_name == "" || props.last_name == "" || props.email == "" || props.phone_number == "")
    {
      setValidationError(true);
      setValidationErrorMessage("Please fill all required* fields");
      setProcessing(false);
      return;
    } else
    {
      setValidationError(false);
      setValidationErrorMessage("");
    }
    window
      .fetch("http://35.161.152.123/api/orders/create/stripe-payment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({"items": [
          "eea58e2b-8b76-44f1-94e6-3d653a0048af"
        ],
        "first_name": props.first_name,
        "last_name": props.last_name,
        "email": props.email,
        "phone_number": props.phone_number,
        "happicard_recipient_myself": false,
        "happicard_recipient_name": props.happicard_recipient_name,
        "happicard_recipient_email_choice": props.happicard_recipient_email_choice,
        "happicard_recipient_email": props.happicard_recipient_email,
        "happicard_recipient_sms_choice": props.happicard_recipient_sms_choice,
        "happicard_recipient_number": props.happicard_recipient_number,
        "happicard_personal_message": props.happicard_personal_message,
        "happicard_delivery_date": new Date(props.happicard_delivery_date)})
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        const payload =  stripe.confirmCardPayment(data.client_secret, {
          payment_method: {
            card: elements.getElement(CardElement)
          }
        });
        if (payload.error) {
          setError(`Payment failed ${payload.error.message}`);
          setProcessing(false);
        } else {
          setError(null);
          setProcessing(false);
          setSucceeded(true);
        }
        setClientSecret(data.client_secret);
      });
   
  };
  return (
    <>
    {validationError && <div style={{marginBottom: "15px"}}><span>{validationErrorMessage}</span></div>}
    <form id="payment-form" onSubmit={handleSubmit}>
      
      <div style={{border: "2px solid #ffc542", padding: "10px", borderRadius: "15px"}}>
        <CardElement id="card-element" options={cardStyle} onChange={handleChange}/></div>
      <button
        disabled={processing || disabled || succeeded}
        id="submit"
        style={{width: "200px",height:"35px", marginTop: "25px", borderRadius: "49px", backgroundColor: "#118678", color:"#FFF", fontWeight: "700"}}
      >
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay"
          )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      
    </form>
    </>
  );
}