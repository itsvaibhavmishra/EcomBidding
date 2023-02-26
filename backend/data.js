// returns data for products
const data = {
  products: [
    {
      _id: '1', // _id to make it compatible with MongoDB
      name: 'Fujifilm Instax Mini 9 Instant Camera',
      id: 'Fujifilm-Instax-Mini-9-Instant-Camera', // id: for url compatibility
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
      _id: '2',
      name: 'Fossil Gen 6 Smartwatch',
      id: 'Fossil-Gen-6-Smartwatch', // id: for url compatibility
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
      _id: '3',
      name: 'Puma Women Shoes',
      id: 'Puma-Women-Shoes', // id: for url compatibility
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
      _id: '4',
      name: 'Urbano Men T-Shirt',
      id: 'Urbano-Men-T-Shirt', // id: for url compatibility
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
