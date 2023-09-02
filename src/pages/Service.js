import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

function Service() {
  return (
    <motion.div
      initial={{ x: 1000 }}
      animate={{ x: 0 }}
      exit={{ x: -1000 }}
      className="text-2xl"
    >
      <Navbar />
      This is Service Page
    </motion.div>
  );
}

export default Service;
