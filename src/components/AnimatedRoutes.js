import React from "react";
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import About from "../pages/About";
import Service from "../pages/Service";
import Contact from "../pages/Contact";

function AnimatedRoutes() {
  return (
    <>
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default AnimatedRoutes;
