import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

// Variants for slide animation
const slideVariants = {
  visible: { opacity: 1, transition: { delay: 0.5, duration: 0.5 } },
  hidden: { opacity: 0.2, transition: { duration: 0.5 } },
};

function SimpleCarousel({
  slides,
  autoSlide = true,
  autoSlideInterval = 5000,
}) {
  // State for current slide
  const [currentSlide, setCurrentSlide] = useState(0);

  // Updating current slide
  const toNextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  }, [slides.length]);

  // Autometically changing slide after a certain interval
  useEffect(() => {
    if (autoSlide) {
      const interval = setInterval(() => {
        toNextSlide();
      }, autoSlideInterval);

      return () => clearInterval(interval);
    }
  }, [toNextSlide, autoSlide, autoSlideInterval]);

  // Carousel style
  const carouselStyle = {
    width: `${slides.length * 100}%`,
    transform: `translateX(-${(currentSlide * 100) / slides.length}%)`,
  };

  // Slide style
  const slideStyle = (index) => ({
    backgroundImage: `url(${slides[index].url})`,
  });

  return (
    <div className="w-full h-full overflow-hidden relative">
      <div className="CAROUSEL flex h-full delay-500" style={carouselStyle}>
        {slides.map((_, index) => (
          <motion.div
            key={index}
            variants={slideVariants}
            animate={currentSlide === index ? "visible" : "hidden"}
            style={slideStyle(index)}
            className="SLIDE h-full w-full bg-cover bg-center"
          ></motion.div>
        ))}
      </div>
    </div>
  );
}

// Setting Prop types
SimpleCarousel.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.object).isRequired,
  autoSlide: PropTypes.bool,
  autoSlideInterval: PropTypes.number,
};

export default SimpleCarousel;
