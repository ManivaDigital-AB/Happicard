import React, { useState, useEffect } from "react";
import axios from "axios";
import  useForm from "./useForm";
import { useSelector } from "react-redux";
import ShoppingCart from "../pages/ShoppingCart";
import {isEmpty} from "lodash"
import MultiStep from './react-multistep';
import StepTwo from './stepTwo';
import StepThree from './stepThree';
import EmptyStep from './EmptyStep'; 

const Createorder = () => {
  const [formData, setForm] = useForm({
    first_name: "",
    first_name_error: false,
    last_name: "",
    email: "",
    phone_number: "",
    comments:"",
    happicard_recipient_myself:"",
    happicard_recipient_name:"",
    happicard_recipient_email_choice:false,
    happicard_recipient_email:"",
    happicard_recipient_confirm_email:"",
    happicard_recipient_sms_choice:false,
    happicard_recipient_number:"",
    happicard_personal_message:"",
    happicard_delivery_date:"",
  });
  const selectedItem = useSelector((state) => state.createorder);
  const [cartItems, setCartItems] = useState({});
  const props = { formData, setForm};
  const stepsWithFriends = [
    { component: <EmptyStep /> },
    { component: <StepTwo {...props} /> },
    { component: <StepThree {...props} /> },
  ]
  
  const prevStyle = {textAlign: "center",
                        borderRadius: "30px",
                        backgroundColor: "#118678",
                        width: "200px",
                        height: "35px",
                        border: "none", margin: "20px", fontSize: "12px",  fontWeight: "700", color: "#FFF", outline: "none"}

  const nextStyle = {textAlign: "center",
  borderRadius: "30px",
  backgroundColor: "#118678",
  width: "200px",
  height: "35px",
  border: "none",  outline: "none", margin: "20px", fontSize: "12px",  fontWeight: "700", color: "#FFF"}

  const fetchCartItems = async() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    await axios
      .get(
        `http://35.161.152.123/api/orders/item-to-basket/${selectedItem.id}`,
         config
      )
      .then((response) => {
        setCartItems(response.data);
      });
  }

  useEffect(() => {
    fetchCartItems();
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
   }, []);

  return (
    <>
      <div>
        <div
          className="row justify-content-md-center"
          style={{ fontSize: "12px", paddingBottom: "15px" }}
        >
         {!isEmpty(cartItems) && <ShoppingCart displayOrderInfo={false} cartItems={cartItems}/>}
         </div>
         <MultiStep steps={stepsWithFriends} prevStyle={prevStyle} nextStyle={nextStyle} data={formData}/>
         </div>
    </>
  );
};

export default Createorder;
