import bcrypt from 'bcryptjs';

// returns data for products
const data = {
  users: [
    {
      // Admin user
      name: 'Vaibhaw',
      email: 'admin@example.com',
      password: bcrypt.hashSync('admin@1234'),
      isAdmin: true,
    },
    {
      name: 'User',
      email: 'user@example.com',
      password: bcrypt.hashSync('abc123'),
      isAdmin: false,
    },
  ],

  products: [
    {
      name: 'Fujifilm Instax Mini 9 Instant Camera',
      url: 'Fujifilm-Instax-Mini-9-Instant-Camera', // url: for url compatibility
      description: 'premium quality camera for capturing your best moments',
      category: 'Electronics',
      image: '../images/Fujifilm.jpg',
      price: 4999,
      rating: 4.5,
      brand: 'Fujifilm',
      stock: 10,
      reviews: 5,
    },
    {
      name: 'Fossil Gen 6 Smartwatch',
      url: 'Fossil-Gen-6-Smartwatch', // url: for url compatibility
      description:
        'Smartwatch with AMOLED Screen, Snapdragon 4100+ Wear Platform, Wear OS by Google, Google Assistant, SpO2, Wellness Features and Smartphone Notifications',
      category: 'Electronics',
      image: '../images/fossilSmartwatch.jpg',
      price: 24995,
      rating: 4,
      brand: 'Fossil',
      stock: 10,
      reviews: 10,
    },
    {
      name: 'Puma Women Shoes',
      url: 'Puma-Women-Shoes', // url: for url compatibility
      description: "Puma Women's Maximal Comfort WNS Leather Running Shoe",
      category: 'Shoes',
      image: '../images/womenShoes.jpg',
      price: 2699,
      rating: 3.5,
      brand: 'Puma',
      stock: 0,
      reviews: 2,
    },
    {
      name: 'Urbano Men T-Shirt',
      url: 'Urbano-Men-T-Shirt', // url: for url compatibility
      description:
        "Urbano Fashion Men's Printed Full Sleeve Slim Fit Cotton T-Shirt",
      category: 'Clothings',
      image: '../images/menShirt.jpg',
      price: 439,
      rating: 3,
      brand: 'Urbano',
      stock: 10,
      reviews: 1,
    },
  ],
};

export default data;
