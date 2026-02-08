import React from "react";
import { LuListTodo } from "react-icons/lu";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-around bg-slate-700 text-white py-2">
      {/* Logo */}
      <div className="logo">
        <span className="flex items-center font-bold text-xl mx-9">
          iTask
          <LuListTodo className="ml-1" />
        </span>
      </div>

      {/* Links */}
      <ul className=" flex gap-8 mx-9 items-center">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "font-bold no-underline border-white"
                : "hover:font-bold no-underline"
            }
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              isActive
                ? "font-bold border-white no-underline"
                : "hover:font-bold no-underline"
            }
          >
            Your Tasks
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-white no-underline"
                : "text-white hover:font-bold no-underline"
            }
          >
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
