import { useState, useEffect } from "react";

export const useNameValidation = (initialValue) => {
  const [name, setName] = useState(initialValue);
  const [nameError, setNameError] = useState("");
  const [nameTouched, setNameTouched] = useState(false);

  useEffect(() => {
    const nameIsValid = name.length >= 2;
    setNameError(
      name.length > 0 && !nameIsValid
        ? "Name must be at least 2 characters."
        : ""
    );
  }, [name]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleNameBlur = () => setNameTouched(true);

  return {
    name,
    nameError,
    nameTouched,
    handleNameChange,
    handleNameBlur,
  };
};
