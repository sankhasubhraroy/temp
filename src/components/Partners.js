import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  SiDell,
  SiIbm,
  SiAdidas,
  SiBbc,
  SiGeeksforgeeks,
  SiRiotgames,
} from "react-icons/si";
import { motion, useScroll, useTransform } from "framer-motion";

function Partners({ iconSize = 48, iconColor = "#333" }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const [x, setX] = useState(0);

  // Calculating the width difference between container and tracker
  useEffect(() => {
    if (!containerRef.current.offsetWidth && !trackRef.current.offsetWidth)
      return;

    const calcX = () => {
      if (containerRef.current.offsetWidth >= trackRef.current.offsetWidth) {
        setX(0);
      } else {
        setX(trackRef.current.offsetWidth - containerRef.current.offsetWidth);
      }
    };

    // Initially running the function
    calcX();
    // Run everytime window get resized
    window.addEventListener("resize", calcX);

    // Removing the event upon unmounting
    return () => window.removeEventListener("resize", calcX);
  }, []);

  const baseX = useTransform(scrollYProgress, [0.3, 0.5], [0, -x]);

  return (
    <section className="PARTNERS-SECTION h-auto flex justify-center gap-1 p-4 max-sm:flex-col">
      <div className="TEXT-BOX flex items-center justify-center px-4">
        <p className="font-alternate text-xl text-gray-500 max-md:text-base">
          Our Partners
        </p>
      </div>

      <div className="VERTICAL-LINE h-auto w-[2px] mx-4 bg-gradient-to-b from-transparent via-black to-transparent max-sm:hidden"></div>

      <div className="HORIZONTAL-LINE h-[2px] w-full my-1 bg-gradient-to-r from-transparent via-black to-transparent sm:hidden"></div>

      <div
        ref={containerRef}
        className="CONTAINER relative w-max overflow-hidden max-md:w-2/3 max-sm:w-full"
      >
        <motion.div
          ref={trackRef}
          style={{ x: baseX }}
          className="TRACK h-full w-max flex justify-center items-center gap-10 px-4 m-auto"
        >
          <SiDell size={iconSize} color={iconColor} />
          <SiIbm size={iconSize} color={iconColor} />
          <SiAdidas size={iconSize} color={iconColor} />
          <SiBbc size={iconSize} color={iconColor} />
          <SiGeeksforgeeks size={iconSize} color={iconColor} />
          <SiRiotgames size={iconSize} color={iconColor} />
        </motion.div>
      </div>
    </section>
  );
}

Partners.propTypes = {
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
};

export default Partners;
