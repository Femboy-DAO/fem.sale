import React from 'react';
import '../../App.css';
import { DaoBanner, FooterBanner, Debug, DAOLore, Deposit, Withdraw, ScuffedCarousel, ScuffedSale, ScuffedInfo, Navbar, NavbarRoutes, SaleStatus } from '../../components'
import { Footer } from '../../components/Footer';
import { DEBUG } from '../../config';

function App() {
  return <>
    {/* <SaleStatus />
    <Deposit /> */}
    <DaoBanner />
    <Navbar />
    <DAOLore />
    <FooterBanner />
    {/*  DEBUG && <Debug /> */}
  </>
}

export default App;