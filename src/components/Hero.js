import React from "react";
import SimpleCarousel from "./Carousels/SimpleCarousel";
import { backgroundSlides } from "../utils/constants";
import Button from "./Buttons";

function Hero() {
  return (
    <section className="w-full h-screen relative">
      <SimpleCarousel
        slides={backgroundSlides}
        autoSlide={true}
        customSlide={false}
        slideMarker={true}
        autoSlideInterval={5000}
      />

      <div className="absolute inset-0 w-full h-full bg-primary-dark bg-opacity-70"></div>
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent to-primary-dark"></div>

      <div className="PRIMARY-BOX absolute inset-0 w-1/2 h-full ml-40 flex flex-col justify-center items-start gap-8 max-md:w-full max-md:m-0 max-md:p-10">
        <h1 className="font-basic font-extrabold text-5xl text-white max-sm:text-4xl max-sm:text-center">
          Search and connect with top freelancers for your projects
        </h1>
        <div className="BUTTON-BOX w-full flex gap-8 max-sm:justify-center">
          <Button buttonName="Explore" />
          <Button buttonName="Join Us" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
