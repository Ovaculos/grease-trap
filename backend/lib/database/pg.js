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

export const getRequestsForBasket = async (name) => {
  const requests = await dbQuery(
    "SELECT r.header, r.method, r.query, r.date_time, r.path, r.id AS request_id, b.id AS basket_id " +
    "FROM baskets AS b INNER JOIN requests AS r ON b.id = r.basket_id " +
    "WHERE b.name = $1",
    name,
  );

  return requests.rows
};

export const createRequest = async (name, { header, method, path, query, basket_id }) => {
  try {
    const result = await dbQuery("INSERT INTO requests (header, method, path, query, basket_id) VALUES ($1, $2, $3, $4, $5) RETURNING id", header, method, path, query, basket_id);
    return result.rows[0].id;
  } catch (e) {
    return -1;
  }
}

export const basketId = async (name) => {
  try {
    const basket = await dbQuery("SELECT id FROM baskets WHERE name = $1", name);
    return basket.rows[0].id;
  } catch (e) {
    return false;
  }
}

export const createBasket = async (name) => {
  try {
    await dbQuery("INSERT INTO baskets (name) VALUES ($1)", name);
    return name;
  } catch (e) {
    return -1;
  }
};

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
