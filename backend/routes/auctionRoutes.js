import express from 'express';
import Auction from '../models/auctionModel.js';
import expressAsyncHandler from 'express-async-handler';
import { isAuth, isSeller } from '../utils.js';

const auctionRouter = express.Router();

// Middleware function to check if user is logged in
function checkLoggedIn(req, res, next) {
  if (!isAuth()) {
    return res.status(401).json({ message: 'You must be logged in' });
  }
  next();
}

// Middleware function to check if user is the seller
function checkSeller(req, res, next) {
  if (!isSeller()) {
    return res
      .status(403)
      .json({ message: 'You are not authorized to perform this action' });
  }
  next();
}

// READ
auctionRouter.get('/', async (req, res) => {
  try {
    const auctions = await Auction.find();
    res.status(200).json(auctions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

auctionRouter.get('/:id', getAuction, (req, res) => {
  res.status(200).json(res.auction);
});

// CREATE
auctionRouter.post(
  '/',
  checkLoggedIn,
  expressAsyncHandler(async (req, res) => {
    try {
      const newAuction = new Auction(req.body);
      newAuction.seller = req.user._id; // Set the seller as the logged-in user
      const savedAuction = await newAuction.save();
      res.status(201).json(savedAuction);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  })
);

// UPDATE
auctionRouter.patch(
  '/:id',
  checkLoggedIn,
  checkSeller,
  getAuction,
  expressAsyncHandler(async (req, res) => {
    try {
      const updatedAuction = await res.auction.set(req.body).save();
      res.status(200).json(updatedAuction);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  })
);

// DELETE
auctionRouter.delete(
  '/:id',
  checkLoggedIn,
  checkSeller,
  getAuction,
  expressAsyncHandler(async (req, res) => {
    try {
      await res.auction.remove();
      res.status(204).json();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
);

// Middleware function to get a single auction by ID
async function getAuction(req, res, next) {
  try {
    const auction = await Auction.findById(req.params.id);
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }
    res.auction = auction;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export default auctionRouter;
