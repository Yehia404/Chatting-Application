import { useState, useEffect } from "react";

export const usePasswordValidation = (initialValue) => {
  const [password, setPassword] = useState(initialValue);
  const [passwordError, setPasswordError] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);

  useEffect(() => {
    const passwordIsValid = password.length >= 8;
    setPasswordError(
      password.length > 0 && !passwordIsValid
        ? "Password must be at least 8 characters."
        : ""
    );
  }, [password]);

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handlePasswordBlur = () => setPasswordTouched(true);

  return {
    password,
    passwordError,
    passwordTouched,
    handlePasswordChange,
    handlePasswordBlur,
  };
};
