import express from 'express';
import data from './data.js';

const app = express();

// returns list of products for this api
app.get('/api/products', (req, res) => {
  res.send(data.products);
});

// :id is the product id user requested
app.get('/api/products/id/:id', (req, res) => {
  const product = data.products.find((x) => x.id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
}); // server starts listining to requests
