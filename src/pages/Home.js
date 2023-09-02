import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Partners from "../components/Partners";

function Home() {
  return (
    <>
      <section className="h-screen flex flex-col">
        <Navbar />
        <Hero />
      </section>
      <Partners />
    </>
  );
}

export default Home;
