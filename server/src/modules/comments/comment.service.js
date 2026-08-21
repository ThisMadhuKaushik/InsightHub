
import {
    createComment,
    findCommentsByTask,
    updateComment,
    deleteComment,
} from "./comment.repository.js";
import { createCommentSchema } from "./comment.validation.js";
import { findProjectById } from "../projects/project.repository.js";
import { findTaskById } from "../tasks/task.repository.js";

import AppError from "../../errors/AppError.js";


export async function createCommentService(
    projectId,
    taskId,
    organizationId,
    userId,
    content
) {
     createCommentSchema.parse({
        content,
    });
    // 1. Check project belongs to organization
    const project = await findProjectById(
        projectId,
        organizationId
    );

    if (!project) {
        throw new AppError(
            "Project not found.",
            404
        );
    }


    // 2. Check task belongs to project
    const task = await findTaskById(
        taskId,
        projectId
    );

    if (!task) {
        throw new AppError(
            "Task not found.",
            404
        );
    }


    // 3. Create comment
    return await createComment({
        task_id: taskId,
        user_id: userId,
        content,
    });
}


export async function getComments(
    projectId,
    taskId,
    organizationId
) {

    // Check project belongs to organization
    const project = await findProjectById(
        projectId,
        organizationId
    );

    if (!project) {
        throw new AppError(
            "Project not found.",
            404
        );
    }


    // Check task belongs to project
    const task = await findTaskById(
        taskId,
        projectId
    );

    if (!task) {
        throw new AppError(
            "Task not found.",
            404
        );
    }


    return await findCommentsByTask(taskId);
}

export async function updateCommentService(
    projectId,
    taskId,
    commentId,
    organizationId,
    userId,
    content
) {

    // Validate comment content
    createCommentSchema.parse({
        content,
    });

    // Check project belongs to organization
    const project = await findProjectById(
        projectId,
        organizationId
    );

    if (!project) {
        throw new AppError(
            "Project not found.",
            404
        );
    }

    // Check task belongs to project
    const task = await findTaskById(
        taskId,
        projectId
    );

    if (!task) {
        throw new AppError(
            "Task not found.",
            404
        );
    }

    // Update only if comment belongs to current user
    const comment = await updateComment(
        commentId,
        userId,
        content
    );

    if (!comment) {
        throw new AppError(
            "Comment not found or you do not have permission to update it.",
            404
        );
    }

    return comment;
}

export async function deleteCommentService(
    projectId,
    taskId,
    commentId,
    organizationId,
    userId
) {

    // Check project belongs to organization
    const project = await findProjectById(
        projectId,
        organizationId
    );

    if (!project) {
        throw new AppError(
            "Project not found.",
            404
        );
    }

    // Check task belongs to project
    const task = await findTaskById(
        taskId,
        projectId
    );

    if (!task) {
        throw new AppError(
            "Task not found.",
            404
        );
    }

    // Delete only user's own comment
    const comment = await deleteComment(
        commentId,
        userId
    );

    if (!comment) {
        throw new AppError(
            "Comment not found or you do not have permission to delete it.",
            404
        );
    }

    return comment;
}