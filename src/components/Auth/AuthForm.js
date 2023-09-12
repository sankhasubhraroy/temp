import { useState } from "react";
import { FaEnvelope, FaLock, FaPhone, FaUser } from "react-icons/fa6";
import { motion } from "framer-motion";
import InputField from "./InputField";
import { AnimatePresence } from "framer-motion";

function AuthForm({ userType }) {
  const [formType, setFormType] = useState("login");

  return (
    <form className="select-none">
      <h1 className="capitalize text-center font-basic font-bold text-xl mt-4">
        {userType + " " + formType}
      </h1>

      <div className="INPUT-FIELDS">
        <AnimatePresence>
          {formType === "signup" && (
            <InputField
              label="full name"
              type="text"
              name="name"
              icon={<FaUser />}
            />
          )}
        </AnimatePresence>

        <InputField
          label="email id"
          type="email"
          name="email"
          icon={<FaEnvelope />}
        />

        <AnimatePresence>
          {formType === "signup" && (
            <InputField
              label="phone no"
              type="tel"
              name="phone"
              icon={<FaPhone />}
            />
          )}
        </AnimatePresence>

        <InputField
          label="password"
          type="password"
          name="password"
          icon={<FaLock />}
        />

        <AnimatePresence>
          {formType === "signup" && (
            <InputField
              label="confirm password"
              type="password"
              name="confirmPassword"
              icon={<FaLock />}
            />
          )}
        </AnimatePresence>
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`py-2 px-8 m-auto my-4 block rounded-md font-basic font-bold capitalize bg-opacity-30 transition-colors duration-500 ease-in ${
          formType === "login" ? "bg-pink-500" : "bg-violet-500"
        }`}
      >
        {formType}
      </motion.button>

      {formType === "login" && (
        <p className="font-basic text-sm my-4">
          Don't have an account,{" "}
          <span
            onClick={() => setFormType("signup")}
            className="text-blue-500 underline cursor-pointer font-alternate"
          >
            Signup here
          </span>
        </p>
      )}

      {formType === "signup" && (
        <p className="font-basic text-sm my-4">
          Already have an account,{" "}
          <span
            onClick={() => setFormType("login")}
            className="text-blue-500 underline cursor-pointer font-alternate"
          >
            Login here
          </span>
        </p>
      )}
    </form>
  );
}

export default AuthForm;
