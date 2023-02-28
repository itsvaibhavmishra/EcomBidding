import express from 'express';
import data from '../data.js';
import Product from '../models/productModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  // removing all previous records in products model
  await Product.deleteMany({});
  const createdProducts = await Product.insertMany(data.products);
  res.send({ createdProducts }); // sending new products to the frontend
});

export default seedRouter;
