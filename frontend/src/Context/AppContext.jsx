// src/context/AppContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// ========== Axios global setup ==========
axios.defaults.baseURL = "http://localhost:5000/api/v1";

axios.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user")); // token get from localStorage
    const token = user?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ========== Context ========== //
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  // ========== Load user from localStorage on mount ==========
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
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
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
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
    if (!user || user.role !== "doctor") throw new Error("Unauthorized");
    const res = await axios.post("/doctor/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
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

  // ========== Return Provider ==========
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

// ========== Custom Hook ==========
export const useAppContext = () => useContext(AppContext);
