import { Router } from "express";
import { getProjects, newProject } from "../controllers/projectController";

const router = Router();

router.get("/", getProjects);
router.post("/", newProject);

export default router;
