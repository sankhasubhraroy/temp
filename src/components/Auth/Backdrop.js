import { motion } from "framer-motion";

function Backdrop({ children, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClick}
      className="fixed h-full w-full inset-0 overflow-auto bg-[#000000e1] flex items-center justify-center z-[2]"
    >
      {children}
    </motion.div>
  );
}

export default Backdrop;
