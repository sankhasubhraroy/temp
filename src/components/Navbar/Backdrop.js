import { motion } from "framer-motion";

// Variants for backdrop
const backdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.5 } },
};

function Backdrop({ onClick }) {
  return (
    <motion.div
      variants={backdropVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onClick={onClick}
      className="absolute h-screen w-full bg-[#000000e1] top-0 left-0"
    ></motion.div>
  );
}

export default Backdrop;
