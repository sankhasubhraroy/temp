import React from "react";
import { motion } from "framer-motion";

function Auth() {
  return (
    <motion.div initial={{ x: 1000 }} animate={{ x: 0 }} exit={{ x: -1000 }}>
      This is Authentication Page
    </motion.div>
  );
}

export default Auth;
