import express from "express";
const app = express();
const host = "localhost";
const port = "8080";

import { getBaskets, createBasket } from "./lib/database/pg.js";

// app.use(express.static("public"));
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/api/baskets", async (req, res) => {
  const baskets = await getBaskets();
  res.status(200).send({ baskets });
});

app.post("/api/baskets", async (req, res) => {
  const name = req.body.name;
  const dbName = await createBasket(name);

  if (dbName === -1) {
    res.status(409).send({ error: `Name ${name} already exists.` });
  } else {
    res.status(200).send(name);
  }
});

app.listen(port, host, () => {
  console.log(`App is listening on port ${port} of ${host}!`);
});
