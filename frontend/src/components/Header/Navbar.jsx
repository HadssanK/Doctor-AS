import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAppContext();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

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
            <li><NavLink to="/doctors" className={linkClasses}>Health Blog</NavLink></li>
            <li><NavLink to="/appointments" className={linkClasses}>Appointments</NavLink></li>
            <li><NavLink to="/about" className={linkClasses}>About</NavLink></li>
            <li><NavLink to="/contact" className={linkClasses}>Contact</NavLink></li>
          </ul>

          {/* Desktop Right Side */}
          <div className="hidden md:flex space-x-3 items-center relative">
            {user?.isDoctor && (
              <NavLink
                to="/DoctorLayout"
                className="px-4 py-1 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition"
              >
                Join as doctor
              </NavLink>
            )}

            {!user ? (
              <NavLink
                to="/login"
                className="px-4 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
              >
                Login
              </NavLink>
            ) : (
              <div
                className="relative cursor-pointer"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold uppercase">
                  {user.name?.charAt(0)}
                </div>

                <div
                  className={`absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg transition-all duration-200 ${
                    dropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                  }`}
                >
                  <NavLink
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
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
          <li><NavLink to="/doctors" className={linkClasses} onClick={() => setIsOpen(false)}>Health Blog</NavLink></li>
          <li><NavLink to="/appointments" className={linkClasses} onClick={() => setIsOpen(false)}>Appointments</NavLink></li>
          <li><NavLink to="/about" className={linkClasses} onClick={() => setIsOpen(false)}>About</NavLink></li>
          <li><NavLink to="/contact" className={linkClasses} onClick={() => setIsOpen(false)}>Contact</NavLink></li>
        </ul>

        <div className="mt-6 flex flex-col space-y-3">
          {user?.isDoctor && (
            <NavLink
              to="/DoctorLayout"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border border-blue-500 text-blue-500 rounded-full text-center"
            >
              Join as doctor
            </NavLink>
          )}

          {!user ? (
            <NavLink
              to="/login"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded-full text-center"
            >
              Login
            </NavLink>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-full text-center"
            >
              Logout
            </button>
          )}
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
