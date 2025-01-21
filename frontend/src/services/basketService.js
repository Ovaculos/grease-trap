import axios from 'axios';

export async function getBaskets() {
  const response = await axios.get("/api/baskets");
  console.log(response);
}

getBaskets();