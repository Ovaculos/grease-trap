import mongoose from "mongoose";
const url = "mongodb://127.0.0.1:27017/grease-trap";
mongoose.connect(url);

const requestBodySchema = new mongoose.Schema({
  basket_id: {
    type: String,
    required: true
  },
  request_id: {
    type: String,
    required: true
  },
  body: {
    type: String
  }
});

requestBodySchema.index({ request_id: 1 }, { unique: true });

const Body = mongoose.model("Body", requestBodySchema);
Body.createIndexes();

export async function createBody(basket_id, request_id, body) {
  try {
    const newBody = new Body({
      basket_id,
      request_id,
      body,
    });

    await newBody.save();
  } catch (e) {
    return -1
  }
}

export async function getBody(id) {
  const bodyDoc = await Body.find({ request_id: id });
  if (bodyDoc.length === 1) return bodyDoc[0].body
  return ''
}

export async function getBodies(basket_id) {
  const bodies = await Body.find({ basket_id });
  return bodies;
}
