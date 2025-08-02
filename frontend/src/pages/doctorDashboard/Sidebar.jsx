import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  User,
  Menu,
  X,
} from "lucide-react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

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

           <NavLink
            to="logout"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
            onClick={() => setOpen(false)}
          >
            <User size={18} />
            <span>Logout</span>
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
