import axios from 'axios';

const baseURL = "/api/baskets";

export async function getBaskets() {
  const response = await axios.get(baseURL);
  return response.data.baskets;
}