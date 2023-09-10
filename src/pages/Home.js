import React from "react";
import Hero from "../components/Hero";
import Partners from "../components/Partners";
import { motion } from "framer-motion";
import { routeVariants } from "../utils/constants";

function Home() {
  return (
    <>
      <motion.section
        variants={routeVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5 }}
        className="flex flex-col"
      >
        <Hero />
        <Partners />
      </motion.section>
    </>
  );
}

export default Home;
