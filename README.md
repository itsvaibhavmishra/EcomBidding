# <div align="center">EcomBidding</div>

<div align="center">
  <img src="https://i.imgur.com/muCFlpP.png" />
</div>

<br/>

<p>
Introducing our innovative and comprehensive ecommerce website with an exciting twist - an integrated auction house! Our website, built using the popular MERN stack, offers a seamless and user-friendly experience for both buyers and sellers alike. <br/>

With our multi-user feature, we provide a platform for admins, sellers, and buyers to interact and transact seamlessly. Our website is designed with separate sections for each role, providing a smooth and efficient experience for all users. <br/>

We offer a diverse range of products for our customers to choose from. From electronics and clothing to home goods and accessories, we have it all! Our auction house adds an exciting element to the shopping experience, allowing users to bid on their favorite products and potentially snag a great deal. <br/>

Our integrated payment method via PayPal ensures that all transactions are safe and secure. Additionally, our verification headers provide an added layer of security for our users, ensuring that their personal information is protected at all times. <br/>

Whether you're an admin managing your store, a seller listing your products, or a buyer browsing and bidding, our website has everything you need. We pride ourselves on our user-centric design and robust feature set, making us the go-to destination for all your online shopping needs. So what are you waiting for? Start exploring and bidding today!

</p>

## Features

- Interactive home page displaying products in a card view

- React context API for cart data, user data, shipping address, and payment method selection

- Search page for searching, sorting, and filtering products

- PayPal payment gateway integration

- Cloudinary integration for storing and using images

- Axios for promise-based HTTP API requests

- Google Charts for creating charts and graphs

- Tailwind CSS for building custom designs with minimal CSS code

- Font Awesome for customizable icons

- Local Storage API for storing key/value pairs in a web browser

- Multi-vendor support for Users, Sellers, and Admin

- Real-time bidding system using socket.io

- Product management features for Admin and Seller (add, delete, etc.)

- User authentication and profile editing

- Express Async Handler, JSON Web Tokens, Bcrypt JS, CORS, and Dot Env for backend security

- Pagination for user-friendly interface

<br/>

## Project Live On

