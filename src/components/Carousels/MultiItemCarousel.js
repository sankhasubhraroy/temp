import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { motion, useAnimation } from "framer-motion";
import useMediaQuery from "../../hooks/useMediaQuery";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Variants for button animation
const navigationVariants = {
  hover: { scale: 1.1 },
  tap: { scale: 0.9 },
  disable: { opacity: 0.5 },
};

const dotsVariants = {
  initial: { opacity: 0.6 },
  active: {
    width: 70,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  hover: { opacity: 0.9 },
};

// Swipe action declaration
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

function MultiItemCarousel({ slides, navigation = true, dots = true }) {
  const containerRef = React.useRef(null);
  const carouselRef = React.useRef(null);
  const controls = useAnimation();

  // State for current slide and direction
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideIndex =
    ((currentSlide % slides.length) + slides.length) % slides.length;

  // Function to switch slides on swipe
  const swipeSlide = (newDirection) => {
    setCurrentSlide((prevSlide) => prevSlide + newDirection);
  };

  // Function to calculate x position of carousel
  const calcX = (index) => {
    if (!carouselRef.current) return 0;

    const slideWidth = carouselRef.current.offsetWidth / slides.length;
    return index * slideWidth;
  };

  // Function to update state after dragging
  const handleDragEnd = (e, { offset, velocity, point }) => {
    if (!carouselRef.current || !containerRef.current) return;

    const swipe = swipePower(offset.x, velocity.x);
    const isRightDirection = offset.x > 45 && velocity.x >= 0;
    const isPointOkay = point.x !== 0 && point.y !== 0;
    const isLeftDirection = offset.x < -45 && velocity.x <= 0 && isPointOkay;

    const slideW = carouselRef.current.offsetWidth / slides.length;
    const carouselDiments = carouselRef.current.getBoundingClientRect();
    const containerDiments = containerRef.current.getBoundingClientRect();

    const isPassedBoundaries =
      containerDiments.right > carouselDiments.right - slideW;

    let newSlideIndex = slideIndex;
    let swipeSlideBy = Math.ceil(-offset.x / slideW);

    if (swipe > swipeConfidenceThreshold || isRightDirection) {
      swipeSlideBy = swipeSlideBy - 1;

      newSlideIndex = slideIndex > 0 ? slideIndex + swipeSlideBy : slideIndex;
      if (newSlideIndex < 0) newSlideIndex = 0;

      const indexDiff = newSlideIndex - slideIndex;
      if (indexDiff < 0) {
        swipeSlideBy = indexDiff;
      }

      if (slideIndex > newSlideIndex) {
        swipeSlide(swipeSlideBy);
      }
    } else if (swipe > swipeConfidenceThreshold || isLeftDirection) {
      const lastIndex = slides.length - 1;

      newSlideIndex =
        slideIndex < lastIndex ? slideIndex + swipeSlideBy : slideIndex;
      if (newSlideIndex > lastIndex) newSlideIndex = lastIndex;
      if (isPassedBoundaries) {
        const childrenOnScreen = Math.floor(
          containerRef.current.offsetWidth / slideW
        );
        newSlideIndex = slides.length - childrenOnScreen;
      }

      const indexDiff = newSlideIndex - slideIndex;
      if (swipeSlideBy > indexDiff) {
        swipeSlideBy = indexDiff;
      }

      if (slideIndex < newSlideIndex) {
        swipeSlide(swipeSlideBy);
      }
    }

    // if carousel has passed the boundaries of a container
    if (isPassedBoundaries && slideIndex <= newSlideIndex) {
      const rightEdge =
        -carouselRef.current.offsetWidth + containerRef.current.offsetWidth;

      controls.start({ x: rightEdge });
    } else {
      controls.start({ x: -calcX(newSlideIndex) });
    }
  };

  // State for number of slides to show
  const [slidesToShow, setSlidesToShow] = useState(0);

  // Function to switch slides on button click
  const switchSlideForwards = () => {
    if (slideIndex >= slides.length - slidesToShow) return;
    setCurrentSlide((prevSlide) => prevSlide + 1);
    controls.start({ x: -calcX(slideIndex + 1) });
  };

  const switchSlideBackwards = () => {
    if (slideIndex <= 0) return;
    setCurrentSlide((prevSlide) => prevSlide - 1);
    controls.start({ x: -calcX(slideIndex - 1) });
  };

  const switchSlideTo = (index) => {
    setCurrentSlide(index);
    controls.start({ x: -calcX(index) });
  };

  // Variables for different screen sizes
  const isExtraLargeScreen = useMediaQuery("(min-width: 1280px)");
  const isLargeScreen = useMediaQuery("(max-width: 1280px)");
  const isDesktop = useMediaQuery("(max-width: 1024px)");
  const isTablet = useMediaQuery("(max-width: 768px)");
  const isMobile = useMediaQuery("(max-width: 640px)");

  // Set number of slides to show depending on screen size on mount
  useEffect(() => {
    if (isExtraLargeScreen) setSlidesToShow(5);
    if (isLargeScreen) setSlidesToShow(4);
    if (isDesktop) setSlidesToShow(3);
    if (isTablet) setSlidesToShow(2);
    if (isMobile) setSlidesToShow(1);
  }, [isExtraLargeScreen, isLargeScreen, isDesktop, isTablet, isMobile]);

  // Styles for carousel and slides
  const carouselStyle = {
    width: `${slides.length * (100 / slidesToShow)}%`,
  };

  const slideStyle = {
    width: `${100 / slidesToShow}%`,
  };

  return (
    <div className="h-full w-full relative">
      <div
        ref={containerRef}
        className="CONTAINER h-[90%] w-[90%] m-auto overflow-hidden"
      >
        <motion.div
          ref={carouselRef}
          animate={controls}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 300,
          }}
          drag="x"
          onDragEnd={handleDragEnd}
          dragConstraints={{ top: 0 }}
          dragElastic={1}
          style={carouselStyle}
          className="CAROUSEL h-full flex"
        >
          {slides.map((_, index) => (
            <div
              key={index}
              style={slideStyle}
              className="SLIDE h-full flex justify-center items-center"
            >
              <div className="flex justify-center items-center text-2xl h-full w-[90%] bg-purple-500">
                {index}
              </div>
            </div>
          ))}
        </motion.div>

        {navigation && (
          <motion.button
            variants={navigationVariants}
            animate={
              slideIndex === slides.length - slidesToShow ? "disable" : ""
            }
            whileHover={
              slideIndex < slides.length - slidesToShow ? "hover" : ""
            }
            whileTap={slideIndex < slides.length - slidesToShow ? "tap" : ""}
            className="NAVIGATION-NEXT absolute top-[40%] right-[4.5%] p-1 rounded-full bg-slate-400 z-[2]"
            onClick={() => switchSlideForwards()}
          >
            <FiChevronRight size={28} />
          </motion.button>
        )}

        {navigation && (
          <motion.button
            variants={navigationVariants}
            animate={slideIndex === 0 ? "disable" : ""}
            whileHover={slideIndex > 0 ? "hover" : ""}
            whileTap={slideIndex > 0 ? "tap" : ""}
            className="NAVIGATION-PREVIOUS absolute top-[40%] left-[4.5%] p-1 rounded-full bg-slate-400 z-[2]"
            onClick={() => switchSlideBackwards()}
          >
            <FiChevronLeft size={28} />
          </motion.button>
        )}

        {dots && (
          <div className="DOTS absolute bottom-2 right-1/2 translate-x-1/2 flex justify-center items-center gap-2 z-[2]">
            {Array.from({ length: slides.length - slidesToShow + 1 }).map(
              (_, index) => (
                <motion.button
                  key={index}
                  variants={dotsVariants}
                  initial="initial"
                  animate={slideIndex === index ? "active" : ""}
                  whileHover={slideIndex !== index ? "hover" : ""}
                  transition={{ duration: 0.2 }}
                  className="h-3 w-3 bg-slate-500 rounded-full"
                  onClick={() => switchSlideTo(index)}
                ></motion.button>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

MultiItemCarousel.propTypes = {
  slides: PropTypes.array.isRequired,
  navigation: PropTypes.bool,
  dots: PropTypes.bool,
};

export default MultiItemCarousel;
