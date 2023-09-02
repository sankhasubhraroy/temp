import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import BrandLogo from "../../assets/images/brand-logo.png";
import Button from "../Buttons";
import Hamburger from "./Hamburger";
import { navLinks } from "../../utils/constants";
import { motion } from "framer-motion";
import useMediaQuery from "../../hooks/useMediaQuery";

// Variants for mobile navbar
const navVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 60,
    },
  },
  closed: {
    opacity: 0,
    x: "-100%",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

// Variants for mobile navigation menu
const menuVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

// Variants for mobile menu-items
const linkVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

// Framer Motion swipe power
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navRef = useRef(null);
  const isTablet = useMediaQuery("(max-width: 768px)");

  // Closing the mobile navbar when clicked outside of it
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsNavOpen(false);
      }
    };

    if (isNavOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isNavOpen]);

  return (
    <header ref={navRef} className="relative z-[1]">
      <motion.nav
        animate={isNavOpen ? "open" : "closed"}
        className="DESKTOP-NAVBAR flex items-center justify-between bg-secondary-light px-8 max-md:px-4"
      >
        <div className="flex justify-center items-center gap-4">
          {isTablet && <Hamburger toggle={() => setIsNavOpen(!isNavOpen)} />}
          <div className="BRAND-LOGO w-28">
            <a href="/">
              <img src={BrandLogo} alt="WorkWise" />
            </a>
          </div>
        </div>

        <div className="flex justify-center items-center gap-16">
          {!isTablet && (
            <ul className="flex items-center justify-center gap-8 font-basic font-medium text-base text-primary-dark max-lg:text-sm">
              {navLinks.map((link) => (
                <motion.li key={link.title}>
                  <Link to={link.url}>{link.title}</Link>
                </motion.li>
              ))}
            </ul>
          )}

          <Button buttonName="Join" useCase="freelancer-join" />
        </div>
      </motion.nav>

      {isTablet && (
        <motion.nav
          initial={false}
          animate={isNavOpen ? "open" : "closed"}
          variants={navVariants}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={{ left: 1, right: 0 }}
          dragMomentum={false}
          dragTransition={{ delay: -0.5 }}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            const isLeftDirection = offset.x < -45 && velocity.x <= 0;
            if (swipe < -swipeConfidenceThreshold || isLeftDirection) {
              setIsNavOpen(!isNavOpen);
            }
          }}
          className="MOBILE-NAVBAR h-screen w-60 bg-secondary-light p-4 absolute top-0"
        >
          <motion.ul
            variants={menuVariants}
            className="flex flex-col justify-center items-start gap-4 my-12 font-basic font-normal text-base text-primary-dark "
          >
            {navLinks.map((link) => (
              <motion.li
                variants={linkVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                key={link.title}
              >
                <Link to={link.url}>{link.title}</Link>
              </motion.li>
            ))}
          </motion.ul>
        </motion.nav>
      )}
    </header>
  );
}

export default Navbar;
