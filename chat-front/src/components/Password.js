import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Password = (props) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="relative">
      <label>
        Password <span className="text-red-500">*</span>
      </label>
      <input
        type={passwordVisible ? "text" : "password"}
        id="password"
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        className="bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full p-1 pr-10"
        required
      />
      <div
        className="absolute inset-y-10 right-0 pr-3 flex items-center cursor-pointer"
        onClick={togglePasswordVisibility}
      >
        {passwordVisible ? (
          <IoMdEye className="text-gray-700 h-5 w-5" />
        ) : (
          <IoMdEyeOff className="text-gray-700 h-5 w-5" />
        )}
      </div>
    </div>
  );
};

export default Password;
