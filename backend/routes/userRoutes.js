import express from "express";
import {
  registerUser,
  authUser,
  logoutUser,
  getUsers,
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
  deleteUserByAdmin,
  updateUserByAdmin,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.post("/register", registerUser); // Register user
router.post("/login", authUser); // Login user
router.post("/logout", logoutUser); // Logout user

// Private Routes (Protected)
router
  .route("/profile")
  .get(protect, getUserProfile) // Get own profile
  .put(protect, updateUserProfile) // Update own profile
  .delete(protect, deleteUserAccount); // Delete own account

// Admin Routes (Protected & Admin only)
router.route("/").get(protect, admin, getUsers); // Get all users
router
  .route("/:id")
  .delete(protect, admin, deleteUserByAdmin) // Delete user
  .put(protect, admin, updateUserByAdmin); // Update user

export default router;
