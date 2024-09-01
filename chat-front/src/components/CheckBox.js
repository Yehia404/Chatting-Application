import React from "react";

const CheckBox = (props) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id={props.id}
        className="h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
      />
      <label className="text-gray-700">{props.label}</label>
    </div>
  );
};

export default CheckBox;
