
import {
    createTask as createTaskRepository,
    findTasksByProject,
    findTaskById,
    updateTask as updateTaskRepository,
} from "./task.repository.js";


import { createTaskSchema ,updateTaskSchema} from "./task.validation.js";

import { findProjectById } from "../projects/project.repository.js";
import { findUserById } from "../users/user.repository.js";

import AppError from "../../errors/AppError.js";


export async function createTask(
    projectId,
    organizationId,
    data
) {

    createTaskSchema.parse(data);

    // Check project belongs to current organization
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

    // Check assigned user
    if (data.assigned_to) {

        const user = await findUserById(
            data.assigned_to
        );

        if (
            !user ||
            user.organization_id !== organizationId
        ) {
            throw new AppError(
                "Assigned user not found.",
                404
            );
        }
    }

    // Check parent task
    if (data.parent_task_id) {

        const parentTask = await findTaskById(
            data.parent_task_id,
            projectId
        );

        if (!parentTask) {
            throw new AppError(
                "Parent task not found.",
                404
            );
        }
    }

    const taskData = {
        project_id: projectId,
        parent_task_id: data.parent_task_id || null,
        assigned_to: data.assigned_to || null,
        title: data.title,
        description: data.description || null,
        priority: data.priority || "MEDIUM",
        status: data.status || "TODO",
        start_date: data.start_date || null,
        due_date: data.due_date || null,
    };

    return await createTaskRepository(taskData);
}
export async function getTasks(
    projectId,
    organizationId
) {

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

    return await findTasksByProject(projectId);
}
export async function getTaskById(
    taskId,
    projectId,
    organizationId
) {

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

    return task;
}

export async function updateTask(
    taskId,
    projectId,
    organizationId,
    data
) {

    // Validate update data
    updateTaskSchema.parse(data);

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

    // Check task belongs to this project
    const existingTask = await findTaskById(
        taskId,
        projectId
    );

    if (!existingTask) {
        throw new AppError(
            "Task not found.",
            404
        );
    }

    // Check assigned user if provided
    if (data.assigned_to) {

        const user = await findUserById(
            data.assigned_to
        );

        if (
            !user ||
            user.organization_id !== organizationId
        ) {
            throw new AppError(
                "Assigned user not found.",
                404
            );
        }
    }

    // Prepare update data
    const updateData = {
        title: data.title,
        description: data.description,
        assigned_to: data.assigned_to,
        priority: data.priority,
        status: data.status,
        start_date: data.start_date,
        due_date: data.due_date,
        completed_at:
            data.status === "DONE"
                ? new Date()
                : undefined,
    };

    return await updateTaskRepository(
        taskId,
        projectId,
        updateData
    );
}