<a href="https://ecombidding.netlify.app/">Netlify</a>
<br/>
[![Netlify Status](https://api.netlify.com/api/v1/badges/57157fd5-fb29-4d16-8617-fd908415a384/deploy-status)](https://app.netlify.com/sites/ecombidding/deploys)

## Technology Used

<div align="center">  
<a href="https://reactjs.org/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/react-original-wordmark.svg" alt="React" height="50" /></a>  
<a href="https://www.w3schools.com/css/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/css3-original-wordmark.svg" alt="CSS3" height="50" /></a>  
<a href="https://en.wikipedia.org/wiki/HTML5" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/html5-original-wordmark.svg" alt="HTML5" height="50" /></a>  
<a href="https://www.javascript.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/javascript-original.svg" alt="JavaScript" height="50" /></a>  
<a href="https://nodejs.org/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/nodejs-original-wordmark.svg" alt="Node.js" height="50" /></a>  
<a href="https://expressjs.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/express-original-wordmark.svg" alt="Express.js" height="50" /></a>  
<a href="https://github.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/git-scm-icon.svg" alt="Git" height="50" /></a>  
<a href="http://tailwindcss.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/tailwindcss.svg" alt="Tailwind" height="50" /></a>  
<a href="http://mongodb.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/mongodb-original-wordmark.svg" alt="MongoDB" height="50" /></a>  
</div>

<br/>

## Commands

### Backend

```bash
$ npm install
```

Installs all the required packages for backend

```bash
$ npm start
```

Starts the server using nodemon

## Frontend

```bash
$ npm install
```

Installs all the required packages for frontend

```bash
$ npm start
```

Runs frontend on localhost(React App)

```bash
$ npm run build
```

Creates an optimized production build

<br/>

## Folder Structure

```
EcomBidding/
├── backend/
│   ├── models/
│   │   ├── auctionModel.js
│   │   ├── orderModel.js
│   │   ├── productModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── auctionRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── productRoutes.js
│   │   ├── seedRoutes.js
│   │   ├── uploadRoutes.js
│   │   └── userRoutes.js
│   ├── .env
│   ├── index.js
│   └── utils.js
├── frontend/
│   ├── public/
│   │   ├── favicon.png
│   │   └── index.html
│   ├── src/
│   │   ├── Components/
│   │   │   ├── AdminRoute/
│   │   │   │   └── AdminRoute.js
│   │   │   ├── AuctionItem/
│   │   │   │   └── AuctionItem.js
│   │   │   ├── Categories/
│   │   │   │   ├── Categories.css
│   │   │   │   └── Categories.js
│   │   │   ├── CheckoutSteps/
│   │   │   │   └── CheckoutSteps.js
│   │   │   ├── ErrorPage/
│   │   │   │   ├── ErrorPage.css
│   │   │   │   └── ErrorPage.js
│   │   │   ├── Loading/
│   │   │   │   └── Loading.js
│   │   │   ├── LoadingDots/
│   │   │   │   ├── LoadingDots.css
│   │   │   │   └── LoadingDots.js
│   │   │   ├── Product/
│   │   │   │   └── Product.js
│   │   │   ├── ProtectedRoute/
│   │   │   │   └── ProtectedRoute.js
│   │   │   ├── Rating/
│   │   │   │   └── Rating.js
│   │   │   └── SellerRoute/
│   │   │       └── SellerRoute.js
│   │   ├── Pages/
│   │   │   ├── AddressPage/
│   │   │   │   ├── AddressPage.css
│   │   │   │   └── AddressPage.js
│   │   │   ├── Auction/
│   │   │   │   ├── Auction.css
│   │   │   │   └── Auction.js
│   │   │   ├── AuctionDetails/
│   │   │   │   ├── AuctionDetail.css
│   │   │   │   └── AuctionDetail.js
│   │   │   ├── CartPage/
│   │   │   │   ├── CartPage.css
│   │   │   │   └── CartPage.js
│   │   │   ├── CreateAuction/
│   │   │   │   ├── CreateAuction.css
│   │   │   │   └── CreateAuction.js
│   │   │   ├── Dashboard/
│   │   │   │   ├── Dashboard.css
│   │   │   │   └── Dashboard.js
│   │   │   ├── Footer/
│   │   │   │   └── Footer.js
│   │   │   ├── Header/
│   │   │   │   └── Header.js
│   │   │   ├── Home/
│   │   │   │   ├── Home.css
│   │   │   │   └── Home.js
│   │   │   ├── OrderHistory/
│   │   │   │   ├── OrderHistory.css
│   │   │   │   └── OrderHistory.js
│   │   │   ├── OrderListPage/
│   │   │   │   ├── OrderListPage.css
│   │   │   │   └── OrderListPage.js
│   │   │   ├── OrderPage/
│   │   │   │   ├── OrderPage.css
│   │   │   │   └── OrderPage.js
│   │   │   ├── PaymentMethod/
│   │   │   │   ├── PaymentMethod.css
│   │   │   │   └── PaymentMethod.js
│   │   │   ├── PlaceOrder/
│   │   │   │   ├── PlaceOrder.css
│   │   │   │   └── PlaceOrder.js
│   │   │   ├── ProductEditPage/
│   │   │   │   ├── ProductEditPage.css
│   │   │   │   └── ProductEditPage.js
│   │   │   ├── ProductListPage/
│   │   │   │   ├── ProductListPage.css
│   │   │   │   └── ProductListPage.js
│   │   │   ├── ProfilePage/
│   │   │   │   ├── ProfilePage.css
│   │   │   │   └── ProfilePage.js
│   │   │   ├── SearchPage/
│   │   │   │   └── SearchPage.js
│   │   │   ├── SignIn/
│   │   │   │   ├── Assets/
│   │   │   │   │   ├── avatar.svg
│   │   │   │   │   ├── unlock.svg
│   │   │   │   │   └── wave.png
│   │   │   │   └── SignIn.js
│   │   │   ├── SignUp/
│   │   │   │   ├── Assets/
│   │   │   │   │   ├── avatar.svg
│   │   │   │   │   ├── unlock.svg
│   │   │   │   │   └── wave.png
│   │   │   │   └── SignUp.js
│   │   │   ├── UserEditPage/
│   │   │   │   ├── UserEditPage.css
│   │   │   │   └── UserEditPage.js
│   │   │   └── UserListPage/
│   │   │       ├── UserListPage.css
│   │   │       └── UserListPage.js
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── Store.js
│   │   └── utils.js
│   ├── .env
│   └── tailwind.config.js
├── .gitignore
└── README.md
```

<br/>

<div align="center">
<img src="https://komarev.com/ghpvc/?username=itsvaibhavmishra&&style=flat-square" align="center" />
</div>

<br/>

<div align="center">
            <a href="https://www.buymeacoffee.com/vaibhawmishra" target="_blank" style="display: inline-block;">
                <img
                    src="https://img.shields.io/badge/Donate-Buy%20Me%20A%20Coffee-orange.svg?style=flat-square&logo=buymeacoffee" 
                    align="center"
                />
            </a></div>
<br />

---
