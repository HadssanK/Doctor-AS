import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    `relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full ${
      isActive ? "text-blue-600 font-semibold after:w-full" : "text-gray-700"
    }`;

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-3 fixed top-0 left-0 right-0 z-50 font-[Inter]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <NavLink to="/" className="text-2xl font-bold text-blue-600">
            HealthCare
          </NavLink>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex space-x-6 text-sm font-medium">
            <li><NavLink to="/" className={linkClasses}>Home</NavLink></li>
            <li><NavLink to="/doctors" className={linkClasses}>Doctors</NavLink></li>
            <li><NavLink to="/appointments" className={linkClasses}>Appointments</NavLink></li>
            <li><NavLink to="/about" className={linkClasses}>About</NavLink></li>
            <li><NavLink to="/contact" className={linkClasses}>Contact</NavLink></li>
          </ul>

          {/* Desktop Buttons */}
          <div className="hidden md:flex space-x-3">
            <NavLink
              to="/join"
              className="px-4 py-1 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition"
            >
              Join as doctor
            </NavLink>
            <NavLink
              to="/login"
              className="px-4 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
            >
              Login
            </NavLink>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X className="w-6 h-6 text-gray-800" />
              ) : (
                <Menu className="w-6 h-6 text-gray-800" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-40 md:hidden pt-16 px-6`}
      >
        <ul className="space-y-5 text-gray-800 font-medium text-base">
          <li><NavLink to="/" className={linkClasses} onClick={() => setIsOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/doctors" className={linkClasses} onClick={() => setIsOpen(false)}>Doctors</NavLink></li>
          <li><NavLink to="/appointments" className={linkClasses} onClick={() => setIsOpen(false)}>Appointments</NavLink></li>
          <li><NavLink to="/about" className={linkClasses} onClick={() => setIsOpen(false)}>About</NavLink></li>
          <li><NavLink to="/contact" className={linkClasses} onClick={() => setIsOpen(false)}>Contact</NavLink></li>
        </ul>
        <div className="mt-6 flex space-x-3">
          <NavLink
            to="/join"
            onClick={() => setIsOpen(false)}
            className="px-4 py-1 border border-blue-500 text-blue-500 rounded-full"
          >
            Join
          </NavLink>
          <NavLink
            to="/login"
            onClick={() => setIsOpen(false)}
            className="px-4 py-1 bg-blue-500 text-white rounded-full"
          >
            Login
          </NavLink>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
