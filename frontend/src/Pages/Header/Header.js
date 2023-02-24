import React, { useState } from 'react';
import './Header.css';

import { GiHamburgerMenu } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  return (
    <>
      <nav className="main-nav">
        <div className="logo">
          <NavLink to="/">
            <h2>
              <span className="Ecom">Ecom</span>Bidding
            </h2>
          </NavLink>
        </div>

        <div className={showMediaIcons ? 'mobile-menu-link' : 'menu-link'}>
          <li>
            <NavLink to="/">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/">Cart</NavLink>
          </li>
          <li>
            <NavLink to="/">Seller</NavLink>
          </li>
          <li>
            <NavLink to="/">Admin</NavLink>
          </li>
        </div>

        <div className="search-bar-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search products"
          />
        </div>

        <div className="menu-container">
          <div className="hamburger-menu">
            <div onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <GiHamburgerMenu />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
