import express from "express";
import {
  createDoctorProfile,
  getDoctorProfile,
  updateDoctorProfile,
  deleteDoctorProfile
} from "../controllers/Doctor.controller.js";

import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import upload from "../middlewares/multer.middleware.js"; // multer config

const DoctorRouter = express.Router();

// ✅ Create doctor profile
DoctorRouter.post(
  "/create",
  verifyToken,
  authorizeRoles("doctor"),
  upload.single("image"),
  createDoctorProfile
);

// ✅ Read/Get logged-in doctor profile
DoctorRouter.get(
  "/profile",
  verifyToken,
  authorizeRoles("doctor"),
  getDoctorProfile
);

// ✅ Update doctor profile
DoctorRouter.put(
  "/update",
  verifyToken,
  authorizeRoles("doctor"),
  upload.single("image"),
  updateDoctorProfile
);

// ✅ Delete doctor profile
DoctorRouter.delete(
  "/delete",
  verifyToken,
  authorizeRoles("doctor"),
  deleteDoctorProfile
);

export { DoctorRouter };
