import React from "react";

function Hamburger(props) {
  return (
    <div className="w-[22px] h-[16px] flex flex-col items-center justify-between cursor-pointer md:hidden">
      <div
        className={`child-1 w-full h-[3px] bg-black transition duration-300 ease-in ${
          props.crossed ? "transform -rotate-[45deg] translate-y-[6.5px]" : ""
        }`}
      ></div>

      <div
        className={`child-2 w-full h-[3px] bg-black transition duration-300 ease-in ${
          props.crossed ? "bg-transparent transform rotate-180" : ""
        }`}
      ></div>

      <div
        className={`child-3 w-full h-[3px] bg-black transition duration-300 ease-in ${
          props.crossed ? "transform rotate-[45deg] -translate-y-[6.5px]" : ""
        }`}
      ></div>
    </div>
  );
}

export default Hamburger;
