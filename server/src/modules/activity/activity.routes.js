import { Router } from "express";

import {
getProjectActivitiesController,
} from "./activity.controller.js";

import authenticate from "../../middlewares/authenticate.js";

const router = Router();

router.get(
"/:projectId/activity",
authenticate,
getProjectActivitiesController
);

export default router;