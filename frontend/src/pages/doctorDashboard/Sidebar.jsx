import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  User,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { useAppContext } from "../../Context/AppContext";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { logout } = useAppContext(); // 👈 import logout from context
  const navigate = useNavigate(); // 👈 for redirect

  const handleLogout = async () => {
    try {
      await logout(); // 👈 logout function call
      navigate("/login"); // 👈 redirect to login
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  const linkClass =
    "flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition duration-200";

  const activeClass = "bg-blue-100 text-blue-700 font-semibold";

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden bg-white border-b p-4 flex justify-between items-center shadow-sm">
        <h2 className="text-xl font-bold text-blue-600">Doctor Panel</h2>
        <button onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`${
          open ? "block" : "hidden"
        } md:block bg-white w-60 min-h-screen border-r shadow-sm p-4 fixed md:static z-40`}
      >
        <div className="mb-6 hidden md:block">
          <h2 className="text-xl font-bold text-blue-600">Doctor Panel</h2>
        </div>
        <nav className="flex flex-col space-y-2">
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
            onClick={() => setOpen(false)}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="appointments"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
            onClick={() => setOpen(false)}
          >
            <Calendar size={18} />
            <span>Appointments</span>
          </NavLink>

          <NavLink
            to="profile"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
            onClick={() => setOpen(false)}
          >
            <User size={18} />
            <span>Profile</span>
          </NavLink>

          {/* 🔐 LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className={`${linkClass} text-left w-full`}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
