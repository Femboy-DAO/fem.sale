import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Banner, Debug, DAOLore, Deposit, Withdraw, ScuffedCarousel, ScuffedSale, ScuffedInfo, Navbar, NavbarRoutes, SaleStatus } from './components'
import { Footer } from './components/Footer';
import { DEBUG } from './config';
import Home from './pages/home';
import Scuffies from './pages/scuffies';

function App() {
  return <>
    <NavbarRoutes />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/scuffies" element={<Scuffies />} />
    </Routes>
    <Footer />
  </>
}

export default App;