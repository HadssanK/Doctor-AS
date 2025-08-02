// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout"; // includes Navbar
import Home from "./pages/Home";
import HealthBlogPage from "./pages/Healthblog";
import Appointments from "./pages/Appointments";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// Doctor-specific layout and pages (no navbar)
import DoctorLayout from "./pages/doctorDashboard/DoctorLayout";
import JoinAsDoctor from "./pages/doctorDashboard/JoinAsDoctor";
import DoctorAppointments from "./pages/doctorDashboard/DoctorAppointments";
import DoctorProfile from "./pages/doctorDashboard/DoctorProfile";

function App() {
  return (
    
      <Routes>
        {/* Public pages with navbar */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="doctors" element={<HealthBlogPage />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          {/* <Route path="Logout" element={<Logout />} /> */}
        </Route>

        {/* Doctor dashboard pages without navbar */}
        <Route path="/DoctorLayout" element={<DoctorLayout />}>
          <Route path="dashboard" element={<JoinAsDoctor />} />
          <Route path="appointments" element={<DoctorAppointments/>} />
          <Route path="profile" element={<DoctorProfile/>} />
        </Route>
      </Routes>
   
  );
}

export default App;
