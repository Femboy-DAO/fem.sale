import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import {
  Debug,
  DAOLore,
  Deposit,
  Withdraw,
  ScuffedCarousel,
  ScuffedSale,
  ScuffedInfo,
  Navbar,
  NavbarRoutes,
  SaleStatus,
} from "./components";
import { Footer } from "./components/Footer";
import { DEBUG } from "./config";
import Home from "./pages/home";
import Scuffies from "./pages/scuffies";
import { FbdLinksPage } from "./components/FbdLinksPage";

function App() {
  return (
    <>
      <NavbarRoutes />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scuffies" element={<Scuffies />} />
        <Route path="/links" element={<FbdLinksPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
