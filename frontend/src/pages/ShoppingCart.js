import React, { useState, useEffect } from "react";
import {
  Field,
  FieldInput,
  FieldSelect,
  FieldTextArea,
} from "./Createorder.styles";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useSelector, } from "react-redux";
import Counter from "../components/LandingPageList/Counter";
import axios from "axios";
import "./ShoppingCart.css"
import moment from "moment";

const ShoppingCart = (props) => {
const {displayOrderInfo, cartItems} = props
const [selectedPrice, setSelectedPrice] = useState(cartItems.price_choice);
const [totalPrice, settotalPrice] = useState(cartItems.price_choice);
const [cartItem, setCartItem] = useState(cartItems.campaign == null ? cartItems.giftcard : cartItems.campaign);
const friendsDetails = useSelector((state) => state.getFriendsDetails);
const [cartFriendsDetails, setCartFriendsDetails] = useState(friendsDetails);
const selectedItem = useSelector((state) => state.createorder);

const handlePriceChange = async (e) => {
  let price = parseInt(e.target.value);
  isNaN(price) ? setSelectedPrice(0) : setSelectedPrice(price);
  settotalPrice(price);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  console.log(selectedItem);
  await axios
      .put(
        `http://35.161.152.123/api/orders/item-to-basket/${selectedItem.id}`,
        JSON.stringify({
          ordered:true,
          price_choice: price,
          quantity:1,
        }),
        config
      )
      .then((response) => {
        console.log(response);
      });
};

useEffect(() => {
  console.log('from shopping bag');
  console.log(friendsDetails);
  setCartFriendsDetails(friendsDetails);
}, [friendsDetails]);

return (
    <>
     <div className="container">
        <br />  
       <div className="row justify-content-md-center">
        <div style={{backgroundColor: "#ffc542"}}>
          <table className="table">
            <thead className="text-muted">
              <tr style={{ fontSize: "16px"}}>
                <th scope="col" width={120} style={{borderBottom: "2px solid #118678", borderTop : "none"}}>Card</th>
                {displayOrderInfo && <th scope="col" width={220} style={{borderBottom: "2px solid #118678" , borderTop : "none"}}>Order Info</th>}
                {(cartFriendsDetails.happicard_recipient_name !== "" || cartFriendsDetails.happicard_recipient_email !== "" || cartFriendsDetails.happicard_delivery_date !== "")   && <th scope="col" width={220} style={{borderBottom: "2px solid #118678", borderTop : "none"}}>Info</th>}
                <th scope="col" width={200} style={{borderBottom: "2px solid #118678", borderTop : "none"}}>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr >
                <td style={{paddingTop: "25px"}}>
                  <figure className="media">
                    <div className="img-wrap"><img src={cartItem.image} style={{width: "250px", height: "150px"}}/></div>
                  </figure> 
                </td>
                {
                displayOrderInfo && <td style={{color:"#4A4746"}}> 
                <li style={{paddingBottom: "2px"}}>To: John</li>
                <li style={{paddingBottom: "2px"}}>Email: example@gmail.com</li>
                <li style={{paddingBottom: "2px"}}>DeliveryDate: </li>
                </td>
                }
               {(cartFriendsDetails.happicard_recipient_name !== "" || 
                cartFriendsDetails.happicard_recipient_email !== "" || 
                cartFriendsDetails.happicard_delivery_date !== "" ) && 
                <td style={{paddingTop: "25px", fontSize: "12px", fontWeight: "600"}}> 
                 {cartFriendsDetails.happicard_recipient_name !== "" && (<><span> To: {cartFriendsDetails.happicard_recipient_name}</span><br/></>)}
                 {cartFriendsDetails.happicard_recipient_email !== "" && (<><span> Email: {cartFriendsDetails.happicard_recipient_email}</span><br/></>)}
                 {cartFriendsDetails.happicard_delivery_date !== "" && (<><span> Delivery Date: {new Date(cartFriendsDetails.happicard_delivery_date).toISOString().substring(0, 10)}</span><br/></>)}
                 {cartFriendsDetails.happicard_recipient_number !== "" && (<><span> Phonenumber: {cartFriendsDetails.happicard_recipient_number}</span><br/></>)}
                </td>}
                <td style={{paddingTop: "25px"}}> 
                <div className="cart">
                <select value={selectedPrice} onChange={handlePriceChange} disabled={cartFriendsDetails.disableAmount}>
                    <option value="">select</option>
                    <option value={cartItem.price_option_1}>
                      {cartItem.price_option_1}
                    </option>
                    <option value={cartItem.price_option_2}>
                    {cartItem.price_option_2}
                    </option>
                    <option value={cartItem.price_option_3}>
                    {cartItem.price_option_3}
                    </option>
                  </select>
                  </div>
                  <div className="row justify-content-start">
          <button 
          style={{width: "150px", height: "35px", borderRadius: "25px", border: "none", backgroundColor: "#FFFF", marginLeft: "15px", outline:"none", cursor:"pointer", marginBottom: "25px", marginTop: "80px"}}>Total: {totalPrice} SEK</button></div>
                </td>
              </tr>
              </tbody>
          </table>
          </div>
          </div>
        </div>
    </>
  );
};

export default ShoppingCart;
