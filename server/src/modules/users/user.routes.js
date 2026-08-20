import { Router } from "express";

import {
    getAllUsers,
    getSingleUser,
    updateUserController,
} from "./user.controller.js";

import authenticate from "../../middlewares/authenticate.js";

const router = Router();

router.get(
    "/",
    authenticate,
    getAllUsers
);

router.get(
    "/:id",
    authenticate,
    getSingleUser
);

router.patch(
    "/:id",
    authenticate,
    updateUserController
);
export default router;