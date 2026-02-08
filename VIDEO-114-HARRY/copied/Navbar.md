import React from "react";
import { LuListTodo } from "react-icons/lu";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-around bg-slate-700 text-white py-2">
      <div className="logo ">
        <span className=" flex items-center font-bold text-xl mx-9">
          iTask
          <LuListTodo className="ml-1" />
        </span>
      </div>
      <ul className="flex gap-8 mx-9">
        <li className="items-center cursor-pointer hover:font-bold">Home</li>
        <li className="cursor-pointer hover:font-bold ">Your Tasks</li>
        <li className="cursor-pointer hover:font-bold ">About</li>
      </ul>
    </nav>
  );
};

export default Navbar;
