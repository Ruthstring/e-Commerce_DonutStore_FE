import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Featured from "./components/Featured";
import Stores from "./components/Stores";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import Login from "./components/Login";
import Register from "./components/Register";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  

  return (
    <>
    <Router>
      {/* Navbar is outside Routes to render it on all pages */}
      <NavBar />
      <Routes>
       
        <Route path="/" element={
          <>
            <Hero />
            <Featured />
            <Stores />
          </>
        } />

        <Route path="/menu" element={<Menu />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<ShoppingCart />} />
        
      </Routes>
      {/* Footer is outside Routes to render it on all pages */}
      <Footer />
    </Router>
        
    </>
  )
}

export default App
