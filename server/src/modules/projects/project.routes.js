import { Router } from "express";

import {
    createProjectController,
    getProjectsController,
    getProjectByIdController,
    updateProjectController,
    deleteProjectController,
} from "./project.controller.js";

import authenticate from "../../middlewares/authenticate.js";

const router = Router();

router.post(
    "/",
    authenticate,
    createProjectController
);

router.get(
    "/",
    authenticate,
    getProjectsController
);

router.get(
    "/:id",
    authenticate,
    getProjectByIdController
);

router.patch(
    "/:id",
    authenticate,
    updateProjectController
);

router.delete(
    "/:id",
    authenticate,
    deleteProjectController
);
export default router;