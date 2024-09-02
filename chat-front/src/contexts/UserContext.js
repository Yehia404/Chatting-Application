import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
      fetchUserInfo(token).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );
      const { token } = response.data;
      if (token) {
        setAuthToken(token);
        localStorage.setItem("authToken", token);
        await fetchUserInfo(token);
        return token;
      }
      return null;
    } catch (error) {
      console.error("Login failed", error);
      return null;
    }
  };

  const fetchUserInfo = async (token) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/users/getuser",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const user = response.data.user;
      setLoggedInUser(user);
    } catch (error) {
      console.error("Failed to fetch user info", error);
    }
  };

  const logoutUser = () => {
    setLoggedInUser(null);
    setAuthToken(null);
    localStorage.removeItem("authToken");
  };

  return (
    <UserContext.Provider
      value={{ loggedInUser, authToken, loginUser, logoutUser }}
    >
      {loading ? <div>Loading...</div> : children}
    </UserContext.Provider>
  );
};
