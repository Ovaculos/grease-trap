import mongoose from "mongoose";
import 'dotenv/config';
const url = process.env.mongoUrl
mongoose.connect(url);

const bodySchema = new mongoose.Schema({
  basket_id: {
    type: String,
    required: true
  },
  request_id: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

bodySchema.index({ basket_id: 1, request_id: 1 });

const Body = mongoose.model("Body", bodySchema);
await Body.createIndexes();

export async function createBody(basket_id, request_id, body) {
  try {
    const newBody = new Body({
      basket_id,
      request_id,
      body,
    });

    await newBody.save();
    return { success: `Body was saved.` };
  } catch (e) {
    return { error: `Body was not saved.` };
  }
}

export async function getBodies(basket_id) {
  try {
    return await Body.find({ basket_id }).sort({ request_id: 1 });
  } catch (e) {
    return { error: `Could not get bodies from MongoDB` };
  }
}
