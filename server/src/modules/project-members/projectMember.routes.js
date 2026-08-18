import { Router } from "express";
import { authorize } from "../../middlewares/authorize.js";
import {
    addMemberController,
    getMembersController,
    removeMemberController,
} from "./projectMember.controller.js";

import authenticate from "../../middlewares/authenticate.js";

const router = Router();


router.post(
    "/:projectId/members",
    authenticate,
    authorize("OWNER", "ADMIN", "MANAGER"),
    addMemberController
);


router.get(
    "/:projectId/members",
    authenticate,
    getMembersController
);


router.delete(
    "/:projectId/members/:userId",
    authenticate,
    authorize("OWNER", "ADMIN", "MANAGER"),
    removeMemberController
);


export default router;