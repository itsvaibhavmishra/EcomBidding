import express from 'express';
import Auction from '../models/auctionModel.js';
import { io } from '../server.js';

const auctionRouter = express.Router();

// Create new auction
auctionRouter.post('/', async (req, res) => {
  try {
    const { title, description, startingBid, imageUrl, endDate } = req.body;

    const newAuction = new Auction({
      title,
      description,
      startingBid,
      currentBid: startingBid,
      imageUrl,
      endDate,
    });

    const createdAuction = await newAuction.save();
    res.status(201).json(createdAuction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all auctions
auctionRouter.get('/', async (req, res) => {
  try {
    const auctions = await Auction.find({});
    res.json(auctions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get a specific auction
auctionRouter.get('/:id', async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }
    res.json(auction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Place a bid on an auction
auctionRouter.post('/:id/bids', async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);

    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    const { bidder, bidAmount } = req.body;

    if (bidAmount <= auction.currentBid) {
      return res
        .status(400)
        .json({ message: 'Bid amount must be greater than current bid' });
    }

    if (auction.endDate === 0) {
      return res.status(400).json({ message: 'Auction has ended' });
    }

    auction.bids.push({ bidder, bidAmount });
    auction.currentBid = bidAmount;

    const updatedAuction = await auction.save();
    io.emit('bid', updatedAuction); // emit the 'bid' event with the updated auction
    res.json(updatedAuction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default auctionRouter;
