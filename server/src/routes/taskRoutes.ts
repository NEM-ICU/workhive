import { Router } from "express";
import {
  getTasks,
  newTask,
  updateTaskStatus,
} from "../controllers/taskController";

const router = Router();

router.get("/", getTasks);
router.post("/", newTask);
router.patch("/:taskId/status", updateTaskStatus);

export default router;
