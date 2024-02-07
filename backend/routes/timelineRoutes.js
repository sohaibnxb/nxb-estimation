import express from "express";
import {
  addTimelines,
  deleteTimeline,
  editTimelinesAccess,
  getAllTimelines,
  getScreenById,
  updateScreen,
} from "../controllers/timelineController.js";
import {
  verifyToken,
  admin,
  level2,
  level1,
} from "../middlewares/authHandler.js";

const router = express.Router();

router.get("/", verifyToken, getAllTimelines);
router.post("/", verifyToken, addTimelines);
router.get("/screen", verifyToken, getScreenById);
router.delete("/:id", verifyToken, deleteTimeline);
router.put("/:id", verifyToken, updateScreen);
router.patch("/update-access", verifyToken, editTimelinesAccess);

export default router;
