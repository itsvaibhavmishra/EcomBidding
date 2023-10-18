import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';
import path from 'path';

import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import uploadRouter from './routes/uploadRoutes.js';
import auctionRouter from './routes/auctionRoutes.js';
import Auction from './models/auctionModel.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// implementing api for paypal
app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sandbox');
});

app.use('/api/seed', seedRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('[DB] Connection Success');
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use('/api/upload', uploadRouter);
// returns list of products for this api
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/auctions', auctionRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.API_URI,
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) => {
  socket.on('joinAuction', async (auctionId) => {
    try {
      const auction = await Auction.findById(auctionId);

      if (!auction) {
        console.log(`[Socket] Auction not found ${auctionId}`);
        socket.emit('auctionError', { message: 'Auction not found' });
      } else {
        console.log(`[Socket] Joining auction ${auctionId}`);
        socket.join(auctionId);
        socket.emit('auctionData', auction);
      }
    } catch (error) {
      console.log(
        `[Socket] Error joining auction ${auctionId}: ${error.message}`
      );
      socket.emit('auctionError', { message: 'Server Error' });
    }
  });

  socket.on('leaveAuction', (auctionId) => {
    console.log(`[Socket] Leaving auction ${auctionId}`);
    socket.leave(auctionId);
  });

  socket.on('placeBid', async ({ auctionId, bidder, bidAmount }) => {
    try {
      const auction = await Auction.findById(auctionId);

      if (!auction) {
        console.log(`[Socket] Auction not found ${auctionId}`);
        socket.emit('auctionError', { message: 'Auction not found' });
        return;
      }

      if (bidAmount <= auction.currentBid) {
        console.log(
          `[SocketIO] Bid must be greater than current bid: ${bidAmount}`
        );
        return;
      }

      if (auction.endDate === 0) {
        console.log(`[SocketIO] Auction has ended: ${auctionId}`);
        return;
      }

      auction.bids.push({ bidder: 'Anonymous', bidAmount: bidAmount });
      auction.currentBid = bidAmount;

      const updatedAuction = await auction.save();
      io.to(auctionId).emit('bidUpdated', updatedAuction);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on('disconnect', () => {});
});

server.listen(port, () => {
  console.log(`Server at port: ${port}`);
}); // server starts listining to requests

export { server, io };
