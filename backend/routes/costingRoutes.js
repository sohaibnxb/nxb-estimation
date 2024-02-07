import express from "express";
import { getCosting, getCostingByProject,getCostingByTimeline, postCosting, updateCosting } from "../controllers/costingController.js";

const router = express.Router();

router.post("/", postCosting);
router.get("/", getCosting);
router.get("/project", getCostingByProject);
router.get("/timeline", getCostingByTimeline);
router.put("/", updateCosting);

export default router;
