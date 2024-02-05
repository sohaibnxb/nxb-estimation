import express from "express";
import {
  registerUser,
  getAllusers,
  getAllresouces,
  getSelectedUser,
  getUserById,
  deleteUser,
  updateUser,
  authUser,
  sortUsers,
} from "../controllers/userController.js";
import {
  verifyToken,
  admin,
  level2,
  level1,
} from "../middlewares/authHandler.js";

const router = express.Router();

router.post("/signin", authUser);
router.post('/register', registerUser);
router.get("/sortUser", verifyToken, sortUsers);
router.get("/", verifyToken, getAllusers);
router.get("/resources", verifyToken, getAllresouces);
router.get("/selectedUser", verifyToken, getSelectedUser);
router.get("/:id", verifyToken, getUserById);
router.delete("/:id", verifyToken, deleteUser);
router.put("/:id", verifyToken, updateUser);

export default router;
