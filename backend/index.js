import express from "express";
import http from 'http';
import { Server } from 'socket.io';
import 'dotenv/config';
import apiRoutes from "./lib/routes/api.js";
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
  basketId,
  createRequest,
} from "./lib/database/pg.js";

import { createBody } from "./lib/database/mongo.js";
import { parseRequest } from "./lib/helpers/route-helpers.js"

const parseBody = (req, res, next) => {
  if (/^\/api/.test(req.path)) {
    express.json()(req, res, next);
  } else {
    express.raw({ type: '*/*' })(req, res, next);
  }
};

// io.on('connection', (socket) => {
//   console.log('A client connected:', socket.id);

//   socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
// });

app.use(parseBody);
app.use("/api/baskets", apiRoutes);

app.all("/:name*", async (req, res) => {
  const name = req.params.name;
  const basketResult = await basketId(name);

  if (basketResult.error) {
    res.status(422).send({ error: `${name} is not a basket.` });
  } else {
    const id = basketResult.id;
    const { header, body, method, path, query } = parseRequest(req);

    const pgResult = await createRequest(name, [header, method, path, query, id]);

    if (pgResult.error) {
      console.error(`Request wasn't saved`);
      res.status(503).send({ error: `Problem` });
      return;
    }

    const { reqId, date_time } = pgResult;

    if (body.length > 0) {
      const bodyResult = await createBody(id, reqId, body)
      if (bodyResult.error) {
        console.error(`Body wasn't saved for reqId ${reqId}`);
        res.status(503).send({ error: `Problem` });
        return;
      }
    }

    io.emit(name, {
        header,
        method,
        path,
        query,
        body,
        date_time,
    });

    res.status(200).send({ message: `Request was made` });
  }
});

server.listen(process.env.backPort, () => {
  console.log(`App is listening on port ${process.env.backPort} of ${process.env.host}!`);
});
