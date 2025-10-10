import React from "react";
import Home from "./pages/Home";
import Brcnight from "./components/Brcnight";
import Layout from "./components/Layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroBanner from "./pages/HeroBanner";
import Resto from "./components/Restos";
import Argentinanight from "./components/Argentinanight";
import Cbanight from "./components/Cbanight";
import Hospedajes from "./components/Hospedajes";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/brcnight" element={<Brcnight />} />
          <Route path="/herobanner" element={<HeroBanner />} />
          <Route path="/restos" element={<Resto />} />
          <Route path="/argentinanight" element={<Argentinanight />} />
          <Route path="/cbanight" element={<Cbanight />} />
          <Route path="/hospedajes" element={<Hospedajes />} />
        </Routes>
      </Layout>
    </Router>
  );
}
