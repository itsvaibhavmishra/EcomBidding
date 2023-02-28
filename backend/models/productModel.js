// Product database from DB
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  // Accepts objest as parameter that defines the fields of products
  {
    name: { type: String, required: true, unique: true },
    url: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    brand: { type: String, required: true },
    stock: { type: Number, required: true },
    reviews: { type: Number, required: true },
  },
  // Accepts options
  {
    timestamps: true, // for logging timestamp for create and update of records
  }
);

// creating model for schema
const Product = mongoose.model('Product', productSchema);

export default Product;
