import express from "express";
import {
  addTimelines,
  deleteTimeline,
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

router.get("/", getAllTimelines);
router.post("/", addTimelines);
router.get("/screen", getScreenById);
router.delete("/:id", deleteTimeline);
router.put("/:id", updateScreen);

export default router;
