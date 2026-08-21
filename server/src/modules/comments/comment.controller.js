
import {
    createCommentService,
    getComments,
    updateCommentService,
    deleteCommentService,
} from "./comment.service.js";

export async function createCommentController(
    req,
    res,
    next
) {

    try {

        const comment = await createCommentService(
            req.params.projectId,
            req.params.taskId,
            req.user.organization_id,
            req.user.id,
            req.body.content
        );

        return res.status(201).json({
            success: true,
            data: comment,
        });

    } catch (error) {

        next(error);

    }
}


export async function getCommentsController(
    req,
    res,
    next
) {

    try {

        const comments = await getComments(
            req.params.projectId,
            req.params.taskId,
            req.user.organization_id
        );

        return res.status(200).json({
            success: true,
            data: comments,
        });

    } catch (error) {

        next(error);

    }
}
export async function updateCommentController(
    req,
    res,
    next
) {
    try {

        const comment = await updateCommentService(
            req.params.projectId,
            req.params.taskId,
            req.params.commentId,
            req.user.organization_id,
            req.user.id,
            req.body.content
        );

        return res.status(200).json({
            success: true,
            data: comment,
        });

    } catch (error) {
        next(error);
    }
}
export async function deleteCommentController(
    req,
    res,
    next
) {
    try {

        const comment = await deleteCommentService(
            req.params.projectId,
            req.params.taskId,
            req.params.commentId,
            req.user.organization_id,
            req.user.id
        );

        return res.status(200).json({
            success: true,
            data: comment,
        });

    } catch (error) {
        next(error);
    }
}