import React from "react";

const Button = (props) => {
  return (
    <button
      type="submit"
      disabled={props.disabled}
      className={`${
        props.disabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-cyan-500 text-white hover:bg-cyan-600"
      } border-md border-gray-600 rounded px-40 py-1.5 w-full`}
    >
      {props.label}
    </button>
  );
};

export default Button;
