import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pic from "../assets/Pic.jpg";
import Password from "../components/Password";
import { Link } from "react-router-dom";
import Input from "../components/InputField";
import CheckBox from "../components/CheckBox";
import Button from "../components/Button";
import { useEmailValidation } from "../hooks/EmailVal";
import { usePasswordValidation } from "../hooks/PassVal";

const users = [
  { email: "y@gmail.com", password: "12345678", username: "Yehia Sakr" },
  { email: "a@gmail.com", password: "12345678", username: "Ahmed Amr" },
];

const Login = () => {
  const {
    email,
    emailError,
    emailTouched,
    handleEmailChange,
    handleEmailBlur,
  } = useEmailValidation("");
  const {
    password,
    passwordError,
    passwordTouched,
    handlePasswordChange,
    handlePasswordBlur,
  } = usePasswordValidation("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const emailIsEmpty = email.trim() === "";
    const passwordIsEmpty = password.trim() === "";
    const emailIsValid = !emailError && !emailIsEmpty;
    const passwordIsValid = !passwordError && !passwordIsEmpty;

    setIsButtonDisabled(
      emailIsEmpty || passwordIsEmpty || !emailIsValid || !passwordIsValid
    );
  }, [email, password, emailError, passwordError]);

  const handleLogin = (e) => {
    e.preventDefault();
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if (foundUser) {
      navigate("/chat", { state: { username: foundUser.username } });
    } else {
      alert("Invalid credentials");
    }
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
          <form onSubmit={handleLogin}>
            <div className="text-left flex flex-col gap-y-5">
              <div className="relative">
                <Input
                  name="Email"
                  id="email"
                  value={email}
                  type="email"
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                />
                {emailTouched && emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}
              </div>
              <div className="relative">
                <Password
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                />
                {passwordTouched && passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}
              </div>
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
