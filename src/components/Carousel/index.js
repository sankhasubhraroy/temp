import React, { useEffect, useState } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

function Carousel({
  slides,
  autoSlide = true,
  customSlide = true,
  slideMarker = true,
  autoSlideInterval = 3000,
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((currentSlide) =>
      currentSlide === slides.length - 1 ? 0 : currentSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide) =>
      currentSlide === 0 ? slides.length - 1 : currentSlide - 1
    );
  };

  useEffect(() => {
    if (!autoSlide) return;

    const interval = setInterval(() => {
      nextSlide();
    }, autoSlideInterval);

    return () => clearInterval(interval);
  });

  const containerStyle = {
    display: "flex",
    height: "100%",
    width: `${slides.length * 100}%`,
    transform: `translateX(-${(currentSlide * 100) / slides.length}%)`,
    transition: "transform 0.5s ease-in-out",
  };

  const slideStyle = (index) => ({
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${slides[index].url})`,
  });

  return (
    <div className="w-full h-full overflow-hidden relative">
      <div className="SLIDE-CONTAINER" style={containerStyle}>
        {slides.map((_, index) => (
          <div
            key={index}
            style={slideStyle(index)}
            className={`${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } transition-opacity duration-1000 ease-in`}
          ></div>
        ))}
      </div>

      {customSlide && (
        <div className="BUTTON-CONTAINER absolute inset-0 flex items-center justify-between p-4">
          <button
            className="PREVIOUS p-1 rounded-full bg-secondary-light bg-opacity-50 hover:bg-opacity-80 transition duration-300 ease-in"
            onClick={prevSlide}
          >
            <FiChevronLeft size={28} />
          </button>

          <button
            className="NEXT p-1 rounded-full bg-secondary-light bg-opacity-50 hover:bg-opacity-80 transition duration-300 ease-in"
            onClick={nextSlide}
          >
            <FiChevronRight size={28} />
          </button>
        </div>
      )}

      {slideMarker && (
        <div className="SLIDE-MARKERS absolute bottom-4 right-0 left-0">
          <div className="flex items-center justify-center  gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`${
                  index === currentSlide
                    ? "p-[6px] transition-none"
                    : "bg-opacity-50 hover:bg-opacity-80"
                } w-2 h-2 bg-white rounded-full transition duration-500 ease-in`}
                onClick={() => setCurrentSlide(index)}
              ></button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Carousel;
