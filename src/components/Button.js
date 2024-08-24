import React from "react";

const Button = (props) => {
  return (
    <button
      type="submit"
      className="bg-cyan-500 border-md border-gray-600 text-white rounded px-40 py-1.5 hover:bg-cyan-600 hover:text-white w-full"
    >
      {props.label}
    </button>
  );
};

export default Button;
