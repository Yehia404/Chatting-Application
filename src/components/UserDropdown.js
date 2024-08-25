import React from "react";
import { Dropdown, Menu } from "antd";
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut, IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";

const UserDropdown = () => {
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/login">
          <IoMdLogOut className="mr-2" />
          Logout
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["hover"]}>
      <div className="flex items-center cursor-pointer">
        <CgProfile className="w-7 h-7" />
        <span className="p-1 text-lg">Ahmed Amr</span>
        <IoMdArrowDropdown />
      </div>
    </Dropdown>
  );
};

export default UserDropdown;
