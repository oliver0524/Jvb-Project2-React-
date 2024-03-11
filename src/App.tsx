import React, { createContext, useContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { DarkModeContext } from './DarkModeContext';
import { DarkModeProvider } from './DarkModeContext';
import { DarkModeToggle } from './DarkModeToggle';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProductsPage } from './pages/ProductsPage';
import { PageNotFound } from './pages/PageNotFound';
import { Navbar } from './components/NavBar';
import { LandingPage } from './pages/LandingPage';
import SellerPage from "./pages/SellerPage";

function App() {

  return (
    <DarkModeProvider>
    <div className="App">
    <h1>The Product | Seller App</h1>
    <DarkModeToggle/>
      <BrowserRouter>
      <Navbar></Navbar>
        <Routes>
          <Route path='' element={<LandingPage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path="/seller" element={<SellerPage />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      </div>
    </DarkModeProvider>
  );
}

export default App;
