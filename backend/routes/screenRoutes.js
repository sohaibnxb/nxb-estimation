import express from "express";
import {
  addTimelines,
  deleteScreen,
  getAllScreen,
  getScreenById,
  updateScreen,
} from "../controllers/screenController.js";
import {
  verifyToken,
  admin,
  level2,
  level1,
} from "../middlewares/authHandler.js";

const router = express.Router();

router.get("/", getAllScreen);
router.post("/:id", addTimelines);
router.get("/screen", getScreenById);
router.delete("/:id", deleteScreen);
router.put("/:id", updateScreen);

export default router;
