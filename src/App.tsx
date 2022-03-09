import React from 'react';
import './App.css';
import { Debug, Deposit, Withdraw, Navbar, SaleStatus } from './components'
import { DEBUG } from './config';


function App() {
  return <>
    <Navbar />
    <SaleStatus />
    <Deposit />
    <Withdraw />
    { DEBUG && <Debug />}
  </>
}

export default App;
