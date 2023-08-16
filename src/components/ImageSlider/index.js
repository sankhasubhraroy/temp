import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { wrap } from "popmotion";

const variants = {
  enter: (direction) => {
    return { x: direction > 0 ? "100%" : "-100%", opacity: 0 };
  },
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (direction) => {
    return { zIndex: 0, x: direction < 0 ? "100%" : "-100%", opacity: 0 };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

function ImageSlider({
  slides,
  autoSlide = true,
  manualSlide = true,
  slideMarkers = true,
  autoSlideInterval = 5000,
}) {
  const [[currentSlide, direction], setCurrentSlide] = useState([0, 0]);
  const slideIndex = wrap(0, slides.length, currentSlide);

  const changeSlide = useCallback(
    (newDirection) => {
      setCurrentSlide([currentSlide + newDirection, newDirection]);
    },
    [currentSlide]
  );

  const changeSlideTo = (index) => {
    if (index === slideIndex) return;
    setCurrentSlide([index, index > slideIndex ? 1 : -1]);
  };

  useEffect(() => {
    if (autoSlide) {
      const interval = setInterval(() => {
        changeSlide(1);
      }, autoSlideInterval);

      return () => clearInterval(interval);
    }
  }, [changeSlide, autoSlide, autoSlideInterval]);

  return (
    <div className="SLIDER-CONTAINER h-full w-full overflow-hidden relative">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={currentSlide}
          src={slides[slideIndex].url}
          alt={slides[slideIndex].title}
          custom={direction}
          variants={variants}
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
          className="absolute w-full h-full object-cover object-center"
        />
      </AnimatePresence>

      <button
        className="NEXT-BUTTON absolute top-1/2 right-4 -translate-y-1/2 p-1 rounded-full bg-secondary-light bg-opacity-50 z-[2] hover:bg-opacity-80 transition duration-300 ease-in"
        onClick={() => changeSlide(1)}
      >
        <FiChevronRight size={28} />
      </button>

      <button
        className="PREVIOUS-BUTTON absolute top-1/2 left-4 -translate-y-1/2 p-1 rounded-full bg-secondary-light bg-opacity-50 z-[2] hover:bg-opacity-80 transition duration-300 ease-in"
        onClick={() => changeSlide(-1)}
      >
        <FiChevronLeft size={28} />
      </button>

      <div className="SLIDE-MARKERS absolute bottom-4 right-1/2 translate-x-1/2 flex items-center justify-center gap-2 z-[2]">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${
              index === slideIndex
                ? "p-[6px] transition-none"
                : "bg-opacity-50 hover:bg-opacity-80"
            } w-2 h-2 bg-white rounded-full transition duration-500 ease-in`}
            onClick={() => changeSlideTo(index)}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;
