import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "../pages/Home";
import About from "../pages/About";
import Service from "../pages/Service";
import Contact from "../pages/Contact";
import Navbar from "./Navbar";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="service" element={<Service />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default AnimatedRoutes;
