import pkg from "pg";
const { Client } = pkg;

// const logQuery = (statement, parameters) => {
//   let timeStamp = new Date();

//   let formattedTimeStamp = timeStamp.toString().substring(4, 24);
//   console.log(formattedTimeStamp, statement, parameters);
// };

export const getBaskets = async () => {
  const baskets = await dbQuery("SELECT * FROM baskets");
  return baskets.rows.map((basket) => basket.name);
};

// INSERT INTO
//     baskets (name)
// VALUES
//     ('Basket A'),
//     ('Basket B');
export const createBasket = async (name) => {
  try {
    await dbQuery("INSERT INTO baskets (name) VALUES ($1)", name);
    return name;
  } catch (e) {
    return -1;
  }
};

const getRequests = async () => {};

const CONNECTION = {
  database: "grease-trap",
};

async function dbQuery(statement, ...parameters) {
  let client = new Client(CONNECTION);

  await client.connect();
  // logQuery(statement, parameters);
  let result = await client.query(statement, parameters);
  await client.end();

  return result;
}
