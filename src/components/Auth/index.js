import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import { IoClose } from "react-icons/io5";
import UserToggle from "./UserToggle";
import { useState } from "react";
import AuthForm from "./AuthForm";
import GoogleAuth from "./GoogleAuth";

const modalVariants = {
  hidden: { opacity: 0, scale: 0.75 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      ease: "easeOut",
      duration: 0.15,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.75,
    transition: {
      ease: "easeIn",
      duration: 0.15,
    },
  },
};

function Auth({ handleClose }) {
  const [userType, setUserType] = useState("freelancer");

  return createPortal(
    <Backdrop onClick={handleClose}>
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="AUTH-MODAL relative h-[700px] w-[500px] bg-slate-100 p-10 sm:rounded-md max-sm:h-full max-sm:w-full"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClose}
          className="CLOSE-BTN absolute top-4 right-4 bg-black bg-opacity-10 rounded-full p-1"
        >
          <IoClose size={18} />
        </motion.button>

        <UserToggle userType={userType} setUserType={setUserType} />

        <AuthForm userType={userType} />

        <GoogleAuth />
      </motion.div>
    </Backdrop>,
    document.getElementById("auth")
  );
}

export default Auth;
