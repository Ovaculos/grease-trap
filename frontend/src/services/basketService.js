import axios from 'axios';

const baseURL = "/api/baskets";

export async function getBaskets() {
  const response = await axios.get(baseURL);
  return response.data.baskets;
}

export async function createBasket(newBasket) {
  const response = await axios.post(baseURL, newBasket);
  return response.data;
}

export async function getRequests(basketName) {
  const response = await axios.get(`${baseURL}/${basketName}`);
  return response.data.requests;
}