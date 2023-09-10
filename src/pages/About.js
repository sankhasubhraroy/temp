import React from "react";
import { motion } from "framer-motion";
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
      This is About Page
    </motion.div>
  );
}

export default About;
