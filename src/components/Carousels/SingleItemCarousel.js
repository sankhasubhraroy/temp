import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Variants for slide animation
const slideVariants = {
  enter: (direction) => {
    return { x: direction > 0 ? 1000 : -1000, opacity: 0 };
  },
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (direction) => {
    return { zIndex: 0, x: direction < 0 ? 1000 : -1000, opacity: 0 };
  },
};

// Variants for dots animation
const dotsVariants = {
  initial: { opacity: 0.6 },
  active: { scale: 1.5, opacity: 1 },
  hover: { scale: 1.2, opacity: 0.9 },
};

// Framer Motion swipe power
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

function SingleItemCarousel({
  slides,
  autoSlide = true,
  autoSlideInterval = 5000,
  navigation = true,
  dots = true,
}) {
  // State for current slide and direction
  const [[currentSlide, direction], setCurrentSlide] = useState([0, 0]);
  const slideIndex =
    ((currentSlide % slides.length) + slides.length) % slides.length;

  // Changing slide according to direction
  const changeSlide = useCallback(
    (newDirection) => {
      setCurrentSlide([currentSlide + newDirection, newDirection]);
    },
    [currentSlide]
  );

  // Changing slide according to index
  const changeSlideTo = (index) => {
    if (index === slideIndex) return;
    setCurrentSlide([index, index > slideIndex ? 1 : -1]);
  };

  // Autometically changing slide after a certain interval
  useEffect(() => {
    if (autoSlide) {
      const interval = setInterval(() => {
        changeSlide(1);
      }, autoSlideInterval);

      return () => clearInterval(interval);
    }
  }, [changeSlide, autoSlide, autoSlideInterval]);

  return (
    <div className="CAROUSEL h-full w-full overflow-hidden relative">
      <AnimatePresence initial={false} custom={direction}>
        {slides.map(
          (_, index) =>
            index === slideIndex && (
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    changeSlide(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    changeSlide(-1);
                  }
                }}
                className="SLIDE absolute h-full w-full flex items-center justify-center"
              >
                <img
                  src={slides[index].url}
                  alt={slides[index].title}
                  draggable={false}
                  className="w-full h-full object-cover object-center select-none"
                />
              </motion.div>
            )
        )}
      </AnimatePresence>

      {navigation && (
        <button
          className="NAVIGATION-NEXT absolute top-1/2 right-4 -translate-y-1/2 p-1 rounded-full bg-white bg-opacity-50 z-[2] hover:bg-opacity-80 transition duration-300 ease-in"
          onClick={() => changeSlide(1)}
        >
          <FiChevronRight size={28} />
        </button>
      )}
      {navigation && (
        <button
          className="NAVIGATION-PREVIOUS absolute top-1/2 left-4 -translate-y-1/2 p-1 rounded-full bg-white bg-opacity-50 z-[2] hover:bg-opacity-80 transition duration-300 ease-in"
          onClick={() => changeSlide(-1)}
        >
          <FiChevronLeft size={28} />
        </button>
      )}

      {dots && (
        <div className="DOTS absolute bottom-4 right-1/2 translate-x-1/2 flex items-center justify-center gap-2 z-[2]">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              variants={dotsVariants}
              initial="initial"
              animate={slideIndex === index ? "active" : ""}
              whileHover={slideIndex !== index ? "hover" : ""}
              transition={{ duration: 0.2 }}
              className="h-2 w-2 bg-white rounded-full"
              onClick={() => changeSlideTo(index)}
            ></motion.button>
          ))}
        </div>
      )}
    </div>
  );
}

// Setting prop types
SingleItemCarousel.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.object).isRequired,
  autoSlide: PropTypes.bool,
  autoSlideInterval: PropTypes.number,
  navigation: PropTypes.bool,
  dots: PropTypes.bool,
};

export default SingleItemCarousel;
