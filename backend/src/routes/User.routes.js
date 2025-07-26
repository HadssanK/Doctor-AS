import express from "express";
import { Login, logout, Register } from "../controllers/User.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import {
  createAppointment,
  getAllAppointments,
  getMyAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} from "../controllers/User.Appointment.js";

const router = express.Router();

// Auth Routes
router.post("/registered", Register);
router.post("/login", Login);
router.post("/logout", logout);
// Protected Admin Route
router.get(
  "/admin/dashboard",
  verifyToken,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({ message: `Welcome Admin ${req.user.name}` });
  }
);

// ✅ Appointment Routes
router.post("/appointment", verifyToken, createAppointment); // create
router.get("/appointments/my", verifyToken, getMyAppointments); // get user appointments
router.get(
  "/appointments",
  verifyToken,
  authorizeRoles("admin", "doctor"),
  getAllAppointments
); // all appointments (admin/doctor)
router.put(
  "/appointment/:id/status",
  verifyToken,
  authorizeRoles("doctor"),
  updateAppointmentStatus
); // update status
router.delete("/appointment/:id", verifyToken, deleteAppointment); // delete

export { router };
