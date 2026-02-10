import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";

import Home from "./pages/Home.jsx";
import FeaturesPage from "./pages/FeaturesPage.jsx";
import TeamPage from "./pages/TeamPage.jsx";

const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/team" element={<TeamPage />} />
      </Routes>
    </Router>
  );
};

export default App;
