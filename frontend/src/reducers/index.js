import { combineReducers } from "redux";

const initState = null;

const checkoutReducer = function (state = initState, { type, payload }) {
  switch (type) {
    case "CHECKOUT_REQUEST":
      return { ...payload };
    default:
      return state;
  }
};

const createOrderReducer = function (state = initState, { type, payload }) {
  switch (type) {
    case "CREATE_ORDER_REQUEST":
      return { ...payload };
    default:
      return state;
  }
};

const selectedItemForOrder = function (state = initState, { type, payload }) {
  switch (type) {
    case "SELECTED_ITEM_ORDER":
      return { ...payload };
    default:
      return state;
  }
};

const setNotificationData = function (state = initState, { type, payload }) {
  switch (type) {
    case "NOTIFICATION_DATA":
      return { ...payload };
    default:
      return state;
  }
};

export default combineReducers({
  checkout: checkoutReducer,
  createorder: createOrderReducer,
  selectedItemForOrder: selectedItemForOrder,
  setNotificationData: setNotificationData,
});
