import React from "react";
import Navbar from "../components/Navbar";
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
        className="h-screen flex flex-col"
      >
        <Navbar />
        <Hero />
        <Partners />
      </motion.section>
    </>
  );
}

export default Home;
