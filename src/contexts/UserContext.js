import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([
    {
      firstname: "Yehia",
      lastname: "Sakr",
      email: "y@gmail.com",
      username: "Yehia Sakr",
      password: "12345678",
    },
    {
      firstname: "Ahmed",
      lastname: "Amr",
      email: "a@gmail.com",
      username: "Ahmed Amr",
      password: "12345678",
    },
  ]);

  const [loggedInUser, setLoggedInUser] = useState(users[0]); // Default user

  const addUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const loginUser = (email, password) => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      setLoggedInUser(user);
      return user;
    }
    return null;
  };

  const logoutUser = () => {
    setLoggedInUser(null);
  };

  return (
    <UserContext.Provider
      value={{ users, addUser, loggedInUser, loginUser, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
