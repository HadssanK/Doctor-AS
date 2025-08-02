import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../utils/axiosInstance"; // use custom axios

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ========== Auth ==========
  const register = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post("/auth/registered", data);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      return res.data;
    } catch (err) {
      const message = err?.response?.data?.message || "Registration failed.";
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

 const login = async (data) => {
  setLoading(true);
  try {
    const res = await axios.post("/auth/login", data);

    const user = res.data.user;
    const token = res.data.accessToken;

    // ✅ Combine token with user
    const fullUser = { ...user, token };

    // ✅ Store in localStorage
    localStorage.setItem("user", JSON.stringify(fullUser));
    setUser(fullUser);

    console.log("✅ Token Found:", token);
    return res.data;
  } catch (err) {
    throw err.response?.data || new Error("Login failed.");
  } finally {
    setLoading(false);
  }
};



  const logout = async () => {
    await axios.post("/auth/logout");
    localStorage.removeItem("user");
    setUser(null);
    setDoctorProfile(null);
    setAppointments([]);
  };

  // ========== Doctor Profile ==========
 const createDoctorProfile = async (formData) => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  if (!user || user.role !== "doctor") throw new Error("Unauthorized");

  const res = await axios.post("/doctor/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`, // ✅ token bhejna
    },
  });

  setDoctorProfile(res.data.doctor);
  return res.data;
};


  const getDoctorProfile = async () => {
    if (!user || user.role !== "doctor") throw new Error("Unauthorized");
    const res = await axios.get("/doctor/profile");
    setDoctorProfile(res.data.doctor);
    return res.data;
  };

  const updateDoctorProfile = async (formData) => {
    if (!user || user.role !== "doctor") throw new Error("Unauthorized");
    const res = await axios.put("/doctor/update", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setDoctorProfile(res.data.doctor);
    return res.data;
  };

  const deleteDoctorProfile = async () => {
    if (!user || user.role !== "doctor") throw new Error("Unauthorized");
    const res = await axios.delete("/doctor/delete");
    setDoctorProfile(null);
    return res.data;
  };

  // ========== Appointments ==========
  const createAppointment = async (data) => {
    if (!user) throw new Error("Login required");
    const res = await axios.post("/auth/appointment", data);
    return res.data;
  };

  const getMyAppointments = async () => {
    if (!user) throw new Error("Login required");
    const res = await axios.get("/auth/appointments/my");
    setAppointments(res.data.appointments);
    return res.data;
  };

  const getAllAppointments = async () => {
    if (!user || user.role !== "doctor") throw new Error("Unauthorized");
    const res = await axios.get("/auth/appointments");
    setAppointments(res.data.appointments);
    return res.data;
  };

  const updateAppointmentStatus = async (id, status) => {
    if (!user || user.role !== "doctor") throw new Error("Unauthorized");
    const res = await axios.put(`/auth/appointment/${id}/status`, { status });
    return res.data;
  };

  const deleteAppointment = async (id) => {
    if (!user) throw new Error("Login required");
    const res = await axios.delete(`/auth/appointment/${id}`);
    setAppointments((prev) => prev.filter((a) => a._id !== id));
    return res.data;
  };

  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        doctorProfile,
        appointments,
        register,
        login,
        logout,
        createDoctorProfile,
        getDoctorProfile,
        updateDoctorProfile,
        deleteDoctorProfile,
        createAppointment,
        getMyAppointments,
        getAllAppointments,
        updateAppointmentStatus,
        deleteAppointment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
