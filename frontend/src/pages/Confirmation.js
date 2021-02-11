import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "../utils/axios";
import queryString from "query-string";
import { useSelector, useDispatch } from "react-redux";

export default (props) => {
  const [html, setHTML] = useState(null);
  const klarnaCheckoutContainer = useRef(null);
  const values = queryString.parse(props.location.search);
  const notificationData = useSelector((state) => state.setNotificationData);
  const selectedItem = useSelector((state) => state.createorder);
  const dispatch = useDispatch();

  const getCurrentOrder = useCallback(async () => {
    try {
      console.log(notificationData);
      console.log(selectedItem);
      if (values.oid) {
        // console.log(process.env.REACT_APP_KLARNA_BASEURL);
        // axios.defaults.baseURL = process.env.REACT_APP_KLARNA_BASEURL;
        // axios.defaults.config = {
        //   headers: {
        //     "Content-Type": "application/json",
        //     "Access-Control-Allow-Origin": "*",
        //   },
        // };
        const config = {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        };
        const response = await axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.playground.klarna.com/checkout/v3/orders/${values.oid}`,
          {
            auth: {
              username: "PK31863_2790f4576242",
              password: "K9w4MbxAD8GHP3pu",
            },
          },
          config
        );
        if (response) setHTML(response.data.html_snippet);
      } else {
        throw new Error("Missing Order Id");
      }
    } catch (err) {
      console.log(err);
    }
  }, [values.oid]);

  useEffect(() => {
    getCurrentOrder();
  }, [getCurrentOrder]);

  useEffect(() => {
    if (html) {
      const scriptsTags = klarnaCheckoutContainer.current.getElementsByTagName(
        "script"
      );
      for (let i = 0; i < scriptsTags.length; i++) {
        let parentNode = scriptsTags[i].parentNode;
        let newScriptTag = document.createElement("script");
        newScriptTag.type = "text/javascript";
        newScriptTag.text = scriptsTags[i].text;
        parentNode.removeChild(scriptsTags[i]);
        parentNode.appendChild(newScriptTag);
      }
    }
  }, [html]);

  return (
    <>
      <div
        ref={klarnaCheckoutContainer}
        dangerouslySetInnerHTML={{ __html: html || "" }}
      />
    </>
  );
};
