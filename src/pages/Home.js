import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Partners from "../components/Partners";
import { motion } from "framer-motion";
import { routeVariants } from "../utils/constants";
import { Outlet } from "react-router-dom";

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
      <Outlet />
    </>
  );
}

export default Home;
