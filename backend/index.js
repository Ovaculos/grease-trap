import express from "express";
import http from 'http';
import { Server } from 'socket.io';
import 'dotenv/config';
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: `http://${process.env.host}:${process.env.frontPort}`, // frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  }
});

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
    console.log(2);
    express.raw({ type: '*/*' })(req, res, next);
  }
};

io.on('connection', (socket) => {
  console.log('A client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

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

  if (!/^[\w\d\-_\.]{1,250}$/.test(name) || name === '.' || name === '..') {
    res.status(422).send({ error: `Invalid basket name. Must match regex /^[\w\d\-_\.]{1,250}$/ and not be '.' or '..'` });
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
    const date_time = pgResult.date_time;
    if (body.length > 0 && await createBody(id, reqId, body).error) {
      console.error(`Body wasn't saved for reqId ${reqId}`);
      res.status(503).send({ error: `Problem` });
      return;
    }

    io.emit('newRequest', {
        header,
        method,
        path,
        query,
        body,
        date_time
    });

    res.status(200).send({ message: `Request was made` });
  }
})

server.listen(process.env.backPort, () => {
  console.log(`App is listening on port ${process.env.backPort} of ${process.env.host}!`);
});
