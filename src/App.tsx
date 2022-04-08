import React from 'react';
import './App.css';
import { Debug, Deposit, Withdraw, Navbar, SaleStatus } from './components'
import { Footer } from './components/Footer';
import { DEBUG } from './config';


function App() {
  return <>
    <Navbar />
    <SaleStatus />
    <Deposit />
    <Withdraw />
    { DEBUG && <Debug />}
    <Footer></Footer>
  </>
}

export default App;