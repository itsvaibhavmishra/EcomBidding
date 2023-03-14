import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import uploadRouter from './routes/uploadRoutes.js';
import auctionRouter from './routes/auctionRoutes.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Now you can use the io object to emit and listen for events
io.on('connection', (socket) => {
  console.log('a user connected');

  // Listen for new bids
  socket.on('bid', async (data) => {
    const { auctionId, bidder, bidAmount } = data;

    // Update the auction with the new bid
    const auction = await auctionRouter.findById(auctionId);
    if (!auction) {
      return socket.emit('error', { message: 'Auction not found' });
    }

    if (auction.endTime < new Date()) {
      return socket.emit('error', { message: 'Auction has ended' });
    }

    if (bidAmount <= auction.currentBid) {
      return socket.emit('error', {
        message: 'Bid amount must be higher than the current bid',
      });
    }

    auction.currentBid = bidAmount;
    auction.bids.push({ bidder, bidAmount });
    await auction.save();

    // Notify all clients about the new bid
    io.emit('newBid', { auctionId, currentBid: auction.currentBid, bidder });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
// returns list of products for auctions
app.use('/api/auctions', auctionRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
}); // server starts listining to requests
