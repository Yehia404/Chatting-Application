import { useState, useEffect } from "react";

export const useEmailValidation = (initialValue) => {
  const [email, setEmail] = useState(initialValue);
  const [emailError, setEmailError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  useEffect(() => {
    const emailIsValid = /\S+@\S+\.\S+/.test(email);
    setEmailError(
      email.length > 0 && !emailIsValid ? "Please enter a valid email." : ""
    );
  }, [email]);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleEmailBlur = () => setEmailTouched(true);

  return {
    email,
    emailError,
    emailTouched,
    handleEmailChange,
    handleEmailBlur,
  };
};
