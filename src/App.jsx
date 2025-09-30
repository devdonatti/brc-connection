import React from "react";
import Home from "./pages/Home";
import Brcnight from "./components/Brcnight";
import Layout from "./components/Layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroBanner from "./pages/HeroBanner";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/brcnight" element={<Brcnight />} />
          <Route path="/herobanner" element={<HeroBanner />} />
        </Routes>
      </Layout>
    </Router>
  );
}
