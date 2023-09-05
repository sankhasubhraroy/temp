import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Auth() {
  const history = useNavigate();
  return (
    <motion.section
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="h-80 w-60 bg-white absolute top-1/3 left-1/2"
    >
      <h1 className="my-4 p-4 text-center text-lg font-bold">Login</h1>
      <p className="p-4">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid,
        saepe!
      </p>
      <button
        className="p-2 mx-auto my-6 block bg-slate-900 text-white"
        onClick={() => history(-1)}
      >
        Close
      </button>
    </motion.section>
  );
}

export default Auth;
