// Product database from DB
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  // Accepts objest as parameter that defines the fields of products
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  // Accepts options
  {
    timestamps: true, // for logging timestamp for create and update of records
  }
);

// creating model for schema
const User = mongoose.model('User', userSchema);

export default User;
