import React from "react";
import { motion } from "framer-motion";
import { routeVariants } from "../utils/constants";

function Service() {
  return (
    <motion.div
      variants={routeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="text-2xl"
    >
      This is Service Page
    </motion.div>
  );
}

export default Service;
