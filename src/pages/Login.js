import React, { useState, useEffect } from "react";
import pic from "../assets/Pic.jpg";
import Password from "../components/Password";
import { Link } from "react-router-dom";
import Input from "../components/InputField";
import CheckBox from "../components/CheckBox";
import Button from "../components/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const emailIsValid = /\S+@\S+\.\S+/.test(email);
    const passwordIsValid = password.length >= 8;

    setIsButtonDisabled(!emailIsValid || !passwordIsValid);

    setEmailError(
      email.length > 0 && !emailIsValid ? "Please enter a valid email." : ""
    );
    setPasswordError(
      password.length > 0 && !passwordIsValid
        ? "Password must be at least 8 characters."
        : ""
    );
  }, [email, password]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
  };

  const handlePasswordBlur = () => {
    setPasswordTouched(true);
  };

  return (
    <div className="login-container flex flex-col md:flex-row h-full min-h-screen">
      <div className="login-image w-full md:w-1/2 h-64 md:h-auto">
        <img className="w-full h-full object-cover" src={pic} alt="Pic" />
      </div>
      <div className="form-container w-full md:w-1/2 flex justify-center items-center p-8">
        <div className="flex flex-col gap-y-5 max-w-md">
          <div className="flex flex-col items-center justify-center gap-y-3">
            <h2 className="font-bold text-3xl text-center">
              Log in to your account
            </h2>
            <p className="text-base text-center">
              Hello again! Log in and get productive.
            </p>
          </div>
          <form>
            <div className="text-left flex flex-col gap-y-5">
              <Input
                name="Email"
                id="email"
                value={email}
                type="email"
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
              />
              {emailTouched && emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}

              <Password
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
              />
              {passwordTouched && passwordError && (
                <p className="text-red-500 text-sm">{passwordError}</p>
              )}

              <CheckBox id="remember" label="Remember me" />
              <div className="w-full flex justify-center">
                <Button label="Login" disabled={isButtonDisabled} />
              </div>
            </div>
          </form>
          <div className="flex flex-col md:flex-row justify-between w-full mt-5">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Register
              </Link>
            </p>
            <p>
              <a href="/" className="text-blue-500 hover:underline">
                Forget Password?
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
