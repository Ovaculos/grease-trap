import express from "express";
const app = express();
const host = "localhost";
const port = "8080";

import {
  getBaskets,
  createBasket,
  getRequestsForBasket,
  basketId,
  createRequest
} from "./lib/database/pg.js";

import { createBody, getBodies } from "./lib/database/mongo.js"

const parseBody = (req, res, next) => {
  if (/^\/api/.test(req.path)) {
    express.json()(req, res, next);
  } else {
    express.raw({ type: '*/*' })(req, res, next);
  }
};

app.use(parseBody)

app.get("/api/baskets", async (req, res) => {
  const baskets = await getBaskets();
  res.status(200).send({ baskets });
});

app.get("/api/baskets/:name", async (req, res) => {
  const name = req.params.name;
  const baskets = await getBaskets();
  baskets.sort();

  if (!baskets.includes(name)) {
    res.status(404).send({ error: `${name} doesn't exist.` });
    return;
  }

  let requests = await getRequestsForBasket(name);

  if (requests.length > 0) {
    const mongoBodies = await getBodies(requests[0].basket_id);

    requests = requests.map(req => {
      let request_id = req.request_id;
      let body = mongoBodies.find((body) => body.request_id === request_id) || '';
      return {
        header: req.header,
        method: req.method,
        query: req.query,
        date_time: req.date_time,
        path: req.path,
        body: body.body,
      }
    });
  };

  res.status(200).send({ requests });
});

app.post("/api/baskets", async (req, res) => {
  const name = req.body.name;

  if (!/^[\w\d\-_\.]{1,250}$/.test(name)) {
    res.status(422).send({ error: `Name must match regex /^[\w\d\-_\.]{1,250}$/` });
    return;
  }

  const dbName = await createBasket(name);

  if (dbName === -1) {
    res.status(409).send({ error: `Name ${name} already exists.` });
  } else {
    res.status(200).send(name);
  }
});

app.all("/:name*", async (req, res) => {
  const name = req.params.name;
  const id = await basketId(name)
  if (!id) {
    res.status(422).send({ error: `${name} isn't a basket.` })
  } else {
    const header = JSON.stringify(req.headers);
    const body = req.body.toString();
    const method = req.method;
    const path = req.path;
    const query = new URLSearchParams(req.query).toString();

    const reqId = await createRequest(name, { header, method, path, query, basket_id: id })
    if (body.length > 0) await createBody(id, reqId, body);

    res.status(200).send({ message: `Request was made` });
  }

  res.send()
})

app.listen(port, host, () => {
  console.log(`App is listening on port ${port} of ${host}!`);
});
