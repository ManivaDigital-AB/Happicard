import { BehaviorSubject } from "rxjs";

import config from "config";
import { fetchWrapper } from "@/_helpers";

const userSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/accounts`;

export const landingPageService = {
  getAllGiftCards,
  getAllCampaigns,
  getAllOffers,
  getById,
  create,
  update,
  delete: _delete,
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
};

function refreshToken() {
  return fetchWrapper.post(`${baseUrl}/refresh-token`, {}).then((user) => {
    // publish user to subscribers and start timer to refresh token
    userSubject.next(user);
    startRefreshTokenTimer();
    return user;
  });
}

function getAllGiftCards() {
  return fetchWrapper.get(
    //"https://dev.api.happicard.se/api/products/giftcard/list/"
    "http://35.161.152.123/api/items/list/giftcards/"
  );
}

function getAllCampaigns() {
  return fetchWrapper.get("http://35.161.152.123/api/items/list/campaigns/");
}

function getAllOffers() {
  return fetchWrapper.get(
    "http://35.161.152.123/api/items/list/giftcard/offers/"
  );
}

function getById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
  return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
  return fetchWrapper.put(`${baseUrl}/${id}`, params).then((user) => {
    // update stored user if the logged in user updated their own record
    if (user.id === userSubject.value.id) {
      // publish updated user to subscribers
      user = { ...userSubject.value, ...user };
      userSubject.next(user);
    }
    return user;
  });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`).then((x) => {
    // auto logout if the logged in user deleted their own record
    if (id === userSubject.value.id) {
      logout();
    }
    return x;
  });
}

// helper functions

let refreshTokenTimeout;

function startRefreshTokenTimer() {
  // parse json object from base64 encoded jwt token
  const jwtToken = JSON.parse(atob(userSubject.value.jwtToken.split(".")[1]));

  // set a timeout to refresh the token a minute before it expires
  const expires = new Date(jwtToken.exp * 1000);
  const timeout = expires.getTime() - Date.now() - 60 * 1000;
  refreshTokenTimeout = setTimeout(refreshToken, timeout);
}

function stopRefreshTokenTimer() {
  clearTimeout(refreshTokenTimeout);
}
