import React, { useState, useEffect } from "react";
import {
  // CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

import visaImg from "../assets/images/visa.PNG";
import successIcon from "../assets/images/success_icon.PNG";

import masterImg from "../assets/images/master.PNG";
import { Card } from "react-bootstrap";
import { Modal } from "react-bootstrap";



export default function CheckoutForm({props}) {
  const [show, setShow] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const [validationError, setValidationError] = useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const selectedItem = useSelector((state) => state.createorder);
  const [terms, setTerms] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
     console.log("props from checkout form!");
     console.log(props);
     console.log(selectedItem);
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

  const handleTermsOnchange = (event) => {
    setTerms(!terms);
  }

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

   if(!terms){
      setValidationError(true);
      setValidationErrorMessage('Please accept terms and conditions!');
      return;
   }
   
   window
      .fetch("http://35.161.152.123/api/orders/create/stripe-payment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({"items": [
          selectedItem.id
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
        "happicard_delivery_date": props.happicard_delivery_date == "" ? new Date(): new Date(props.happicard_delivery_date)})
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        const payload =  stripe.confirmCardPayment(data.client_secret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
          }
        });
        if (payload.error) {
          setError(`Payment failed ${payload.error.message}`);
          setProcessing(false);
        } else {
          setError(null);
          setProcessing(false);
          setSucceeded(true);
          handleShow();
        }
        setClientSecret(data.client_secret);
      });
   
  };
  return (
    <>
       <Modal show={show} onHide={handleClose}>
        <div style={{ border: "4px solid #ffc541", borderRadius: "0.3rem" }}>
          <Modal.Header
            closeButton
            style={{ backgroundColor: "#ffff", border: "none" }}
          ></Modal.Header>
          <Modal.Body style={{ backgroundColor: "#ffff", textAlign : "center", marginBottom: "30px" }}>
            <div style={{textAlign: "center", marginBottom: "15px"}}><img src={successIcon} style={{width: "150px"}}/></div>
            <span style={{fontWeight:"600", fontSize: "14px", paddingBottom: "15px"}}>Payment successful.</span><br/>
            <span style={{fontWeight:"600", fontSize: "14px", paddingBottom: "15px"}}>Please check your email for more information.</span>
          </Modal.Body>
        </div>
      </Modal>
    
        <input
          name="example_1"
          value={terms}
          onChange={handleTermsOnchange}
          type="checkbox"
        />
        <label style={{fontWeight: "600", paddingRight: "2px"}}><span style={{color:"red"}}>*</span>Accept terms and conditions</label>
        {validationError && <div style={{marginBottom: "15px"}}><span style={{color:"red"}}>{validationErrorMessage}</span></div>}
    <form id="payment-form" onSubmit={handleSubmit}>
      
      <div style={{border: "2px solid #ffc542", padding: "10px", borderRadius: "15px"}}>
        {/* <CardElement id="card-element" options={cardStyle} onChange={handleChange}/> */}
        <CardNumberElement onChange={handleChange}/>
        </div>
        <div className="row">
        <div className="col-sm-4" style={{border: "2px solid #ffc542",marginLeft:"15px", marginRight:"10px", padding: "10px", marginTop: "16px", marginBottom:"20px", borderRadius: "15px"}}>
          <CardExpiryElement/>
          </div>
        <div className="col-sm-3" style={{border: "2px solid #ffc542", padding: "10px", marginTop: "16px", marginBottom:"20px", borderRadius: "15px"}}>
        <CardCvcElement/>
         </div>
         <div className="col-sm-2" style={{ padding: "10px", marginTop: "42px"}}>
        <img src={visaImg} style={{width:"50px", marginTop: "-35px"}}/>
         </div>
         <div className="col-sm-1" style={{padding: "10px", marginTop: "40px"}}>
         <img src={masterImg} style={{width:"50px", marginTop: "-35px"}}/>
         </div>
         </div>
        
      <button
        disabled={processing || disabled || succeeded}
        id="submit"
        style={{width: "200px",height:"35px", marginTop: "25px", border:"none", borderRadius: "49px", backgroundColor: "#118678", color:"#FFF", fontWeight: "700", outline: "none"}}
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