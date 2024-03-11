import { Seller } from "../models/Seller";

const apiBaseURL = "http://localhost:9002/";

export function getAllSellersAPI() {
  return fetch(apiBaseURL + "seller", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function createSeller(seller: Seller) {
  return fetch(apiBaseURL + "seller", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(seller),
  });
}
