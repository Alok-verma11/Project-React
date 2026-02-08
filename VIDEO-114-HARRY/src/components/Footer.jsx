import React from "react";
import { LuListTodo } from "react-icons/lu";
import { FaGithub, FaLinkedin, FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-800 to-slate-700 text-gray-300 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-white text-xl font-bold">
              iTask <LuListTodo />
            </div>
            <p className="mt-3 text-sm max-w-sm">
              iTask helps you organize your daily work, stay productive, and
              never miss an important task.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">Your Tasks</li>
              <li className="hover:text-white cursor-pointer">About</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-3">Connect</h4>
            <div className="flex gap-4 text-xl">
              <FaGithub className="hover:text-white cursor-pointer" />
              <FaLinkedin className="hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 my-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© {new Date().getFullYear()} iTask. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-2 md:mt-0">
            Built with <FaHeart className="text-red-500" /> using React
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
