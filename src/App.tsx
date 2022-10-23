import React from 'react';
import './App.css';
import { Banner, Debug, DAOLore, Deposit, Withdraw, ScuffedCarousel, ScuffedSale, ScuffedInfo, Navbar, SaleStatus } from './components'
import { Footer } from './components/Footer';
import { DEBUG } from './config';

function App() {
  return <>
    {/* <SaleStatus />
    <Deposit /> */}
    <Banner />
    <ScuffedInfo />
    <ScuffedCarousel />
    <Navbar />
    <ScuffedSale />
    <DAOLore />
    {/*  DEBUG && <Debug /> */}
    <Footer/ >
  </>
}

export default App;