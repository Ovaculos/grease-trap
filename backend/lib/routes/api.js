import express from "express";
const router = express.Router();

import {
  getBaskets,
  createBasket,
  getRequestsForBasket,
  deleteBasket
} from "../database/pg.js";

import { getBodies, deleteBodies } from "../database/mongo.js";

import { filterRequest, attachBodies } from "../helpers/route-helpers.js"

router.get("/", async (req, res) => {
  const baskets = await getBaskets();
  if (baskets.error) {
    console.error(baskets.error);
    res.status(503).send({ error: `Problem` });
    return;
  }

  res.status(200).send({ baskets });
});

router.get("/:name", async (req, res) => {
  const name = req.params.name;
  const baskets = await getBaskets();
  if (baskets.error) {
    console.error(baskets.error);
    res.status(503).send({ error: `Problem` });
    return;
  }

  if (!baskets.sort().includes(name)) {
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

    attachBodies(requests, bodies);
    requests = requests.map(filterRequest);
    requests.sort((a, b) => b.date_time - a.date_time);
  };

  res.status(200).send({ requests });
});

router.delete("/:name", async (req, res) => {
  const name = req.params.name;
  const deleteResult = await deleteBasket(name);

  if (deleteResult.error) {
    console.error(deleteResult.error);
    res.status(422).send({ error: `Basket doesn't exist `});
    return;
  }

  const bodiesResult = await deleteBodies(deleteResult.id);

  if (bodiesResult.error) {
    console.error(bodiesResult.error);
    res.status(422).send({ error: `Basket doesn't exist `});
    return;
  }

  res.status(204).send();
})

router.post("/", async (req, res) => {
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

export default router;
