import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const FeaturesPage = lazy(() => import("./pages/FeaturesPage.jsx"));
const TeamPage = lazy(() => import("./pages/TeamPage.jsx"));

const App = () => {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/team" element={<TeamPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
