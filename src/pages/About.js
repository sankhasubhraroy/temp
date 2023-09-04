import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { routeVariants } from "../utils/constants";

function About() {
  return (
    <motion.div
      variants={routeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="text-2xl"
    >
      <Navbar />
      This is About Page
    </motion.div>
  );
}

export default About;
