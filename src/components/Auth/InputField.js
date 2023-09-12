import { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// Variants for Input Fields
const inputVariants = {
  hidden: {
    opacity: 0,
    x: 100,
    transition: {
      ease: "easeOut",
      duration: 0.15,
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      ease: "easeOut",
      duration: 0.15,
    },
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: {
      ease: "easeIn",
      duration: 0.15,
    },
  },
};

// Variants for labels
const labelVariants = {
  rest: {
    opacity: 0.4,
    top: 30,
    left: 40,
    fontSize: "16px",
  },
  active: {
    opacity: 1,
    top: 5,
    left: 0,
    fontSize: "12px",
  },
};

// Variants for underline
const underlineVariants = {
  rest: {
    width: "0%",
  },
  active: {
    width: "100%",
  },
};

function InputField({ label, type, name, icon }) {
  const id = label?.replace(" ", "-");
  const [inputValue, setInputValue] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Function to update the input value after each key stroke
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  // Function to make animation active when input is focused
  const handleFocus = () => {
    setIsActive(true);
  };

  // Function to make animations inactive when input is out of focus and empty
  const handleBlur = () => {
    if (inputValue === "") {
      setIsActive(false);
    }
  };

  // Function to toggle the password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <motion.div
      variants={inputVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative flex flex-col pt-6"
    >
      <motion.label
        htmlFor={id}
        initial={false}
        animate={isActive ? "active" : "rest"}
        variants={labelVariants}
        className="absolute capitalize font-basic"
      >
        {label}
      </motion.label>

      <motion.input
        type={showPassword ? "text" : type}
        id={id}
        name={name}
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="h-10 px-10 outline-none bg-transparent"
      />

      {type === "password" && (
        <div
          onClick={togglePasswordVisibility}
          className="PASSWORD-TOGGLE absolute top-9 right-3 cursor-pointer"
        >
          {!showPassword && <AiOutlineEyeInvisible />}
          {showPassword && <AiOutlineEye />}
        </div>
      )}

      <div
        className={`ICON absolute top-9 left-3 transition-colors duration-300 ease-in-out ${
          isActive && "text-violet-500"
        }`}
      >
        {icon}
      </div>

      <div className="DEFAULT-UNDERLINE absolute bottom-0 h-[1px] w-full bg-black bg-opacity-30"></div>

      <motion.div
        initial={false}
        animate={isActive ? "active" : "rest"}
        variants={underlineVariants}
        className="ANIMATED-UNDERLINE absolute bottom-0 h-[1px] bg-violet-500"
      ></motion.div>
    </motion.div>
  );
}

export default InputField;
