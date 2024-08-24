import React from "react";

const Input = (props) => {
  return (
    <div>
      <label>
        {props.name} <span className="text-red-500">*</span>
      </label>
      <input
        id={`${props.id}`}
        type={props.type}
        className="bg-gray-50 border border-gray-15 focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
        required
      />
    </div>
  );
};

export default Input;
