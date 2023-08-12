import React from "react";

function Button(props) {
  return (
    <>
      {props.useCase === "consumer-login" && (
        <button className="font-basic font-medium text-base text-primary-dark border-2 border-primary-dark px-4 py-2 rounded-md max-lg:text-sm">
          {props.buttonName}
        </button>
      )}

      {props.useCase === "freelancer-join" && (
        <button className="font-basic font-medium text-base text-secondary-light bg-primary-dark px-4 py-2 rounded-md max-lg:text-sm max-sm:text-xs max-sm:max-w-[80px] max-sm:px-2 max-sm:py-1">
          {props.buttonName}
        </button>
      )}
    </>
  );
}

export default Button;
