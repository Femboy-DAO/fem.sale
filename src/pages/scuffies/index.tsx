import React from 'react';
import '../../App.css';
import { ScuffedBanner, ScuffedLore, Debug, DAOLore, Deposit, Withdraw, ScuffedCarousel, ScuffedSale, ScuffedInfo, Navbar, NavbarRoutes, SaleStatus } from '../../components'
import { Footer } from '../../components/Footer';
import { DEBUG } from '../../config';

function App() {
  return <>
    {/* <SaleStatus />
    <Deposit /> */}
    <ScuffedBanner />
    <ScuffedInfo />
    <ScuffedCarousel />
    <Navbar />
    <ScuffedSale />
    <ScuffedLore />
    {/*  DEBUG && <Debug /> */}
  </>
}

export default App;