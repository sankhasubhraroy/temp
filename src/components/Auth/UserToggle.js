import { motion } from "framer-motion";

// Array of userType
const users = ["freelancer", "consumer"];

function UserToggle({ userType, setUserType }) {
  return (
    <div className="h-10 select-none cursor-pointer border-b-2 border-primary-dark">
      <ul className="h-full flex">
        {users.map((item) => (
          <li
            key={item}
            className={`relative h-full w-1/2 flex justify-center items-center font-basic text-black capitalize ${
              item !== userType && "text-opacity-40"
            }`}
            onClick={() => setUserType(item)}
          >
            {item}
            {item === userType && (
              <motion.div
                layoutId="selected"
                className="h-full w-[90%] absolute bg-violet-400 bg-opacity-30 border-t-2 border-r-2 border-l-2 border-primary-dark rounded-t-md"
              ></motion.div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserToggle;
