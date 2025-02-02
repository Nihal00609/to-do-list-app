import { Router } from "express";
import {
  createTaskController,
  deleteTaskController,
  editTaskController,
  getTaskByIdController,
  getTaskController,
} from "../controllers/taskController.js";

const router = Router();

router.post("/", createTaskController);
router.get("/", getTaskController);
router.get("/:id", getTaskByIdController);
router.put("/:id", editTaskController);
router.delete("/:id", deleteTaskController);

export default router;
