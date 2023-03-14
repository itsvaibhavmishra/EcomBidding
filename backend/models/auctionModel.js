// Auction Product database from DB
import mongoose from 'mongoose';

const auctionSchema = new mongoose.Schema({
  // Accepts objest as parameter that defines the fields of products
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  startingBid: {
    type: Number,
    required: true,
  },
  currentBid: {
    type: Number,
    default: 0,
  },
  endTime: {
    type: Date,
    required: true,
  },
  bids: [
    {
      bidder: {
        type: String,
        required: true,
      },
      bidAmount: {
        type: Number,
        required: true,
      },
      bidTime: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

// creating model for schema
const Auction = mongoose.model('Auction', auctionSchema);

export default Auction;
