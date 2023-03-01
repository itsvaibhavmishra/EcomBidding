import express from 'express';
import Order from '../models/orderModel.js';
import { isAuth } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';

const orderRouter = express.Router();
orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((item) => ({
        ...item,
        product: item._id,
      })),

      shippingAddress: res.body.shippingAddress,
      paymentMethod: res.body.paymentMethod,
      itemsPrice: res.body.itemsPrice,
      shippingPrice: res.body.shippingPrice,
      taxPrice: res.body.taxPrice,
      totalPrice: res.body.totalPrice,
      user: res.body._id,
    });

    const order = await newOrder.save();
    res.status(201).send({ message: 'New Order Created', order });
  })
);

export default orderRouter;
