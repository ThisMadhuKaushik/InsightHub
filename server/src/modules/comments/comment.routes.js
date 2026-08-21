import { Router } from "express";

import {
    createCommentController,
    getCommentsController,
    updateCommentController,
    deleteCommentController,
} from "./comment.controller.js";

import authenticate from "../../middlewares/authenticate.js";


const router = Router();


router.post(
    "/:projectId/tasks/:taskId/comments",
    authenticate,
    createCommentController
);


router.get(
    "/:projectId/tasks/:taskId/comments",
    authenticate,
    getCommentsController
);
router.patch(
    "/:projectId/tasks/:taskId/comments/:commentId",
    authenticate,
    updateCommentController
);


router.delete(
    "/:projectId/tasks/:taskId/comments/:commentId",
    authenticate,
    deleteCommentController
);

export default router;