import { Router } from "express";

import {
    createTaskController,
    getTasksController,
    getTaskByIdController,
    updateTaskController,
} from "./task.controller.js";

import authenticate from "../../middlewares/authenticate.js";

const router = Router();


router.post(
    "/:projectId/tasks",
    authenticate,
    createTaskController
);


router.get(
    "/:projectId/tasks",
    authenticate,
    getTasksController
);


router.get(
    "/:projectId/tasks/:taskId",
    authenticate,
    getTaskByIdController
);

router.patch(
    "/:projectId/tasks/:taskId",
    authenticate,
    updateTaskController
);

export default router;