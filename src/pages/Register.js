import React, { useState, useEffect } from "react";
import pic from "../assets/Pic.jpg";
import Input from "../components/InputField";
import Password from "../components/Password";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useNameValidation } from "../hooks/NameVal";
import { useEmailValidation } from "../hooks/EmailVal";
import { usePasswordValidation } from "../hooks/PassVal";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

const Register = () => {
  const {
    name: firstname,
    nameError: firstnameError,
    nameTouched: firstnameTouched,
    handleNameChange: handleFirstNameChange,
    handleNameBlur: handleFirstNameBlur,
  } = useNameValidation("");

  const {
    name: lastname,
    nameError: lastnameError,
    nameTouched: lastnameTouched,
    handleNameChange: handleLastNameChange,
    handleNameBlur: handleLastNameBlur,
  } = useNameValidation("");

  const {
    email,
    emailError,
    emailTouched,
    handleEmailChange,
    handleEmailBlur,
  } = useEmailValidation("");

  const {
    name: username,
    nameError: usernameError,
    nameTouched: usernameTouched,
    handleNameChange: handleUsernameChange,
    handleNameBlur: handleUsernameBlur,
  } = useNameValidation("");

  const {
    password,
    passwordError,
    passwordTouched,
    handlePasswordChange,
    handlePasswordBlur,
  } = usePasswordValidation("");

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const firstnameIsEmpty = firstname.trim() === "";
    const lastnameIsEmpty = lastname.trim() === "";
    const emailIsEmpty = email.trim() === "";
    const usernameIsEmpty = username.trim() === "";
    const passwordIsEmpty = password.trim() === "";

    const firstnameIsValid = !firstnameError && !firstnameIsEmpty;
    const lastnameIsValid = !lastnameError && !lastnameIsEmpty;
    const emailIsValid = !emailError && !emailIsEmpty;
    const usernameIsValid = !usernameError && !usernameIsEmpty;
    const passwordIsValid = !passwordError && !passwordIsEmpty;

    setIsButtonDisabled(
      firstnameIsEmpty ||
        lastnameIsEmpty ||
        emailIsEmpty ||
        usernameIsEmpty ||
        passwordIsEmpty ||
        !firstnameIsValid ||
        !lastnameIsValid ||
        !emailIsValid ||
        !usernameIsValid ||
        !passwordIsValid
    );
  }, [
    firstname,
    lastname,
    email,
    username,
    password,
    firstnameError,
    lastnameError,
    emailError,
    usernameError,
    passwordError,
  ]);

  const { addUser } = useUserContext();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const newUser = {
      firstname,
      lastname,
      email,
      username,
      password,
    };

    addUser(newUser);
    navigate("/login");
  };

  return (
    <div className="login-container flex flex-col md:flex-row h-full min-h-screen">
      <div className="login-image w-full md:w-1/2 h-64 md:h-auto">
        <img className="w-full h-full object-cover" src={pic} alt="Pic" />
      </div>
      <div className="form-container w-full md:w-1/2 flex justify-center items-center p-8">
        <div className="flex flex-col gap-y-5 max-w-md">
          <div className="flex flex-col items-center justify-center gap-y-3">
            <h2 className="font-bold text-3xl text-center">Create Account</h2>
            <p className="text-base text-center">
              Sign up now to claim your free space.
            </p>
          </div>
          <form
            className="flex flex-col items-center w-full"
            onSubmit={handleRegister}
          >
            <div className="text-left flex flex-col gap-y-5 w-full">
              <div className="flex flex-col md:flex-row justify-between gap-5">
                <div className="relative w-full">
                  <Input
                    name="First Name"
                    id="firstname"
                    value={firstname}
                    onChange={handleFirstNameChange}
                    onBlur={handleFirstNameBlur}
                  />
                  {firstnameTouched && firstnameError && (
                    <p className="text-red-500 text-sm mt-1">
                      {firstnameError}
                    </p>
                  )}
                </div>
                <div className="relative w-full">
                  <Input
                    name="Last Name"
                    id="lastname"
                    value={lastname}
                    onChange={handleLastNameChange}
                    onBlur={handleLastNameBlur}
                  />
                  {lastnameTouched && lastnameError && (
                    <p className="text-red-500 text-sm mt-1">{lastnameError}</p>
                  )}
                </div>
              </div>
              <div className="relative">
                <Input
                  name="Email"
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                />
                {emailTouched && emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}
              </div>
              <div className="relative">
                <Input
                  name="Username"
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                  onBlur={handleUsernameBlur}
                />
                {usernameTouched && usernameError && (
                  <p className="text-red-500 text-sm mt-1">{usernameError}</p>
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
              <div className="w-full flex justify-center">
                <Button label="Sign Up" disabled={isButtonDisabled} />
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
