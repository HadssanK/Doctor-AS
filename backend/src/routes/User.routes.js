import express from "express";
import { Login, logout, Register } from "../controllers/User.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

// Auth Routes
router.post("/registered", Register);
router.post("/login", Login);
router.post("/logout", logout);
// Protected Admin Route
router.get("/admin/dashboard", verifyToken, authorizeRoles("admin"), (req, res) => {
  res.json({ message: `Welcome Admin ${req.user.name}` });
});

export { router };
