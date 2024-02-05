import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import Films from "./pages/Films";
import Customer from "./pages/Customer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/films" element={<Films />} />
        <Route path="/customer" element={<Customer />} />
      </Routes>
    </>
  );
}

export default App;
