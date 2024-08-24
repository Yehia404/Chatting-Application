import React from "react";
import pic from "../assets/Pic.jpg";
import Input from "../components/InputField";
import Password from "../components/Password";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const Register = () => {
  return (
    <div className="login-container flex flex-col md:flex-row h-full min-h-screen">
      <div className="login-image w-full md:w-1/2 h-64 md:h-auto">
        <img className="w-full h-full object-cover" src={pic} alt="Pic" />
      </div>
      <div className="form-container w-full md:w-1/2 flex justify-center items-center p-8">
        <div className="flex flex-col gap-y-5  max-w-md">
          <div className="flex flex-col items-center justify-center gap-y-3">
            <h2 className="font-bold text-3xl text-center">Create Account</h2>
            <p className="text-base text-center">
              Sign up now to claim your free space.
            </p>
          </div>
          <form className="flex flex-col items-center w-full">
            <div className="text-left flex flex-col gap-y-5 w-full">
              <div className="flex flex-col md:flex-row justify-between gap-5">
                <Input name="First Name" />
                <Input name="Last Name" />
              </div>
              <Input name="Email" id="email" type="email" />
              <Input name="Username" id="username" />
              <Password />
              <div className="w-full flex justify-center">
                <Button label="Sign Up" />
              </div>
            </div>
          </form>
          <div className="flex justify-between w-full">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
