import { useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import BrandLogo from "../../assets/images/brand-logo.png";
import Hamburger from "./Hamburger";
import { navLinks } from "../../utils/constants";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import useMediaQuery from "../../hooks/useMediaQuery";
import Backdrop from "./Backdrop";
import Auth from "../Auth";

// Variants for mobile navbar
const sidebarVariants = {
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
  const { scrollYProgress } = useScroll();
  const [scrollY, setScrollY] = useState(0);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // changing the scrollY value as per page scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollY(latest);
  });

  // Preventing scroll when the modal is open
  const openAuth = () => {
    setIsAuthOpen(true);
    document.body.style.overflow = "hidden";
  };

  // Enabling Scroll whren the modal is closed
  const closeAuth = () => {
    setIsAuthOpen(false);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      <header
        ref={navRef}
        className={`w-full z-[1] ${
          isTablet || scrollY > 0.1 ? "fixed" : "absolute"
        }`}
      >
        <motion.nav
          animate={isNavOpen ? "open" : "closed"}
          className={`DESKTOP-NAVBAR flex items-center justify-between px-8 max-md:px-4 transition duration-300 ease-in-out ${
            isTablet || scrollY > 0.1 ? "bg-white" : "bg-transparent"
          }`}
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
              <ul
                className={`flex items-center justify-center gap-8 font-basic font-medium text-base max-lg:text-sm transition duration-300 ease-in-out ${
                  scrollY > 0.1 ? "text-black" : "text-white"
                }`}
              >
                {navLinks.map((link) => (
                  <motion.li key={link.title}>
                    <Link to={link.url}>{link.title}</Link>
                  </motion.li>
                ))}
              </ul>
            )}

            <button
              onClick={openAuth}
              className={`font-basic font-medium text-base text-secondary-light px-4 py-2 rounded-md max-lg:text-sm max-sm:text-xs max-sm:max-w-[80px] max-sm:px-2 max-sm:py-1 ${
                isTablet || scrollY > 0.1
                  ? "bg-primary-dark"
                  : "bg-transparent border-2 border-white"
              }`}
            >
              Join
            </button>
          </div>
        </motion.nav>

        <AnimatePresence>
          {isNavOpen && <Backdrop onClick={() => setIsNavOpen(!isNavOpen)} />}
        </AnimatePresence>

        {isTablet && (
          <motion.nav
            initial={false}
            animate={isNavOpen ? "open" : "closed"}
            variants={sidebarVariants}
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
            className="MOBILE-NAVBAR h-screen w-60 bg-white p-4 absolute top-0"
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

      <AnimatePresence initial={false}>
        {isAuthOpen && <Auth handleClose={closeAuth} />}
      </AnimatePresence>

      <Outlet />
    </>
  );
}

export default Navbar;
