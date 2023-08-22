import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Brands from "../components/Brands";

function Home() {
  return (
    <>
      <section className="h-screen flex flex-col">
        <Navbar />
        <Hero />
      </section>
      <Brands />
    </>
  );
}

export default Home;
