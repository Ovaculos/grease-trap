import express from "express";
import cors from "cors";
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

app.use(cors());
app.use(parseBody)

app.get("/api/baskets", async (req, res) => {
  const baskets = await getBaskets();
  if (baskets.error) {
    console.error(baskets.error);
    res.status(503).send({ error: `Problem` });
    return;
  }

  res.status(200).send({ baskets });
});

app.get("/api/baskets/:name", async (req, res) => {
  const name = req.params.name;
  const baskets = await getBaskets();
  if (baskets.error) {
    console.error(baskets.error);
    res.status(503).send({ error: `Problem` });
    return;
  }

  baskets.sort();

  if (!baskets.includes(name)) {
    res.status(404).send({ error: `${name} doesn't exist.` });
    return;
  }

  let requests = await getRequestsForBasket(name);

  if (requests.error) {
    console.error(requests.error);
    res.status(503).send({ error: `Problem` });
    return;
  }

  if (requests.length > 0) {
    const bodies = await getBodies(requests[0].basket_id);

    if (bodies.error) {
      console.error(bodies.error);
      res.status(503).send({ error: `Problem` });
      return;
    }

    let b = 0;

    for (let r = 0; r < requests.length; r++) {
      if (bodies[b] && requests[r].request_id === bodies[b].request_id) {
        requests[r].body = bodies[b].body;
        b++;
      } else {
        requests[r].body = ''
      }
    }

    requests = requests.map(({ header, method, query, date_time, path, body }) => {
      return { header, method, query, date_time, path, body }
    });
  };

  res.status(200).send({ requests: requests.sort((a, b) => b.date_time - a.date_time) });
});

app.post("/api/baskets", async (req, res) => {
  const name = req.body.name;

  if (!/^[\w\d\-_\.]{1,250}$/.test(name)) {
    res.status(422).send({ error: `Name must match regex /^[\w\d\-_\.]{1,250}$/` });
    return;
  }

  const basketCreateResult = await createBasket(name);

  if (basketCreateResult.error) {
    console.error(basketCreateResult.error);
    res.status(409).send({ error: `Basket ${name} already exists.` }); // Potential lie to front end for security (they can't know if db is down, but still get a useful message most of the time)
  } else {
    res.status(200).send(name);
  }
});

app.all("/:name*", async (req, res) => {
  const name = req.params.name;
  const basketResult = await basketId(name);

  if (basketResult.error) {
    res.status(422).send({ error: `${name} is not a basket.` });
  } else {
    const id = basketResult.id;
    const header = JSON.stringify(req.headers);
    let body = req.body.toString();
    if (body === '[object Object]') body = '';
    const method = req.method;
    const path = req.originalUrl;
    const query = new URLSearchParams(req.query).toString();

    const pgResult = await createRequest(name, [header, method, path, query, id]);

    if (pgResult.error) {
      console.error(`Request wasn't saved`);
      res.status(503).send({ error: `Problem` });
      return;
    }

    const reqId = pgResult.id;

    if (body.length > 0 && await createBody(id, reqId, body).error) {
      console.error(`Body wasn't saved for reqId ${reqId}`);
      res.status(503).send({ error: `Problem` });
      return;
    }

    res.status(200).send({ message: `Request was made` });
  }
})

app.listen(port, host, () => {
  console.log(`App is listening on port ${port} of ${host}!`);
});
