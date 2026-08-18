import {
    createTask,
    getTasks,
    getTaskById,
} from "./task.service.js";


export async function createTaskController(req, res, next) {

    try {

        const task = await createTask(
            req.params.projectId,
            req.user.organization_id,
            req.body
        );

        return res.status(201).json({
            success: true,
            data: task,
        });

    } catch (error) {

        next(error);

    }
}


export async function getTasksController(req, res, next) {

    try {

        const tasks = await getTasks(
            req.params.projectId,
            req.user.organization_id
        );

        return res.status(200).json({
            success: true,
            data: tasks,
        });

    } catch (error) {

        next(error);

    }
}


export async function getTaskByIdController(req, res, next) {

    try {

        const task = await getTaskById(
            req.params.taskId,
            req.params.projectId,
            req.user.organization_id
        );

        return res.status(200).json({
            success: true,
            data: task,
        });

    } catch (error) {

        next(error);

    }
}