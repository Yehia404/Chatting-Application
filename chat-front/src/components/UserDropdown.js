import React from "react";
import { Dropdown, Menu } from "antd";
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut, IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

const UserDropdown = (props) => {
  const { logoutUser } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser();
    navigate("/login");
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <button onClick={handleLogout} className=" text-red-500">
          <IoMdLogOut className="mr-2" />
          Logout
        </button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["hover"]}>
      <div className="flex items-center cursor-pointer">
        <CgProfile className="w-7 h-7" />
        <span className="p-1 text-lg">{props.username}</span>
        <IoMdArrowDropdown />
      </div>
    </Dropdown>
  );
};

export default UserDropdown;
